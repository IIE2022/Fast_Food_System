
/* Aquí va la lógica de lado del cliente*/


    var fila; //captura la fila, para editar o eliminar
    var id = 0;

    var newModal = new bootstrap.Modal(document.getElementById('newModal'), {
        backdrop: "static",
        keyboard: true
    });
   

    function marcaModel(id, nombre) {
        return {
        id : id,
        nombre : nombre
        };
    }


    let registroArray = [
        marcaModel(1, "PILSEN"), 
        marcaModel(2, "TOPLINE"), 
        marcaModel(3, "COCA COLA"), 
        marcaModel(4, "FANTA"), 
        marcaModel(5, "OCHI"), 
        marcaModel(6, "PEPSI"), 
    ];


    function cargarTabla() {
        $('#example').dataTable().fnDestroy();
        let plantilla = ``;
        registroArray.forEach(e => {
            plantilla +=`
            <tr>
                <td class="text-end">${e.id}</td>
                <td>${e.nombre}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit"> Actualizar </button>
                    <button type="button" class="btn btn-danger btn-delete"> Eliminar </button>
                </td>
            </tr>
            `;
        });
        $('#tbody_registro').html(plantilla);
        consultarRegistros();
    }


    // Listar registros    
    cargarTabla();


    function consultarRegistros() {
        $('#example').DataTable( {
            "language": {
                "decimal": "",
                "emptyTable": "No existen datos en la tabla",
                "info": "Se encontraron _TOTAL_ registro/s",
                "infoEmpty": "No existen registros!",
                "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
                "infoPostFix": "",
                "thousands": ".",
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "No se ha encontrado ningún registro!",
                "paginate": {
                    "first":      ">|",
                    "last":       "|<",
                    "next":       ">>",
                    "previous":   "<<"
                },
                "aria": {
                "sortAscending":  ": activar para ordenar la columna ascendente",
                "sortDescending": ": activar para ordenar la columna descendente",
                "sort": "descending"
                },
                "responsive":       true,
            },
            "lengthMenu":       [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
            "iDisplayLength":     5,
            "responsive":       true,
            "order": [[ 0, "desc" ]],
            columnDefs: [
                { "sClass": "text-end", "aTargets": [ 0 ]},
            ]
        }); 
    }

    
    //Guardar nuevo registro
    $('#form').submit(function(e) {
        let postData = {
            id : id,
            nombre : $('#nombre-marca').val().toUpperCase()
        };
        
        if($('#nombre-marca').val().length === 0){
            alertify.error('Campo vacio, complete los campos principales.');
            $('#nombre-marca').focus();
        }else{
            if(validarMarca(postData.nombre)){
                if(id < 1){
                    console.log(obtenerId());
                    postData.id = obtenerId();
                    registroArray.push(postData);
                    alertify.success('Registro insertado satisfactoriamente.');
                }else{
                    actualizarRegistro(postData);   
                    alertify.success('Registro actualizado satisfactoriamente.');
                }

                document.getElementById('form').reset();

                newModal.hide();
                cargarTabla();    
            }else{
                alertify.error('El nombre de la marca ya esta registrado.'); 
            }        
        }
        e.preventDefault();
    });


    function validarMarca(nombre) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(e.nombre == nombre && e.id != id){
                return false;
            }
        }
        return true;
    }


    function obtenerId() {
        let id = 0;
        registroArray.forEach(e => {
            id = e.id;
        });
        return (id+1);
    }


    function actualizarRegistro(data) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(data.id == e.id){
                e.nombre = data.nombre;
                cargarTabla();
                return 1;
            }
        }
        return 0;
    }


    function borrarRegistro(id) {
        let i = 0;
        pos = -1;
        while(i < registroArray.length){
            if(registroArray[i].id == id){
                pos = i;break;
            }
            i++;
        }
        registroArray.splice(pos, 1);
        alertify.success('Registro eliminado satisfactoriamente.'); 
        cargarTabla();
    }

    //Botón Nuevo
    document.getElementById('nuevo').addEventListener("click", function(){
        id = 0;
        document.getElementById('titulo').innerHTML = 'Nueva Marca.';
        document.getElementById('form').reset();
        document.getElementById('btn-form').innerHTML = 'Guardar.';
        
        newModal.show();//abrir modal con js

        setTimeout(function () {
            document.getElementById("nombre-marca").focus();	
        }, 500);
    });



    //Botón cancelar
    document.getElementById('btn-cancel').addEventListener("click", function(){			        
        id = 0;	            
        document.getElementById('titulo').innerHTML = 'Nueva Marca.';
        document.getElementById('btn-form').innerHTML = 'Guardar.';
        
        newModal.hide();	//ocultar modal
    });

        
    //Botón Editar        
    $(document).on("click", ".btn-edit", function(){		
        fila = $(this).closest("tr");	        
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	  
        nombre = fila.find('td:eq(1)').text();

        document.getElementById('titulo').innerHTML = 'Editar Marca.';
        document.getElementById('btn-form').innerHTML = 'Modificar.';
        document.getElementById('nombre-marca').value = nombre;
        
        newModal.show();

        setTimeout(function () {
            document.getElementById("nombre-marca").focus();	
        }, 500);		   
    });


    //Eliminar        
    $(document).on("click", ".btn-delete",  function(){		
        fila = $(this).closest("tr");	        
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        nombre = fila.find('td:eq(1)').text();  	
        
        alertify.confirm('Eliminar Registrar', ' ¿Está seguro de eliminar el registro?', 
        function(){ 
            borrarRegistro(id);
        }, 
        function(){ 
        }).set({labels:{ok:'Sí, eliminar!', cancel: 'Cancelar'}, padding: false});

    });


    //Preguntar si hay campos cargados
    $("#newModal").on('hidden.bs.modal', function () {
        if($('#nombre-marca').val().length > 0){
            alertify.confirm('Cerrar ventana', ' ¿Está seguro de cerrar la ventana?', 
            function(){ 
                
            }, 
            function(){ 
                newModal.show();//abrir modal con js
            }).set({labels:{ok:'Sí, cerrar!', cancel: 'Cancelar'}, padding: false});            
        }        
    });

    

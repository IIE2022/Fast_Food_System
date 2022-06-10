
/* Aquí va la lógica de lado del cliente*/

$(function () {
    var fila; //captura la fila, para editar o eliminar
    var id = 0;


    function clientesModel(id, ci, verif, nombre, telefono, direccion, correo) {
        return {
            id : id,
            verificador : verif,
            ci : ci,
            nombre : nombre,
            telefono : telefono,
            direccion : direccion,
            correo : correo,
        };
    }
    
    
    let registroArray = [
        clientesModel(1, 1000000, '', "ADMIN", '0972XXXXXX', 'BARRIO LAS MERCEDES', 'admin@gmail.com'), 
        clientesModel(2, 2000000, '', "JUAN PEREZ", '0972XXXXXX', 'BARRIO LAS PALMAS', 'juanp@gmail.com'), 
        clientesModel(3, 3000000, '', "JUANA PEREZ", '0972XXXXXX', 'BARRIO LAS FÁTIMA', 'juana@gmail.com'), 
    ];
   


    function cargarTabla() {
        $('#example').dataTable().fnDestroy();
        let plantilla = ``;
        let ciruc = '';
        registroArray.forEach(e => {
            ciruc = separador_Mil(e.ci.toString());
            if(e.verificador != ''){
                ciruc = separador_Mil(e.ci.toString())+'-'+e.verificador;
            }
            plantilla +=`
            <tr>
                <td class="text-end">${e.id}</td>
                <td class="text-end">${ciruc}</td>
                <td>${e.nombre}</td>
                <td>${e.direccion}</td>
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
    $(document).ready(function() {
        cargarTabla();
    });
    

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
                { "sClass": "text-end", "aTargets": [ 0, 1 ]},
            ]
        });  
    }

    
    //Guardar nuevo registro
    $(document).on("click", "#btn-form", function(e){
        exito = true;
                
        if($('#ci').val().length === 0){
            alertify.error('Campo vacio, complete con el CI.');
            $('#ci').focus();
        }else if($('#nombre').val().length === 0){
            alertify.error('Campo vacio, complete con el nombre.');
            $('#nombre').focus();
        }else if($('#telefono').val().length === 0){
            alertify.error('Campo vacio, complete con el número de teléfono.');
            $('#telefono').focus();
        }else if($('#correo').val().length === 0){
            alertify.error('Campo vacio, complete con la dirección de correo.');
            $('#correo').focus();
        }else if($('#direccion').val().length === 0 && id < 1){
            alertify.error('Campo vacio, complete con el direccion.');
            $('#direccion').focus();
        }else{
            if(validarCliente(quitarSeparador($('#ci').val()), ($('#verificador').val()))){
                if(validarCorreo($('#correo').val().toLowerCase())){
                    if(id < 1){
                        let postData = {
                            id : id,
                            ci : quitarSeparador($('#ci').val()),
                            verificador : ($('#verificador').val()),
                            nombre : $('#nombre').val().toUpperCase(),
                            telefono : $('#telefono').val(),
                            correo : $('#correo').val().toLowerCase(),
                            direccion : $('#direccion').val().toUpperCase()
                        };
                        postData.id = obtenerId();
                        registroArray.push(postData);
                        alertify.success('Registro insertado satisfactoriamente.');               
                    }else{
                        let postData = {
                            id : id,
                            ci : quitarSeparador($('#ci').val()),
                            verificador : ($('#verificador').val()),
                            nombre : $('#nombre').val(),
                            telefono : $('#telefono').val(),
                            direccion : $('#direccion').val(),
                            correo : $('#correo').val()
                        };
                        actualizarRegistro(postData);   
                        alertify.success('Registro actualizado satisfactoriamente.');            
                    }         
                    
                    if(exito){                
                        $('#newModal').modal('hide');
                        $('#form').trigger('reset');
                        cargarTabla(); 
                    }
                }else{
                    alertify.error('El correo ya existe.');
                    exito = false;
                    $('#correo').focus();
                }  
            }else{
                alertify.error('El número de CI ya existe.');
                exito = false;
                $('#ci').focus();
            }              
        }
        e.preventDefault();
    });


    function obtenerRegistro(id) {    
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(e.id == id){ 
                return e;
            }
        }   
        return null;
    }


    function obtenerId() {
        let id = 0;
        registroArray.forEach(e => {
            id = e.id;
        });
        return (id+1);
    }
    

    function validarCliente(ci, verificador) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(quitarSeparador(ci).toString() == e.ci.toString() && e.verificador == verificador && e.id != id){                
                return 0;
            }
        }
        return 1;
    }
    

    function validarCorreo(correo) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(correo == e.correo && e.id != id){                
                return 0;
            }
        }
        return 1;
    }


    function actualizarRegistro(data) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(data.id == e.id){
                e.ci = data.ci;
                e.verificador = data.verificador;
                e.nombre = data.nombre;
                e.telefono = data.telefono;
                e.direccion = data.direccion;
                e.correo = data.correo;
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
    $(document).on("click", "#nuevo", function(){
        id = 0;
        $("#titulo-registro").text('Nuevo Cliente');
        $('#form').trigger('reset');
        $("#btn-form").html('<i class="far fa-save"></i> Guardar');
        $('#newModal').modal('show');
        setTimeout(function () {
            $("#ci").focus();	
        }, 500);
        
    });


    //Botón cancelar
    $(document).on("click", "#btn-cancel", function(){			        
        id = 0;	            
        $("#titulo-registro").text('Nuevo Cliente');
        $("#btn-form").html('<i class="far fa-save"></i> Guardar');
        $('#newModal').modal('hide');	
    });

        
    //Botón Editar        
    $(document).on("click", ".btn-edit", function(){		
        fila = $(this).closest("tr");	        
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	
        let data = obtenerRegistro(id); 
        if(data != null){
            $("#ci").val(separador_Mil(data.ci.toString()));
            $("#nombre").val(data.nombre);
            $("#telefono").val(data.telefono);
            $("#direccion").val(data.direccion);
            $("#correo").val(data.correo);
            $("#titulo-registro").text('Editar Cliente');
            $("#btn-form").html('<i class="fas fa-edit"></i> Actualizar');
            $('#newModal').modal('show');
            setTimeout(function () {
                $("#ci").focus();	
            }, 500);	
        }         	   
    });


    //Eliminar        
    $(document).on("click", ".btn-delete", function(){		
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
        if($('#ci').val().length > 0 || $('#nombre').val().length > 0 || $('#telefono').val().length > 0 || $('#correo').val().length > 0 || $('#direccion').val().length > 0){
            alertify.confirm('Cerrar ventana', ' ¿Está seguro de cerrar la ventana?', 
            function(){ 
                
            }, 
            function(){ 
                $('#newModal').modal('show');
            }).set({labels:{ok:'Sí, cerrar!', cancel: 'Cancelar'}, padding: false});            
        }        
    });
    
});

/* Aquí va la lógica de lado del cliente*/


    var fila; //captura la fila, para editar o eliminar
    var id = 0;

    var newModal = new bootstrap.Modal(document.getElementById('newModal'), {
        backdrop: "static",
        keyboard: true
    });


    function categoriaModel(id, nombre) {
        return {
        id : id,
        nombre : nombre
        };
    }
    let categoriaArray = [
        categoriaModel(1, "CATEGORIA 1"),
        categoriaModel(2, "CATEGORIA 2"),
        categoriaModel(3, "CATEGORIA 3"),
        categoriaModel(4, "CATEGORIA 4"),
    ];

    function marcaModel(id, nombre) {
        return {
        id : id,
        nombre : nombre
        };
    }
    let marcaArray = [
        marcaModel(1, "PILSEN"),
        marcaModel(2, "TOPLINE"),
        marcaModel(3, "COCA COLA"),
        marcaModel(4, "FANTA"),
        marcaModel(5, "OCHI"),
        marcaModel(6, "PEPSI"),
        marcaModel(7, "HILDEBRAND"),
    ];

    function buscarMarca(id){
        for (let x = 0; x < marcaArray.length; x++) {
            const element = marcaArray[x];
            if(element.id == id){
                return element.nombre;
            }
        }
        return '';
    }


    function articuloModel(id, nombre, precio, existencia, idmarca,  idcategoria) {
        return {
            id : id,
            nombre : nombre,
            precio : precio,
            existencia : existencia,
            idmarca : idmarca,
            idcategoria : idcategoria
        };
    }
    let registroArray = [
        articuloModel(1, "HARINA TIPO 000", 15000, 10, 7, 1),
        articuloModel(2, "PEPSI DE 500ML", 15000, 10, 6, 1),
        articuloModel(3, "COCA COLA DE 3L", 15000, 10, 3, 1),
        articuloModel(4, "FANTA DE 3L", 15000, 10, 3, 1),
        articuloModel(5, "CHORIZO OCHI", 15000, 10, 5, 1),
    ];


    function obtenerArt(id){
        for (let x = 0; x < registroArray.length; x++) {
            const row = registroArray[x];
            if(row.id == id){
                return row;
            }
        }
        return null;
    }


    function cargarTabla() {
        $('#example').dataTable().fnDestroy();
        let plantilla = ``;
        registroArray.forEach(e => {
            plantilla +=`
            <tr>
                <td>${e.id}</td>
                <td>${e.nombre}</td>
                <td>${separador_Mil(e.precio.toString())}</td>
                <td>${e.existencia}</td>
                <td>${buscarMarca(e.idmarca)}</td>
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


    function cargarMarca() {
        select = document.getElementById("idmarca");
        for(i = 0; i < marcaArray.length; i++){
            option = document.createElement("option");
            option.value = marcaArray[i].id;
            option.text = marcaArray[i].nombre;
            select.appendChild(option);
        }
    }


    function cargarCategoria() {
        select = document.getElementById("idcategoria");
        for(i = 0; i < categoriaArray.length; i++){
            option = document.createElement("option");
            option.value = categoriaArray[i].id;
            option.text = categoriaArray[i].nombre;
            select.appendChild(option);
        }
    }

    // Listar registros
    cargarTabla();
    cargarMarca();
    cargarCategoria();

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
        });
    }


    //Guardar nuevo registro
    $('#form').submit(function(e) {
        let postData = {
            id : id,
            nombre : document.getElementById('nombre-producto').value.toUpperCase(),
            precio : document.getElementById('precio').value,
            existencia : document.getElementById('existencia').value,
            idmarca : document.getElementById('idmarca').value,
            idcategoria : document.getElementById('idcategoria').value
        };


        if(document.getElementById('nombre-producto').length === 0){
            alertify.error('Campo vacio, complete los campos principales.');
            document.getElementById('nombre-producto').focus();
        }else if(document.getElementById('precio').length === 0 || parseInt(quitarSeparador(document.getElementById('precio').value)) < 100){
            alertify.error('Campo vacio, complete el precio.');
            document.getElementById('precio').focus();
        }else if(document.getElementById('existencia').value.length === 0){
            alertify.error('Campo vacio, complete la existencia del artículo.');
            document.getElementById('existencia').focus();
        }else{
            if(validarNombre(postData.nombre)){
                if(id < 1){

                    postData.id = obtenerId();
                    registroArray.push(postData);
                    alertify.success('Registro insertado satisfactoriamente.');
                }else{
                    actualizarRegistro(postData);
                    alertify.success('Registro actualizado satisfactoriamente.');
                }
                newModal.hide();
                document.getElementById('form').reset();
                cargarTabla();
            }else{
                alertify.error('El nombre de la marca ya esta registrado.');
            }
        }
        e.preventDefault();
    });


    function validarNombre(nombre) {
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
                e.precio = data.precio;
                e.existencia = data.existencia;
                e.idmarca = data.idmarca;
                e.idcategoria = data.idcategoria;
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
        document.getElementById('titulo').innerHTML = 'Nuevo Producto.';
        document.getElementById('form').reset();
        document.getElementById('btn-form').innerHTML = 'Guardar.';

        newModal.show();

        setTimeout(function () {
            document.getElementById("nombre-producto").focus();
        }, 500);
    });



    //Botón cancelar
    document.getElementById('btn-cancel').addEventListener("click", function(){
        id = 0;
        document.getElementById('titulo').innerHTML = 'Nuevo Producto.';
        document.getElementById('btn-form').innerHTML = 'Guardar.';

        newModal.hide();
    });


    //Botón Editar
    $(document).on("click", ".btn-edit", function(){
        fila = $(this).closest("tr");
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID
        row = obtenerArt(id);

        document.getElementById('titulo').innerHTML = 'Editar Producto.';
        document.getElementById('btn-form').innerHTML = 'Modificar.';
        document.getElementById('nombre-producto').value = row.nombre;
        document.getElementById('precio').value = separador_Mil(row.precio.toString());
        document.getElementById('existencia').value = row.existencia;
        document.getElementById('idmarca').value = row.idmarca;
        document.getElementById('idcategoria').value = row.idcategoria;

        newModal.show();

        setTimeout(function () {
            document.getElementById("nombre-producto").focus();
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
        if($('#nombre-producto').val().length > 0 || $('#precio').val().length > 0 || $('#existencia').val().length > 0 || $('#idmarca').val().length > 0 || $('#idcategoria').val().length > 0){
            alertify.confirm('Cerrar ventana', ' ¿Está seguro de cerrar la ventana?', 
            function(){ 
                
            }, 
            function(){ 
                $('#newModal').modal('show');
            }).set({labels:{ok:'Sí, cerrar!', cancel: 'Cancelar'}, padding: false});            
        }        
    });

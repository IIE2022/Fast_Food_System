
/* Aquí va la lógica de lado del cliente*/


    var fila; //captura la fila, para editar o eliminar
    var id = 0;

    var newModal = new bootstrap.Modal(document.getElementById('newModal'), {
        backdrop: "static",
        keyboard: true
    });
   

    function usuarioModel(id, nombre, telefono, direccion, usuario, password, idrol) {
        return {
            id : id,
            nombre : nombre,
            telefono : telefono,
            direccion : direccion,
            usuario : usuario,
            password : password,
            idrol : idrol
        };
    }


    let registroArray = [
        usuarioModel(1, "ADMIN", "0985632145", "BARRIO 1", "admin", "12345678", 1),
        usuarioModel(2, "USUARIO 2", "0985632147", "BARRIO 2", "venta", "12345678", 2),
   ];


    function cargarTabla() {
        $('#example').dataTable().fnDestroy();
        let plantilla = ``;
        let comando = '';
        registroArray.forEach(e => {
            comando = `
                <button type="button" class="btn btn-primary btn-edit boton"> Actualizar </button>
                <button type="button" class="btn btn-danger btn-delete boton"> Eliminar </button>
            `;
            if(e.id == getCookie('iduser')){
                comando = `
                    <button type="button" class="btn btn-primary btn-edit boton"> Actualizar </button>
                `;
            }
            plantilla +=`
            <tr>
                <td class="text-end">${e.id}</td>
                <td>${e.nombre}</td>
                <td class="text-end">${e.telefono}</td>
                <td>${e.usuario}</td>
                <td>
                    ${comando}
                </td>
            </tr>
            `;
        });
        $('#tbody_registro').html(plantilla);
        consultarRegistros();
    }


    function tiene_numeros(texto, cant){
        let numeros ="0123456789";
        let cont = 0;
        for(i=0; i<texto.length; i++){
            numeros.indexOf(texto.charAt(i),0);
            if (numeros.indexOf(texto.charAt(i),0)!=-1){
                cont++;
            }
        }
        if(cont >= cant){
            return true;
        }else{
            return false;
        }
    } 

    

    function tiene_minusculas(texto, cant){
        let cont = 0;
        let letras="abcdefghyjklmnñopqrstuvwxyz";
        for(i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!=-1){
                cont++;
            }
        }

        if(cont >= cant){
            return true;
        }else{
            return false;
        }
    } 

    

    function tiene_mayusculas(texto, cant){
        let cont = 0;
        let letras="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        for(i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!=-1){
                cont++;
            }
        }

        if(cont >= cant){
            return true;
        }else{
            return false;
        }
    }

    

    function tiene_caracter_especial(texto, cant){
        let cont = 0;
        let mayuscula="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        let minuscula="abcdefghyjklmnñopqrstuvwxyz";
        let numeros ="0123456789";
        
        for(i=0; i<texto.length; i++){
            if (mayuscula.indexOf(texto.charAt(i),0) == -1 && minuscula.indexOf(texto.charAt(i),0) == -1  && numeros.indexOf(texto.charAt(i),0) == -1 ){
                cont++;
            }
        }

        if(cont >= cant){
            return true;
        }else{
            return false;
        }
    }


    function alfanumerico(pass) {        
        if(tiene_numeros(pass, 2) == true && tiene_minusculas(pass, 2) == true && tiene_mayusculas(pass, 2) == true && tiene_caracter_especial(pass, 2) == true){
            return true;
        }else{
            return false;
        }
    }

        
    function rolModel(id, nombre) {
        return {
            id : id,
            nombre : nombre
        };
    }


    let rolArray = [
        rolModel(1, "ADMINISTRADOR"), 
        rolModel(2, "CAJA"), 
    ];

    

    function cargarRol() {
        $('#idrol').find('option').remove();
        $('#idrol').append('<option value="0">Seleccione un Rol*</option>');
        rolArray.forEach(v => {
            $('#idrol').append('<option value="' + v.id + '">' + v.nombre + '</option>');
        });
    }

    cargarRol();

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
        }); 
    }

    
    //Guardar nuevo registro
    document.getElementById('btn-form').addEventListener("click", function(){
        let postData = {
            id : id,
            nombre : $('#nombre').val().toUpperCase(),
            telefono : $('#telefono').val(),
            direccion : $('#direccion').val().toUpperCase(),
            usuario : $('#usuario').val(),
            password : $('#password').val()
        };
        
        if($('#nombre').val().length === 0){
            alertify.error('Campo vacio, complete con el nombre y apellido.');
            $('#nombre').focus();
        }else if($('#idrol').val().length === 0){
            alertify.error('Seleccione el rol del usuario.');
            $('#idrol').focus();
        }else if($('#usuario').val().length === 0){
            alertify.error('Campo vacio, complete con el usuario.');
            $('#usuario').focus();
        }else if($('#usuario').val().length < 5){
            alertify.error('Campo corto, mínimo 5 caracteres.');
            $('#usuario').focus();
        }else if($('#password-user').val().length === 0 && id < 1){
            alertify.error('Campo vacio, defina una contraseña.');
            $('#password-user').focus();
        }else if($('#password-user').val().length < 8 && id < 1){
            alertify.error('Campo corto, mínimo 8 caracteres.');
            $('#password-user').focus();
        }else if(alfanumerico($('#password-user').val()) == false && id < 1){
            alertify.error('Contraseña debil, mínimo 8 caracteres con 2 numéricos.');
            $('#password-user').focus();
        }else if($('#password2-user').val() != $('#password-user').val() && id < 1){
            alertify.error('Las contraseñas no coinciden.');
            $('#password2-user').val('');
            $('#password-user').focus();
        }else{
            if(validarNombre(postData.nombre)){
                if(validarUsuario(postData.usuario)){
                    if(id < 1){
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
                    alertify.error('El usuario ya esta registrado.'); 
                }    
            }else{
                alertify.error('El nombre ya esta registrado.'); 
            }        
        }
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


    function validarUsuario(usuario) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(e.usuario == usuario && e.id != id){
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


    function obtenerRow(id) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(id == e.id){
                return e;
            }
        }
        return null;
    }


    function actualizarRegistro(data) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(data.id == e.id){
                e.nombre = data.nombre;
                e.telefono = data.telefono;
                e.usuario = data.usuario;
                e.password = data.password;
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
        document.getElementById('titulo').innerHTML = 'Nuevo Usuario.';
        document.getElementById('form').reset();
        document.getElementById('btn-form').innerHTML = 'Guardar.';
        $('#pnl_pass').show();
        newModal.show();//abrir modal con js

        setTimeout(function () {
            document.getElementById("nombre").focus();	
        }, 500);
    });



    //Botón cancelar
    document.getElementById('btn-cancel').addEventListener("click", function(){			        
        id = 0;	            
        document.getElementById('titulo').innerHTML = 'Nuevo Usuario.';
        document.getElementById('btn-form').innerHTML = 'Guardar.';
        $('#pnl_pass').show();
        
        newModal.hide();	//ocultar modal
    });

        
    //Botón Editar        
    $(document).on("click", ".btn-edit", function(){		
        fila = $(this).closest("tr");	        
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID	
        
        row = obtenerRow(id);
        $('#pnl_pass').hide();

        document.getElementById('titulo').innerHTML = 'Editar Usuario.';
        document.getElementById('btn-form').innerHTML = 'Modificar.';
        document.getElementById('nombre').value = row.nombre;
        document.getElementById('direccion').value = row.direccion;
        document.getElementById('telefono').value = row.telefono;
        document.getElementById('usuario').value = row.usuario;
        document.getElementById('idrol').value = row.idrol;
        document.getElementById('password-user').value = '';
        
        newModal.show();

        setTimeout(function () {
            document.getElementById("nombre").focus();	
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
        if($('#nombre').val().length > 0 || $('#telefono').val().length > 0 || $('#usuario').val().length > 0 || $('#direccion').val().length > 0 || $('#password-user').val().length > 0 || $('#password2-user').val().length > 0){
            alertify.confirm('Cerrar ventana', ' ¿Está seguro de cerrar la ventana?', 
            function(){ 
                
            }, 
            function(){ 
                $('#newModal').modal('show');
            }).set({labels:{ok:'Sí, cerrar!', cancel: 'Cancelar'}, padding: false});            
        }        
    });

    

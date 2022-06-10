
/* Aquí va la lógica de lado del cliente*/

$(function () {
    
    var id = 0;

   
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
    

    // Listar registros
    $(document).ready(function() {
        $('#id_user').val(getCookie("iduser"));
    });
    
   


    //Botón Nuevo
    $(document).on("click", "#btn-form", function(){
        id = 0;
        if($('#id_user').val().length === 0){
            alertify.error('No se encuentra el identificador del usuario');
            $('#user').focus();
        }else if($('#user').val().length === 0){
            alertify.error('Ingrese su usuario actual');
            $('#user').focus();
        }else if($('#new_user').val().length === 0){
            alertify.error('Ingrese su nuevo usuario');
            $('#new_user').focus();
        }else if($('#new_user').val().length < 5){
            alertify.error('usuario corto, mínimo 5 caracter.');
            $('#new_user').focus();
        }else if($('#new_user').val() != $('#new_user2').val()){
            alertify.error('Los usuarios no coinciden.');
            $('#new_user2').focus();
        }else{
            alertify.confirm(document.title, "¿Está seguro de actualizar su usuario?",
              function(){
                actualizar($('#id_user').val(), $('#user').val(), $('#new_user').val());
              },
              function(){ }
            ).set("labels", {ok:"Aceptar", cancel:"Cancelar"});            
        }
        
    });

    function existeUsuario(new_user) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(e.usuario == new_user){
                return true;
            }
        }
        return false;
    }


    function actualizar(id, user, new_user) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(e.id == id){
                console.log(e.usuario);
                console.log(user);
                if(e.usuario == user){
                    if(existeUsuario(new_user) == false){
                        e.usuario = new_user;
                        alertify.success('El usuario fue actualizado.');
                        setTimeout(() => {
                            window.location.href = "./menu.html";
                        }, 1500);
                    }else{
                        alertify.error('El usuario ya existe, intente con otro.');
                    }
                }else{
                    alertify.error('El usuario no es correcto.');
                    $('#user').val('');
                    setTimeout(() => { $('#user').focus(); }, 500);
                }
            }
        }
    }



    //Botón cancelar
    $(document).on("click", "#btn-cancel", function(){		
        alertify.confirm(document.title, "¿Está seguro de volver a la página principal?",
            function(){
            window.location.href = "./menu.html";
            },
            function(){ }
        ).set("labels", {ok:"Aceptar", cancel:"Cancelar"});     
    });



    
});
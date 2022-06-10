
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
            $('#pass').focus();
        }else if($('#pass').val().length === 0){
            alertify.error('Ingrese su contraseña actual');
            $('#pass').focus();
        }else if($('#new_pass').val().length === 0){
            alertify.error('Ingrese su nueva contraseña');
            $('#new_pass').focus();
        }else if($('#new_pass').val().length < 8){
            alertify.error('Contraseña corta, mínimo 8 caracter.');
            $('#new_pass').focus();
        }else if(alfanumerico($('#new_pass').val()) == false){
            alertify.error('Contraseña debil, mínimo 8 caracteres con 2 numéricos, 2 minúsculas, 2 mayúsculas y 2 caracteres especiales.');
            $('#new_pass').focus();
        }else if($('#new_pass').val() != $('#new_pass2').val()){
            alertify.error('Las contraseñas no coinciden.');
            $('#new_pass2').focus();
        }else{
            alertify.confirm(document.title, "¿Está seguro de actualizar su contraseña?",
              function(){
                actualizar($('#id_user').val(), $('#pass').val(), $('#new_pass').val());
              },
              function(){ }
            ).set("labels", {ok:"Aceptar", cancel:"Cancelar"});               
        }
        
    });



    function actualizar(id, pass, new_pass) {
        for (let i = 0; i < registroArray.length; i++) {
            const e = registroArray[i];
            if(e.id == id){
                if(e.password == pass){
                    e.password = new_pass;
                    alertify.success('La contraseña fue actualizada.');
                    setTimeout(() => {
                        window.location.href = "../views/index.html";
                    }, 1500);
                }else{
                    alertify.error('La contraseña no es correcta.');
                    $('#pass').val('');
                    setTimeout(() => {
                        $('#pass').focus();
                    }, 500);
                }
            }
        }
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
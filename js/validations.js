/* Hacemos que al ejecutar el index el foco este en el campo usuario */


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


     let usersArray = [
          usuarioModel(1, "ADMIN", "0985632145", "BARRIO 1", "admin", "12345678", 1),
          usuarioModel(2, "USUARIO 2", "0985632147", "BARRIO 2", "venta", "12345678", 2),
     ];


     function validar(user, pass) {
          for (let i = 0; i < usersArray.length; i++) {
               const e = usersArray[i];
               if(e.usuario == user){
                    if(e.password == pass){
                         return true;
                    }
               }
          }
          return false;
     }


     function obtener(user, pass) {
          for (let i = 0; i < usersArray.length; i++) {
               const e = usersArray[i];
               if(e.usuario == user){
                    if(e.password == pass){
                         return e;
                    }
               }
          }
          return null;
     }

     
    document.getElementById("user").addEventListener("keyup", focusPass);
    document.getElementById("pass").addEventListener("keyup", clickLogin);

     function focusPass(e) {
          if(e.keyCode == 13){
               document.getElementById("pass").focus();
          }
    }

    function clickLogin(e) {
     if(e.keyCode == 13){
          validateLogin();
     }
}

     function validateLogin(){
          let user = document.getElementById("user").value;
          let pass = document.getElementById("pass").value;

          if (user == "" || pass == "") {
               alertify.error("No deje vacios los campos");
               document.getElementById("user").focus();
          } else if (validar(user, pass) == true) {
               let row = obtener(user, pass);
               setCookie("login", "iniciado", 1);
               setCookie("iduser", row.id, 1);
               setCookie("nombre", row.nombre, 1);
               setCookie("telefono", row.telefono, 1);
               setCookie("direccion", row.direccion, 1);
               setCookie("idrol", row.idrol, 1);
               window.location.href = "./menu.html";
           }else{
               alertify.error("Error. usuario y/o contraseña incorrectos");
               document.getElementById("user").value = "";
               document.getElementById("pass").value = "";
               document.getElementById("user").focus();
          }
    }


 


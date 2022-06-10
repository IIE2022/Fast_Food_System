


function rolModelLogin(id, nombre) {
    return {
        id : id,
        nombre : nombre
    };
}


let rolArrayLogin = [
    rolModelLogin(1, "ADMINISTRADOR"), 
    rolModelLogin(2, "CAJA"), 
];


let menuAdministrador = `
    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active fs-2" href="#"id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="./img/mant.png" alt="" class="d-inline-block align-text-middle" style="width:54px;"> Mantenimiento
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><a class="dropdown-item" href="./usuario.html"><i class="bi bi-person-fill"></i> Usuarios</a></li>
                <li><a class="dropdown-item" href="./clientes.html"><i class="bi bi-people-fill"></i> Clientes</a></li>
                <li><a class="dropdown-item" href="./proveedor.html"><i class="bi bi-people-fill"></i> Proveedor</a></li>
                <li><a class="dropdown-item" href="./marca.html"><i class="bi bi-bookmark-check-fill"></i> Marcas</a></li>
                <li><a class="dropdown-item" href="./producto.html"><i class="bi bi-wallet-fill"></i> Productos</a></li>
                <li><a class="dropdown-item" href="./clasificacion.html"><i class="bi bi-clipboard-check-fill"></i> Clasificaciones</a></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active fs-2" href="#"id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="img/compras.png" alt="" style="width:54px;" class="d-inline-block align-text-middle"> Compras
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><a class="dropdown-item" href="./nueva_compra.html"><i class="bi bi-basket2-fill"></i> Registrar compras</a></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active fs-2" href="#"id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="img/precio.png" alt="" style="width:54px;" class="d-inline-block align-text-middle"> Ventas
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><a class="dropdown-item" href="./nueva_venta.html"><i class="bi bi-wallet-fill"></i> Nueva Venta</a></li>
            </ul>
        </li>
    </ul>
    <div class="d-flex">
            <a class="navbar-brand" href="#" id="menuLogin">
                <img src="img/user.png" style="width:60px;" class="rounded-pill" title="Acerca de..."> ${getCookie('nombre')}
            </a>
    </div>
`;


let menuVenta = `
    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">        
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active fs-2" href="#"id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="img/compras.png" alt="" style="width:54px;" class="d-inline-block align-text-middle"> Compras
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><a class="dropdown-item" href="./nueva_compra.html"><i class="bi bi-basket2-fill"></i> Registrar compras</a></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active fs-2" href="#"id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="img/precio.png" alt="" style="width:54px;" class="d-inline-block align-text-middle"> Ventas
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><a class="dropdown-item" href="./nueva_venta.html"><i class="bi bi-wallet-fill"></i> Nueva Venta</a></li>
            </ul>
        </li>
        
    </ul>
    <div class="d-flex">
            <a class="navbar-brand" href="#" id="menuLogin">
                <img src="img/user.png" style="width:60px;" class="rounded-pill" title="Acerca de..."> ${getCookie('nombre')}
            </a>
    </div>
`;


let modalLogin = `
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${getCookie('nombre')}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>TELÉFONO: ${getCookie('telefono')}</p>
                <p>DIRECCIÓN: ${getCookie('direccion')}</p>
                <p>Rol: ${getRolLogin(getCookie('idrol'))}</p>
                <button type="button" class="btn btn-primary" id="cambiarUser">Cambiar Usuario</button>
                <button type="button" class="btn btn-primary" id="cambiarPassword">Cambiar Contraseña</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-danger" id="cerrarSesion">Cerrar Sesión</button>
            </div>
        </div>
    </div>
`;


function getRolLogin(id) {
    for (let i = 0; i < rolArrayLogin.length; i++) {
        const e = rolArrayLogin[i];
        if(e.id == id){
            return e.nombre;
        }
    }
}




$(document).on("click", "#menuLogin", function () {

    $('#perfilLogin').html(modalLogin);  
    console.log('aca');  
    $('#perfilLogin').modal('show');    

});


$(document).on("click", "#cerrarSesion", function () {

    alertify.confirm('Cerrar Sesión', ' ¿Está seguro de cerrar sesión?',
    function(){
        eliminarCookies();
        window.location.href = "./index.html";
    },
    function(){
    }).set({labels:{ok:'Sí, salir!', cancel: 'Cancelar'}, padding: false});

});


$(document).on("click", "#cambiarUser", function () {

    window.location.href = "./updateUser.html";

});


$(document).on("click", "#cambiarPassword", function () {

    window.location.href = "./contrasenha.html";

});

$(function () {
  
    document.addEventListener("keyup", abrirVentanas, false);

    function abrirVentanas(event) {
        cod = event.keyCode;
        if(cod == 113){//113 = f2
        $('#consultarCliente').modal('show');	 	
        }else if(cod == 115){//115 == f4
        $('#consultarArticulo').modal('show');	 	
        }else if(cod == 119){//117 == f6
        guardarVenta();	 	
        }else if(cod == 120){//117 == f6
        cancelarVenta();	 	
        }else if(cod == 121){//117 == f6
        $('#modalAutor').modal('show');	 	
        }
    }


    let detalles = [];
    let totalVenta = 0;
    let efectivoG = 0;
    let chequeG = 0;
    let tarjetaG = 0;
    let tarjetaDG = 0;
    let valeG = 0;
  
    
    listarDetalles();
  
    function artModel(cod, nombre, stock, precio) {
      return {
        cod : cod,
        nombre : nombre,
        stock : stock,
        precio : precio
      };
    }
    var articulosArray = [
      artModel("1236587423698", "YERBA MATE DE 500 GRAMOS", 10, 3500),
      artModel("9876543210525", "GASEOSA COCA COLA DE 500ML", 15, 5000),
      artModel("5468796325004", "GALLETITA NESTLE", 5, 5000),
    ];
    


  function ventasModel(id, idcliente, num_ticket, total, fecha, condicion, estado, detalles) {
    return {
        id : id,
        idcliente : idcliente,
        num_ticket : num_ticket,
        total : total,
        fecha : fecha,
        condicion : condicion,
        estado : estado,
        detalles : detalles,
    };
  }


  let registroArray = [
    ventasModel(1, 1, 102, 30000, new Date(), 'C', 'ACTIVO', [{idarticulo: 1, cantidad: 2, precio: 15000, subtotal : 30000}]), 
    ventasModel(2, 3, 105, 1500000, new Date(), 'E', 'ACTIVO', [{idarticulo: 1, cantidad: 20, precio: 30000, subtotal : 600000},{idarticulo: 2, cantidad: 3, precio: 300000, subtotal : 900000}]), 
  ];


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


    $(document).ready(function() {
        
        limpiarForm();
        $('#tableCliente').DataTable({
          "language": {
            "decimal": "",
            "emptyTable": "No existen datos en la tabla",
            "info": "Se encontraron _TOTAL_ registro/s",
            "infoEmpty": "No existen registros!",
            "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
            "infoPostFix": "",
            "thousands": ".",
            "lengthMenu": "Mostrar _MENU_ registros por p??gina",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se ha encontrado ning??n registro!",
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
              { "sClass": "text-end", "aTargets": [ 0, 2 ]},
          ]
        });
        
        $('#consultTableArticulo').DataTable( {
          "language": {
              "decimal": "",
              "emptyTable": "No existen datos en la tabla",
              "info": "Se encontraron _TOTAL_ registro/s",
              "infoEmpty": "No existen registros!",
              "infoFiltered": "(Filtrado de un total de _MAX_ registros)",
              "infoPostFix": "",
              "thousands": ".",
              "lengthMenu": "Mostrar _MENU_ registros por p??gina",
              "loadingRecords": "Cargando...",
              "processing": "Procesando...",
              "search": "Buscar:",
              "zeroRecords": "No se ha encontrado ning??n registro!",
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
              { "sClass": "text-end", "aTargets": [ 0, 2, 3 ]},
          ]
        });  
    });

    

    
    

  function cargarTablaArt() {
    let plantilla = ``;
    articulosArray.forEach(e => {
        plantilla +=`
          <tr>
            <td>${e.cod}</td>
            <td>${e.nombre}</td>
            <td>${e.stock}</td>
            <td>${separador_Mil(e.precio.toString())}</td>
            <td>
              <button type="button" class="btn btn-info" id="btn-check"> <i class="bi bi-check" style="color: white;"></i>
            </td>
          </tr>
        `;
    });
    $('#tbody_articulo').html(plantilla);
  }


  cargarTablaArt();



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


  let clienteArray = [
      clientesModel(1, 1000000, '', "ADMIN", '0972XXXXXX', 'BARRIO LAS MERCEDES', 'admin@gmail.com'), 
      clientesModel(2, 2000000, '', "JUAN PEREZ", '0972XXXXXX', 'BARRIO LAS PALMAS', 'juanp@gmail.com'), 
      clientesModel(3, 3000000, '', "JUANA PEREZ", '0972XXXXXX', 'BARRIO LAS F??TIMA', 'juana@gmail.com'), 
  ];


  function cargarTablaCliente() {
    let plantilla = ``;
    let ruc = '';
    clienteArray.forEach(e => {
        ruc = separador_Mil(e.ci.toString());
        if(e.verificador != ''){
          ruc = separador_Mil(e.ci.toString())+'-'+e.verificador;
        }
        plantilla +=`
          <tr>
            <td>${ruc}</td>
            <td>${e.nombre}</td>
            <td>${e.telefono}</td>
            <td>
              <button type="button" class="btn btn-info btn-checkCliente"> <i class="bi bi-check" style="color: white;"></i>
                <button type="button" class="btn btn-edit btn-checkCliente"> <i class="fas fa-check"></i> </button>
            </td>
          </tr>
        `;
    });
    $('#tbody_cliente').html(plantilla);
  }

    
  cargarTablaCliente();


  function buscarCliente(ruc){
    let encontrado = false;
    ruc = quitarSeparador(ruc.toString());
    for (let i = 0; i < clienteArray.length; i++) {
      const e = clienteArray[i];
      if(e.ci == ruc){
        asignarCliente(e); 
        encontrado = true;
        break;
      }
    }
    if(encontrado == false){
      alertify.error('No se ha encontrado el registro del cliente.');
      vaciarCliente();
      $('#consultarCliente').modal('show');	 	
    }
  }


  function buscarClienteId(id){
    for (let i = 0; i < clienteArray.length; i++) {
      const e = clienteArray[i];
      if(e.id == id){
        return e;
      }
    }
  }


  // Data Picker Initialization
  $('#fecha').datepicker({
    format: 'dd/mm/yyyy',
    //startDate: '-3d',
    endDate: '+0d',
  });

  function cero(value) {
    if(value.toString().length == 1){
      return '0'+value;
    }
    return value;
  }


  $("#fecha").datepicker().datepicker("setDate", new Date().getFullYear()+'-'+cero(new Date().getMonth()+1)+'-'+cero(new Date().getDate())+' 00:00:00');


  viewProcesar();


  //Bot??n Seleccionar item        
  $(document).on("click", "#search-cliente", function () {
    $('#consultarCliente').modal('show');	 	
  });


  //Bot??n Seleccionar item        
  $(document).on("click", ".btn-checkCliente", function () {
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID
    ci = fila.find('td:eq(0)').text(); //capturo el CI	
    nombre = fila.find('td:eq(1)').text(); //capturo el Nombre	
    telefono = fila.find('td:eq(2)').text(); //capturo el TELEFONO	
    
    asignarCliente(buscarClienteId(id));
    $('#consultarCliente').modal('hide');
  });


  
  function vaciarCliente() {
    $('#id_cliente').val('');
    $('#cirucC').val('');
    $('#nombreC').val('');
    $('#telefonoC').val('');    
  }


  function asignarCliente(data) {
    $('#id_cliente').val(data.id);
    $('#cirucC').val(separador_Mil(data.ci.toString()));
    if(data.verificador != ''){
      $('#cirucC').val(separador_Mil(data.ci.toString())+'-'+e.verificador);
    }
    $('#nombreC').val(data.nombre);
    $('#telefonoC').val(data.telefono);
    viewProcesar();
  }
  

  $('#cirucC').keyup(function (e) {
    if (e.keyCode == 13) {//Si presiona enter
      let cod = $('#cirucC').val();
      if (cod != "") {
        buscarCliente(cod);
      } else {
        vaciarCliente();
      }
    }
    if($('#cirucC').val() == '-'){
      $('#cirucC').val('');
    }
    if(quitarSeparador($('#cirucC').val().toString()) == '0'){
      $('#cirucC').val('');
    }
  });

  

  $('#cirucC').blur(function (e) {
    var valor = $('#cirucC').val().toString();
    let array = valor.split('-');

    if(valor.search("-") > -1){
      valor = quitarSeparador(array[0]);
    }

    var num = valor.replace(/\D/g,'')//Elimina todo que no sea un guion

    if(!isNaN(num)){
      if(num <= 0){
        $('#cirucC').val('');
      }
    }
    viewProcesar();

  });


  //Bot??n Nuevo
  $(document).on("click", "#search", function(){
      $('#consultarArticulo').modal('show');	        
      $("#consultarArticulo").css("z-index", "1500");	 	//Poner el modal encima de otro modal		
  });


  //Bot??n Seleccionar item        
  $(document).on("click", "#btn-check", function () {
    fila = $(this).closest("tr");
    id = (fila.find('td:eq(0)').text()); //capturo el ID
    nombre = (fila.find('td:eq(1)').text()); //capturo el ID
    stock = (fila.find('td:eq(2)').text()); //capturo el ID
    precio = (fila.find('td:eq(3)').text()); //capturo el ID

    asignarArticulo(id, nombre, quitarSeparador(precio), stock);
    calcularTotal();

    $('#consultarArticulo').modal('hide');
  });

  

  function vaciarArticulo() {
    $('#txt_cod_producto').val('');
    $('#txt_descripcion').val('-');
    $('#txt_cant_producto').val('1');
    $('#txt_precio').val('0');
    $('#txt_precio_total').val('0');
    $('#txt_existencia').val('');

    //Bloquear Cantidad y Costo
    // $('#txt_cant_producto').attr('disabled', 'disabled');
    $('#txt_precio').attr('disabled', 'disabled');
    // Ocultar Boto Agregar
    // $('#add_product_venta').hide();
  }


  function asignarArticulo(id, nombre, precio, stock) {
    // idiva = iva;
    $('#txt_cod_producto').val(id);
    $('#txt_descripcion').val(nombre);
    // $('#txt_existencia').html(info.existencia);
    if($('#txt_cant_producto').val().length < 1 || $('#txt_cant_producto').val() == '0'){
        $('#txt_cant_producto').val('1');
    }
    $('#txt_existencia').val(stock);
    $('#txt_precio').val(separador_Mil(precio.toString()));
    $('#txt_precio_total').val(separador_Mil(precio.toString()));
    // Activar Cantidad y Costo
    // $('#txt_cant_producto').removeAttr('disabled');
    $('#txt_precio').removeAttr('disabled');
    calcularTotal();
    if(parseFloat($('#txt_cant_producto').val()) <= parseFloat($('#txt_existencia').val())){
        agregarDetalle(); 
    }else{
        alertify.error('La cantidad supera al stock.');
    }
    
    $( "#txt_cod_producto" ).focus();
  }


  function buscarArticulo(id){
    let encontrado = false;
    id = quitarSeparador(id.toString());
    for (let i = 0; i < articulosArray.length; i++) {
      const e = articulosArray[i];
      if(e.cod == id){
        asignarArticulo(e.cod, e.nombre, e.precio, e.stock); 
        encontrado = true;
        break;
      }
    }
    if(encontrado == false){
      alertify.error('No se ha encontrado el art??culo.');
      vaciarArticulo();
      $('#consultarArticulo').modal('show');	 	
    }
  }



  $('#txt_cod_producto').blur(function (e) {
    var valor = $('#txt_cod_producto').val().toString();
    if(isNaN(valor)){
      $('#txt_cod_producto').val('');
    }else{
      if(parseInt(valor) < 1){
        $('#txt_cod_producto').val('');
      }
    }

  });
 

  $('#txt_cant_producto').keyup(function (e) {
    var valor = $('#txt_cant_producto').val().toString();
    if(valor.substr(-1) != '.' && $('#txt_cant_producto').val() != ''){
      if(!isNaN(valor)){
        calcularTotal();
        if(parseFloat(valor) <= 0){
          $('#txt_cant_producto').val('');
        }else{
          $('#txt_cant_producto').val(parseFloat(valor));
        }
      }
    }

    if(e.keyCode == 13){
      $('#txt_cod_producto').focus();
    }
    
  });
  

  $('#txt_cant_producto').blur(function (e) {
    var valor = $('#txt_cant_producto').val().toString();
    if(!isNaN(valor) && $('#txt_cant_producto').val() != ''){
      calcularTotal();
      if(parseFloat(valor) <= 0){
        $('#txt_cant_producto').val('1');
      }else{
        $('#txt_cant_producto').val(parseFloat(valor));
      }
    }else{
      $('#txt_cant_producto').val('1');
    }
  });



  $('#txt_cod_producto').keyup(function (e) {
    e.preventDefault();

    if (e.keyCode == 13) {//Es igual a enter
      let productos = $(this).val();
      if (productos == "") {
        vaciarArticulo();
      } else {

        buscarArticulo(productos);
      }
    }

  });


  $('#txt_precio').keyup(function (e) {
    var valor = $('#txt_precio').val().toString();
    if($('#txt_precio').val() != ''){
      if(!isNaN(valor)){
        calcularTotal();
        if(parseInt(valor) <= 0){
          $('#txt_precio').val('');
        }else{
          $('#txt_precio').val(parseInt(valor));
        }
      }
    }
    
  });
  

  $('#txt_precio').blur(function (e) {
    var valor = $('#txt_precio').val().toString();
    if(!isNaN(valor) && $('#txt_precio').val() != ''){
      calcularTotal();
      if(parseFloat(valor) <= 0){
        $('#txt_precio').val('1');
      }else{
        $('#txt_precio').val(parseFloat(valor));
      }
    }else{
      $('#txt_precio').val('1');
    }
  });


  function calcularTotal() {
    var subtotal = ($('#txt_cant_producto').val()) * quitarSeparador($('#txt_precio').val().toString());
    $('#txt_precio_total').val(separador_Mil(subtotal.toString()));
    // Ocultat el boton Agregar si la cantidad y costo es menor que 1
    if (($('#txt_cod_producto').val() < 1 || isNaN($('#txt_cod_producto').val())) || ($('#txt_cant_producto').val() < 1 || isNaN($('#txt_cant_producto').val())) || ($('#txt_precio').val() < 1 || isNaN($('#txt_precio').val()))) {
        // $('#add_product_venta').attr('disabled', true);
    } else {
        // $('#add_product_venta').attr('disabled', false);
    }
  }


  // Agregar producto al detalle_venta
  $('#add_product_venta').click(function (e) {
    e.preventDefault();

    agregarDetalle(); 
  });

    function agregarDetalle() {

        if(parseFloat($('#txt_cant_producto').val()) > parseFloat($('#txt_existencia').val())){
          alertify.error('La cantidad supera al stock.');
        }

        if (($('#txt_cod_producto').val() < 1 || isNaN($('#txt_cod_producto').val())) || ($('#txt_cant_producto').val() < 1 || parseFloat($('#txt_cant_producto').val()) > parseFloat($('#txt_existencia').val()) || isNaN($('#txt_cant_producto').val())) || ($('#txt_precio').val() < 1 || isNaN($('#txt_precio').val()))) {
            //  $('#add_product_venta').hide();
            } else {
            if ($('#txt_cant_producto').val() > 0 && $('#txt_precio').val() > 0) {
                let codarticulo = $('#txt_cod_producto').val();
                let descripcion = $('#txt_descripcion').val();
                let cantidad = $('#txt_cant_producto').val();
                let precio = $('#txt_precio').val();
                let subtotal = $('#txt_precio_total').val();
        
        
                let detalle = {
                codarticulo: codarticulo,
                descripcion: descripcion,
                cantidad: cantidad,        
                precio: precio,
                subtotal,
                };
        
                if(!verificarRegistro(codarticulo, cantidad, precio)){
                    detalles.push(detalle);                    
                }
                
                
        
                listarDetalles();
        
                vaciarArticulo();
        
                viewProcesar();
        
                $( "#txt_cod_producto" ).focus();
            }
        }   
    }



  //Verificar si ese producto ya se cargo
    function verificarRegistro(id, cantidad, precio) {
        cantidad = parseFloat(cantidad);
        for (let i = 0; i < detalles.length; i++) {
            if(detalles[i].codarticulo === id){
                if(verificarStock(id, cantidad)){
                    detalles[i].cantidad = (parseFloat(detalles[i].cantidad) + cantidad);
                    detalles[i].precio = precio;
                    detalles[i].subtotal = (detalles[i].cantidad * parseInt(quitarSeparador(detalles[i].precio))).toString();
                }else{
                    alertify.error('La cantidad supera al stock');
                }
                
                return true;        
            }
        }    
    }


    function verificarStock(id, cantidad) {
        cantidad = parseFloat(cantidad);
        for (let i = 0; i < detalles.length; i++) {
            if(detalles[i].codarticulo === id){
                if((parseFloat(detalles[i].cantidad) + cantidad) <= parseFloat($( "#txt_existencia" ).val())){            
                    return true;
                }        
            }
        }    
    }



  //Listar los detalles
  function listarDetalles() {
    totalVenta = 0;
    let subtotal = 0;
    let plantilla = '';
    var orden = 0;
    detalles.forEach(det => {   
      orden++;   
      subtotal += parseInt(quitarSeparador(det.subtotal.toString()));
      plantilla += `
        <tr>
          <td>${orden}</td>
          <td class="ocultar">${det.codarticulo}</td>
          <td>${det.descripcion}</td>
          <td>${det.cantidad}</td>
          <td>${separador_Mil(det.precio.toString())}</td>
          <td>${separador_Mil(det.subtotal.toString())}</td>
          <td>
            <button type="button" class="btn btn-danger btn-det"> Quitar </button>
          </td>
        </tr>
      `;
    });
    
    totalVenta = subtotal;
    // cabecera.total = subtotal;
    if(subtotal == 0){      
      $('#total_venta').val('');
    }else{      
      $('#total_venta').val(separador_Mil(subtotal.toString()));
    }
    $('#detalle_venta').html(plantilla);
    viewProcesar();
    setTimeout(() => {
      $('#txt_cod_producto').focus();
    }, 500);
  }


  //Eliminar        
  $(document).on("click", ".btn-det", function () {
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(1)').text()); //capturo el ID		            
    nombre = fila.find('td:eq(2)').text();

    alertify.confirm('Confirmar', ' ??Est?? seguro de quitar el registro?',
    function(){
      $('#modalAutorizacion').modal('show');
      setTimeout(function () {
        $("#password_autorizacion").focus();
      }, 500);
    },
    function(){
    }).set({labels:{ok:'S??, confirmar!', cancel: 'Cancelar'}, padding: false});
    
  });

  
  $('#password_autorizacion').keyup(function (e) {
    if (e.keyCode == 13) {//Si presiona enter
      $("#btn-autorizacion").click();
    }    
  });

  //Modal autoizacion
  $(document).on("click", "#btn-autorizacion", function () {
    //Abrimos modal de autorizacion
    // $('#modalAutorizacion').modal('show');
    let puedeGuardar = true;
    if ($('#password_autorizacion').val() == '') {
      puedeGuardar = false;
      alertify.error('Ingrese la contrase??a');
      $('#password_autorizacion').focus();
    }

    if (puedeGuardar) {
      let postData = {
        password: $('#password_autorizacion').val()
      };

            
      if(validarUsuario(postData) == true){
        borrarRegistro(id);
        $('#password_autorizacion').val('');
        $('#modalAutorizacion').modal('hide');
      }else{
        alertify.error('Clave incorrecta.');    
        $('#password_autorizacion').val('');
        setTimeout(function () {
          $('#password_autorizacion').focus();
        }, 500);
      }
    }    
  });
  //FIN Modal autoizacion


    function validarUsuario(users) {
        for (let i = 0; i < usersArray.length; i++) {
            const e = usersArray[i];
            if(e.password == users.password && e.idrol == 1){
                return true;
            }
        }
        return false;
    }


  //Borrar un registro
  function borrarRegistro(id) {
    // detalles.splice(fila, 1);
    let i = 0;
    pos = -1;
    while(i < detalles.length){
      if(detalles[i].codarticulo == id){
        pos = i;break;
      }
      i++;
    }
    detalles.splice(pos, 1);
    listarDetalles();
  }


  // mostrar/ ocultar boton Procesar
  function viewProcesar() {
    if ($('#detalle_venta tr').length > 0 && $('#cirucC').val().length > 0 &&  $('#nombreC').val().length > 0 
      && $('#total_venta').val().length > 0 && $('#fecha').val().length > 0 ) {
      $('#btn_guardar_venta').attr('disabled', false);
    } else {
      $('#btn_guardar_venta').attr('disabled', true);
    }
  }


  //Bot??n Seleccionar item        
  $(document).on("click", "#btn_guardar_venta", function () {
    guardarVenta();
  });


  function obtenerId() {
    let id = 0;
    registroArray.forEach(e => {
        id = e.id;
    });
    return (id+1);
  }


  function obtenerTicket() {
    let id = 0;
    registroArray.forEach(e => {
        id = e.num_ticket;
    });
    return (id+1);
  }


  function guardarVenta() {
    let puede = true;        
    if ($('#detalle_venta tr').length < 1 ) {
      alertify.error('Falta el detalle de la venta.');
      puede = false;
      $('#txt_cod_producto').focus();
    }else if ($('#cirucC').val().length < 1 ) {
      alertify.error('Falta el ci o ruc del cliente.');
      puede = false;
      $('#cirucC').focus();
    }else if ($('#nombreC').val().length < 1 ) {
      alertify.error('Falta el nombre del cliente.');
      puede = false;
      $('#nombreC').focus();
    }else if ($('#total_venta').val().length < 1 ) {
      alertify.error('Falta el total de la venta'); 
      puede = false;
      $('#total_venta').focus();
    }else if ($('#fecha').length < 1 ) {
      alertify.error('Falta la fecha de venta'); 
      puede = false;
      $('#fecha').focus();
    }

    
    if(puede){

      if($('#condicion').val() == 'C' && (efectivoG +chequeG + tarjetaG + tarjetaDG + valeG) < totalVenta){
        puede = false;
        $('#totalMV').text('TOTAL DE LA VENTA : ' + separador_Mil(totalVenta.toString()) + ' gs.');
        $('#totalPMV').text('TOTAL PAGADO : 0 gs.');
        $('#modalPagoVentaContado').modal('show');
        setTimeout(function () {
          $("#efectivoMV").focus();
        }, 500);      
      }

      if(puede){
        let postData = {
          id : obtenerId(),
          idcliente : $('#id_cliente').val(),
          num_ticket : obtenerTicket(),
          total : $('#total_venta').val(),
          fecha : $('#fecha').val(),
          condicion : $('#condicion').val(),
          estado : 'ACTIVO',
          efectivo : efectivoG,
          vale : valeG,
          cheque : chequeG,
          tarjeta : tarjetaG,
          tarjetaD : tarjetaDG,
          detalles : detalles
        };
      
            
        alertify.confirm('Confirmar', ' ??Est?? seguro de guardar el registro de venta?',
        function(){
          console.log(postData);
            registroArray.push(postData);
            alertify.success('Venta registrada.');
            limpiarForm();
        },
        function(){
          efectivoG = 0;
          valeG = 0;
          chequeG = 0;
          tarjetaG = 0;
          tarjetaDG = 0;
          $('#efectivoMV').val('0');
          $('#tarjetaMV').val('0');
          $('#tarjetaDMV').val('0');
          $('#chequeMV').val('0');
          $('#valeMV').val('0');
        }).set({labels:{ok:'S??, aceptar!', cancel: 'Cancelar'}, padding: false});
        
              
      }
    }
  }

  $("#modalPagoVentaContado").on('hidden.bs.modal', function () {
    efectivoG = 0;
    valeG = 0;
    chequeG = 0;
    tarjetaG = 0;
    tarjetaDG = 0;
    $('#efectivoMV').val('0');
    $('#tarjetaMV').val('0');
    $('#tarjetaDMV').val('0');
    $('#chequeMV').val('0');
    $('#valeMV').val('0');
  });


  function limpiarForm() {
    vaciarCliente();
    vaciarArticulo();    
    detalles = [];
    calcularTotal();
    listarDetalles();     
    
    $('#efectivoMV').val('0');
    $('#tarjetaMV').val('0');
    $('#tarjetaDMV').val('0');
    $('#chequeMV').val('0');
    $('#valeMV').val('0');
    
    $("#cirucC").focus(); 
  }


  //Eliminar        
  $(document).on("click", "#cerrar_venta", function () {
    cerrarVenta();
  });


  //salir        
  $(document).on("click", "#icono-cerrar",  function(){	
    if(clienteCargado() == true || detalles.length > 0){
        alertify.confirm('Cerrar ventana', ' ??Est?? seguro de cerrar la ventana?', 
        function(){ 
            window.location.href = "./menu.html";
        }, 
        function(){ 
            
        }).set({labels:{ok:'S??, cerrar!', cancel: 'Cancelar'}, padding: false});  
    } else{
        window.location.href = "./menu.html";
    }
});


  //Eliminar        
  $(document).on("click", "#cancelar_venta", function () {
    cancelarVenta();
  });


  function cerrarVenta(){
    if(clienteCargado() == true || detalles.length > 0){
      alertify.confirm('Confirmar', ' ??Est?? seguro de cerrar el registro de venta?',
      function(){
        window.location.href = "./menu.html";
      },
      function(){
      }).set({labels:{ok:'S??, aceptar!', cancel: 'Cancelar'}, padding: false});
    }else{
      window.location.href = "./menu.html";
    }
  }


  function cancelarVenta(){
    if(clienteCargado() == true || detalles.length > 0){
      alertify.confirm('Confirmar', ' ??Est?? seguro de cancelar el registro de venta?',
      function(){
        limpiarForm();
      },
      function(){
      }).set({labels:{ok:'S??, aceptar!', cancel: 'Cancelar'}, padding: false});
    }else{
      limpiarForm();
    }
  }


  function clienteCargado(){
      if($('#cirucC').val().length > 0 || $('#nombreC').val().length > 0){
        return true;
      }else{
        return false
      }
  }




  
  //Campos de cobro contado
  $('#efectivoMV').keyup(function (e) {
    if (e.keyCode == 13) {//Si presiona enter
      $('#efectivoMV').val(separador_Mil(totalVenta.toString()));
    } else if (e.keyCode == 120) {//F9
      $('#btn-MPV').click();
    }
    calcularTotalCobro();
  });


  $('#efectivoMV').blur(function (e) {
    if ($('#efectivoMV').val().length == 0) {//Si presiona enter
      $('#efectivoMV').val('0');
    }
  });


  $('#chequeMV').keyup(function (e) {
    if (e.keyCode == 13) {//Si presiona enter
      $('#chequeMV').val(separador_Mil(totalVenta.toString()));
    } else if (e.keyCode == 120) {//F9
      $('#btn-MPV').click();
    }
    calcularTotalCobro();
  });

  $('#chequeMV').blur(function (e) {
    if ($('#chequeMV').val().length == 0) {//Si presiona enter
      $('#chequeMV').val('0');
    }
  });


  $('#tarjetaMV').keyup(function (e) {
    if (e.keyCode == 13) {//Si presiona enter
      $('#tarjetaMV').val(separador_Mil(totalVenta.toString()));
    } else if (e.keyCode == 120) {//F9
      $('#btn-MPV').click();
    }
    calcularTotalCobro();
  });

  $('#tarjetaMV').blur(function (e) {
    if ($('#tarjetaMV').val().length == 0) {//Si presiona enter
      $('#tarjetaMV').val('0');
    }
  });


  $('#tarjetaDMV').keyup(function (e) {
    if (e.keyCode == 13) {//Si presiona enter
      $('#tarjetaDMV').val(separador_Mil(totalVenta.toString()));
    } else if (e.keyCode == 120) {//F9
      $('#btn-MPV').click();
    }
    calcularTotalCobro();
  });

  $('#tarjetaDMV').blur(function (e) {
    if ($('#tarjetaDMV').val().length == 0) {//Si presiona enter
      $('#tarjetaDMV').val('0');
    }
  });

  $('#valeMV').keyup(function (e) {
    if (e.keyCode == 13) {//Si presiona enter
      $('#valeMV').val(separador_Mil(totalVenta.toString()));
    } else if (e.keyCode == 120) {//F9
      $('#btn-MPV').click();
    }
    calcularTotalCobro();
  });

  $('#valeMV').blur(function (e) {
    if ($('#valeMV').val().length == 0) {//Si presiona enter
      $('#valeMV').val('0');
    }
  });

  function calcularTotalCobro() {
    let efectivo = parseInt(quitarSeparador($('#efectivoMV').val()));
    let cheque = parseInt(quitarSeparador($('#chequeMV').val()));
    let tarjeta = parseInt(quitarSeparador($('#tarjetaMV').val()));
    let tarjetaD = parseInt(quitarSeparador($('#tarjetaDMV').val()));
    let vale = parseInt(quitarSeparador($('#valeMV').val()));

    let totalV = parseInt(totalVenta);
    let totalP = efectivo + cheque + vale + tarjeta + tarjetaD;


    let vuelto = totalP - totalV;

    if(isNaN(totalP) == false){
      $('#totalPMV').text('Total pagado ' + separador_Mil(totalP.toString()) + ' gs.');
    }else{
      $('#totalPMV').text('Total pagado 0 gs.');
    }

    if (vuelto >= 0) {

      efectivoG = efectivo;
      chequeG = cheque;
      tarjetaG = tarjeta;
      tarjetaDG = tarjetaD;
      valeG = vale;

      $('#vueltoMV').text('Vuelto ' + separador_Mil(vuelto.toString()) + ' gs.');
      $("#btn-MPV").prop('disabled', false);
    } else {
      $("#btn-MPV").prop('disabled', true);
      $('#vueltoMV').text('Vuelto 0 gs.');
    }
  }

  
  $('#btn-MPV').click(function (e) {
    e.preventDefault();
    $('#modalPagoVentaContado').modal('hide');
    if((efectivoG +chequeG + tarjetaG + tarjetaDG + valeG) >= totalVenta){
      guardarVenta();
    }else{
      alertify.error('Monto inferior a la venta.');
    }

  });

});


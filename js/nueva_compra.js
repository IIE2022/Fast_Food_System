let detalles = [];
    listarDetalles();

    var modalAutor = new bootstrap.Modal(document.getElementById('modalAutor'), {
      keyboard: true
    });

    var consultarProveedor = new bootstrap.Modal(document.getElementById('consultarProveedor'), {
      keyboard: true
    });

    var consultarArticulo = new bootstrap.Modal(document.getElementById('consultarArticulo'), {
      keyboard: true
    });


    function artModel(cod, nombre, stock, precio) {
      return {
        cod: cod,
        nombre: nombre,
        stock: stock,
        precio: precio
      };
    }
    var arrayArt = [
      artModel("1236587423698", "YERBA MATE DE 500 GRAMOS", 10, 3500),
      artModel("9876543210525", "GASEOSA COCA COLA DE 500ML", 15, 5000),
      artModel("5468796325004", "GALLETITA NESTLE", 5, 5000),
    ];


    function provModel(cod, nombre) {
      return {
        cod: cod,
        nombre: nombre
      };
    }
    var arrayProv = [
      artModel("2569658", "RODOLFO PEREZ"),
      artModel("2658550", "JUAN PEREZ"),
      artModel("3108556", "CARLOS PEREIRA"),
    ];

    document.addEventListener("keyup", abrirVentanas);

    function abrirVentanas(event) {
      let code = event.keyCode;
      switch (code) {
        case 113:
          consultarProveedor.show();
          break;
        case 115:
          consultarArticulo.show();
          break;
        case 119:
          guardarCompra();
          break;
        case 120:
          limpiarForm();
          break;
        case 121:
          modalAutor.show();
          break;

        default:
          break;
      }
    }

    function iniciarDataTable() {
      $('#tableProveedor').DataTable({
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
            { "sClass": "text-end", "aTargets": [ 0, 2, 3 ]},
        ]
      });  
    }

    iniciarDataTable();

    // function format_numero(input) {
    //   var valor = input.value;
    //   let array = valor.split('-');
    //   let inicial = input.value.split('');
    //   if (valor.search("-") > -1) {
    //     valor = array[0];
    //   }


    //   if (inicial[0] == '-' || inicial[0] == '0') {
    //     input.value = ''; return;
    //   }

    //   var num = valor.replace(/\D/g, '')//Elimina todo que no sea un guion
    //   // var num = valor.replace(/\./g,'');//Elimina todo que no sea un punto
    //   if (!isNaN(num)) {
    //     //num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');// convierte a string y cada 3 caracter agrega un punto
    //     //num = num.split('').reverse().join('').replace(/^[\.]/,'');
    //     if (array.length > 1) {
    //       if (array[1] != '') {
    //         verificador = array[1].split('');
    //         input.value = num + '-' + verificador[0];
    //       } else {
    //         input.value = num + '-';// va remplazando en el input su valor con el separador de miles
    //       }
    //       verificador = array[1].split('');

    //     } else {
    //       input.value = num;// va remplazando en el input su valor con el separador de miles
    //     }
    //   } else {
    //     if (array.length > 1) {
    //       verificador = array[1].split('');
    //       input.value = valor.replace(/[^\d\.]*/g, '') + '-' + verificador[0];
    //     } else {
    //       input.value = valor.replace(/[^\d\.]*/g, '');
    //     }
    //   }

    // }

    // function soloRuc(e) {
    //   let key = window.Event ? e.which : e.keyCode;
    //   let array = e.target.value.split('-');
    //   var verificador;
    //   if (e.target.value.search("-") > -1) {
    //     verificador = array[1].split('');
    //     if (verificador.length >= 1) {
    //       return false;
    //     }
    //   }

    //   if (key == 45) {
    //     if (e.target.value.search("-") > -1) {
    //       return false;
    //     }
    //   }

    //   return (key >= 48 && key <= 57 || key == 8 || key == 45); // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
    // }

    // function format_factura(input) {
    //   let tieneSeparador = false;
    //   var valor = input.value;
    //   let array = valor.split('-');
    //   if (valor.search("-") > -1) {
    //     valor = array[0];
    //     tieneSeparador = true;
    //   }

    //   var numero = (valor);
    //   if (tieneSeparador) {
    //     numero = '';
    //     if (array.length >= 1) {

    //       if (array[0].split("").length >= 3 && parseInt(array[0]) == 0) {
    //         input.value = ''; return;
    //       } else if (array[0].split("").length > 3) {
    //         numero = array[0].substring(0, array[0].length - 1);;
    //       } else {
    //         numero = array[0];
    //       }
    //     }

    //     if (array.length >= 2) {
    //       if (array[1].split("").length >= 3 && parseInt(array[1]) == 0) {
    //         input.value = numero; return;
    //       } else if (array[1].split("").length > 3) {
    //         numero += '-' + array[1].substring(0, array[1].length - 1);
    //       } else {
    //         numero += '-' + array[1];
    //       }
    //     }

    //     if (array.length == 3) {
    //       if (array[2].split("").length >= 7 && parseInt(array[2]) == 0) {
    //         input.value = numero; return;
    //       } else if (array[2].split("").length > 7) {
    //         numero += '-' + array[2].substring(0, array[2].length - 1);;
    //       } else {
    //         numero += '-' + array[2];
    //       }
    //     }
    //   }



    //   input.value = numero;
    // }


    // function soloFactura(e) {
    //   var key = window.Event ? e.which : e.keyCode
    //   return (key >= 48 && key <= 57 || key == 8 || key == 45) // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
    // }

    function validarFecha() {
      hoy = new Date();
      fecha = new Date(document.getElementById("fecha").value);
      if (hoy.getTime() < fecha.getTime()) {
        document.getElementById("fecha").value = hoy.getFullYear() + '-' + rellenar(hoy.getMonth() + 1) + '-' + rellenar(hoy.getDate());
      }
    }

    function rellenar(valor) {
      array = valor.toString().split('');
      if (array.length > 1) {
        return valor.toString();
      } else {
        return '0' + valor.toString();
      }
    }

    function soloNumeros(e) {
      var key = window.Event ? e.which : e.keyCode
      return (key >= 48 && key <= 57 || key == 8) // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
    }

    function soloNumber(nombre) {
      document.getElementById(nombre).value = document.getElementById(nombre).value.replace(/[^\d\.]*/g, '');// EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
    }

    function soloDecimal(e) {
      var key = window.Event ? e.which : e.keyCode
      return (key >= 48 && key <= 57 || key == 8 || (key == 46 && e.target.value.indexOf(".") == -1)) // EL numero 8 es una tecla especial para borrar "BackSpace" el 48 y 57 ees que acepte solo numericos positivos
    }

    document.getElementById("cantidad").addEventListener("keyup", calcularTotal);
    document.getElementById("puni").addEventListener("keyup", calcularTotal);
    document.getElementById("barra").addEventListener("blur", validarCero);

    document.getElementById("ruc").addEventListener("keyup", obtenerRuc);
    document.getElementById("barra").addEventListener("keyup", obtenerArt);
    document.getElementById("fecha").value = new Date().getFullYear() + '-' + rellenar(new Date().getMonth() + 1) + '-' + rellenar(new Date().getDate());


    function obtenerRuc(e) {
      let encontrado = false;
      if (e.keyCode == 13 && document.getElementById("ruc").value != '') {
        for (let i = 0; i < arrayProv.length; i++) {
          const e = arrayProv[i];
          console.log(e.cod  +' == '+  quitarSeparador(document.getElementById("ruc").value) );
          if (e.cod.toString() == quitarSeparador(document.getElementById("ruc").value)) {
            asignarProv(e.cod, e.nombre);
            encontrado = true;
          }
        }
        if (encontrado == false) {
          vaciarProv();
          alertify.error('No se encuentra el proveedor');          
          consultarProveedor.show();
        }
      }
    }

    function vaciarProv() {
      document.getElementById("ruc").value = '';
      document.getElementById("prov").value = '';
      document.getElementById("ruc").focus();
    }

    function obtenerArt(e) {
      let encontrado = false;
      if (e.keyCode == 13 && document.getElementById("barra").value != '') {
        for (let i = 0; i < arrayArt.length; i++) {
          const e = arrayArt[i];
          if (e.cod == document.getElementById("barra").value) {
            asignarArt(e.cod, e.nombre, e.precio);
            encontrado = true;
          }
        }
        if (encontrado == false) {
          vaciarArt();
          alertify.error('No se encuentra el artículo');          
          consultarArticulo.show();
        }
      }
    }

    function vaciarArt() {
      document.getElementById("barra").value = '';
      document.getElementById("des").value = '';
      document.getElementById("cantidad").value = '';
      document.getElementById("puni").value = '';
      document.getElementById("subT").value = '';
      document.getElementById("barra").focus();
    }

    //Botón Editar
    $(document).on("click", "#btn-checkArt", function () {
      fila = $(this).closest("tr");
      id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID
      cod = fila.find('td:eq(0)').text(); //capturo el CI
      nombre = fila.find('td:eq(1)').text(); //capturo el Nombre
      precio = fila.find('td:eq(3)').text(); //capturo el Nombre
      consultarArticulo.hide();
      asignarArt(cod, nombre, precio);
    });


    $(document).on("click", "#btn-checkProv", function () {
      fila = $(this).closest("tr");
      id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID
      ci = fila.find('td:eq(0)').text(); //capturo el CI
      nombre = fila.find('td:eq(1)').text(); //capturo el Nombre
      consultarProveedor.hide();
      asignarProv(ci, nombre);
    });



    function asignarArt(cod, nombre, precio) {
      document.getElementById("barra").value = cod;
      document.getElementById("des").value = nombre;
      document.getElementById("cantidad").value = '1';
      document.getElementById("puni").value = precio;
      document.getElementById("subT").value = precio;
      document.getElementById("cantidad").focus();
    }


    function asignarProv(ci, nombre) {
      document.getElementById("ruc").value = ci;
      document.getElementById("prov").value = nombre;
      document.getElementById("barra").focus();
    }

    function validarCero() {
      if (document.getElementById("barra").value == '0') {
        document.getElementById("barra").value = '';
      }
    }

    function calcularTotal() {
      if (document.getElementById("cantidad").value == '0') {
        document.getElementById("cantidad").value = '';
      }
      if (document.getElementById("puni").value == '0') {
        document.getElementById("puni").value = '';
      }
      var subtotal = ((document.getElementById("cantidad").value)) * quitarSeparador((document.getElementById("puni").value));
      document.getElementById("subT").value = separador_Mil(subtotal.toString());
    }


    function guardarCompra() {
      let puede = true;

      if (document.getElementById("pagar").value.length < 1) {
        alertify.error('Falta el detalle de la compra.');
        puede = false;
        document.getElementById("barra").focus();
      } else if (document.getElementById("ruc").value.length < 1) {
        alertify.error('Falta el ruc del proveedor.');
        puede = false;
        document.getElementById("ruc").focus();
      } else if (document.getElementById("prov").value.length < 1) {
        alertify.error('Falta el nombre del proveedor.');
        puede = false;
        document.getElementById("prov").focus();
      } else if (document.getElementById("ndoc").value.length < 1) {
        alertify.error('Falta el número de documento.');
        puede = false;
        document.getElementById("ndoc").focus();
      } else if (new Date(document.getElementById("fecha").value).toString() == 'Invalid Date') {
        alertify.error('Falta la fecha de compra');
        puede = false;
        document.getElementById("fecha").focus();
      }


      if (puede) {
        alertify.confirm('Guardar', ' ¿Está seguro de guardar el registro de compra?',
          function () {
            alertify.success('Compra registrada.');
            limpiarForm();
          },
          function () {
          }).set({ labels: { ok: 'Sí, guardar!', cancel: 'Cancelar' }, padding: false });

      }
    }

    function limpiarArt() {
      document.getElementById("barra").value = '';
      document.getElementById("des").value = '';
      document.getElementById("cantidad").value = '';
      document.getElementById("puni").value = '';
      document.getElementById("subT").value = '';
    }

    function limpiarForm() {
      document.getElementById("ruc").value = '';
      document.getElementById("prov").value = '';
      document.getElementById("cantidad").value = '';
      document.getElementById("doc").value = '1';
      document.getElementById("ndoc").value = '';
      document.getElementById("fecha").value = new Date().getFullYear() + '-' + rellenar(new Date().getMonth() + 1) + '-' + rellenar(new Date().getDate());
      document.getElementById("condi").value = '1';
      limpiarArt();
      document.getElementById("pagar").value = '';
      detalles = [];
      listarDetalles();
      document.getElementById("ruc").focus();

    }


    

  //Eliminar        
  $(document).on("click", "#cancelar_compra", function () {
    cancelarCompra();
  });
    

  //Eliminar        
  $(document).on("click", "#cerrar_compra", function () {
    cerrarCompra();
  });


  function cerrarCompra(){
    if(proveedorCargado() == true || detalles.length > 0){
      alertify.confirm('Confirmar', ' ¿Está seguro de cerrar el registro de compra?',
      function(){
        window.location.href = "./menu.html";
      },
      function(){
      }).set({labels:{ok:'Sí, aceptar!', cancel: 'Cancelar'}, padding: false});
    }else{
      window.location.href = "./menu.html";
    }
  }


  function cancelarCompra(){
    console.log('aca');
    if(proveedorCargado() == true || detalles.length > 0){
      alertify.confirm('Confirmar', ' ¿Está seguro de cancelar el registro de compra?',
      function(){
        limpiarForm();
      },
      function(){
      }).set({labels:{ok:'Sí, aceptar!', cancel: 'Cancelar'}, padding: false});
    }else{
      limpiarForm();
    }
  }


  function proveedorCargado(){
      if($('#ruc').val().length > 0 || $('#prov').val().length > 0 || $('#ndoc').val().length > 0){
        return true;
      }else{
        return false
      }
  }


  function agregarDetalle() {
    if (document.getElementById("barra").value.length < 1) {
      alertify.error('Falta el código de barra');
      return;
    }
    if (document.getElementById("des").value.length < 1) {
      alertify.error('Falta la descripción del artículo.');
      return;
    }
    if (document.getElementById("cantidad").value.length < 1) {
      alertify.error('Falta la la cantidad.');
      return;
    }
    if (document.getElementById("puni").value.length < 1) {
      alertify.error('Falta el precio unitario.');
      return;
    }
    if (document.getElementById("subT").value.length < 1) {
      alertify.error('Falta el monto del subtotal.');
      return;
    }

    let detalle = {
      cod: document.getElementById("barra").value,
      des: document.getElementById("des").value,
      cantidad: document.getElementById("cantidad").value,
      precio: document.getElementById("puni").value,
      subtotal: document.getElementById("subT").value,
    };


    if(!verificarRegistro(detalle.cod, detalle.cantidad, detalle.precio)){
      detalles.push(detalle);                    
    }

    vaciarArt();

    listarDetalles();

  }

  
  function verificarRegistro(id, cantidad, precio) {
    cantidad = parseFloat(cantidad);
    for (let i = 0; i < detalles.length; i++) {
        if(detalles[i].cod === id){
            detalles[i].cantidad = (parseFloat(detalles[i].cantidad) + cantidad);
            detalles[i].precio = precio;
            detalles[i].subtotal = (detalles[i].cantidad * parseInt(quitarSeparador(detalles[i].precio))).toString();            
            return true;        
        }
    }    
}

  function listarDetalles() {
    let subtotal = 0;
    let plantilla = '';
    var orden = 0;
    detalles.forEach(det => {
      orden++;
      subtotal += parseInt(quitarSeparador(det.subtotal.toString()));
      plantilla += `
      <tr>
        <td>${orden}</td>
        <td>${det.cod}</td>
        <td>${det.des}</td>
        <td>${det.cantidad}</td>
        <td>${separador_Mil(det.precio.toString())}</td>
        <td>${separador_Mil(det.subtotal.toString())}</td>
        <td><button type="button" class="btn btn-danger" id="btndet"><i class="bi bi-trash3-fill"></i></td>
      </tr>
    `;
    });


    // if (detalles.length < 5) {
    //   for (let i = detalles.length; i < 5; i++) {
    //     orden++;
    //     plantilla += `
    //     <tr>
    //     </tr>
    //   `;
    //   }
    // }

    // cabecera.total = subtotal;
    if (subtotal == 0) {
      document.getElementById("pagar").value = '';
    } else {
      document.getElementById("pagar").value = separador_Mil(subtotal.toString());
    }
    $('#detalle').html(plantilla);
  }


  $(document).on("click", "#btndet", function () {
    fila = $(this).closest("tr");
    id = parseInt(fila.find('td:eq(1)').text()); //capturo el ID
    nombre = fila.find('td:eq(2)').text();
    if (id != '') {
      alertify.confirm('Eliminar Registrar', ' ¿Está seguro de eliminar el registro?',
        function () {
          borrarRegistro(id);
        },
        function () {
        }).set({ labels: { ok: 'Sí, eliminar!', cancel: 'Cancelar' }, padding: false });
    }
  });


  function borrarRegistro(id) {
    // detalles.splice(fila, 1);
    let i = 0;
    pos = -1;
    while (i < detalles.length) {
      if (detalles[i].codarticulo == id) {
        pos = i; break;
      }
      i++;
    }
    detalles.splice(pos, 1);
    listarDetalles();
  }


  //Eliminar        
  $(document).on("click", "#icono-cerrar",  function(){	
    if(proveedorCargado() == true || detalles.length > 0){
        alertify.confirm('Cerrar ventana', ' ¿Está seguro de cerrar la ventana?', 
        function(){ 
            window.location.href = "./menu.html";
        }, 
        function(){ 
            
        }).set({labels:{ok:'Sí, cerrar!', cancel: 'Cancelar'}, padding: false});  
    } else{
        window.location.href = "./menu.html";
    }
});
  
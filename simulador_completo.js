
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

//document.getElementById("parametros").classList.add("activa");
//document.getElementById("clientes").classList.add("activa");
//document.getElementById("parametros").classList.remove("activa");

function ocultarSecciones(){
  let componente= document.getElementById("parametros");
  let listaClass = componente.classList;
  listaClass.remove("activa");  // oculta

  // se puede poner:
  //function ocultarSecciones(){
  //document.getElementById("parametros").classList.remove("activa");
  //document.getElementById("clientes").classList.remove("activa");
//}
 
  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;
  listaClass2.remove("activa");

  let componente3 = document.getElementById("credito");
  let listaClass3 = componente3.classList;
  listaClass3.remove("activa");


  let componente5 = document.getElementById("listaCreditos");
  let listaClass5 = componente5.classList;
  listaClass5.remove("activa");


}

function mostrarSeccion(id) { // funcion q activa parte visual
    ocultarSecciones();
    let componente= document.getElementById(id);
    let listaClass = componente.classList;
    listaClass.add("activa");  //activa
}



function guardarTasa(){
  let tasa = recuperarFloat("tasaInteres");
  if(tasa>=10 && tasa<=20){
    tasaInteres=tasa;
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+tasa+" %"); //mostrar texto: util.
  }else{
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10 y 20 %");  //funcion utilitarios
  }
}


function guardarCliente(){

  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");
  let email= recuperaraTexto("txtEmail");


  let cliente = buscarCliente(cedula);

  // CREAR NUEVO CLIENTE
  if(clienteSeleccionado == null){

      if(cliente != null){

          alert("El cliente ya existe");

          return;

      }

      let nuevoCliente = {};

      nuevoCliente.cedula = cedula;
      nuevoCliente.nombre = nombre;
      nuevoCliente.apellido = apellido;
      nuevoCliente.ingresos = ingresos;
      nuevoCliente.egresos = egresos;
      nuevoCliente.email = email;



      clientes.push(nuevoCliente);

  }else{

      // ACTUALIZAR CLIENTE
      clienteSeleccionado.nombre = nombre;
      clienteSeleccionado.apellido = apellido;
      clienteSeleccionado.ingresos = ingresos;
      clienteSeleccionado.egresos = egresos;
      clienteSeleccionado.email = email;


      clienteSeleccionado = null;

  }

  pintarClientes();

  limpiar();

}

function pintarClientes(){
    let contenidoTabla = "";
    let tabla = document.getElementById("tablaClientes");

    for(let i = 0; i < clientes.length; i++){
        let cliente = clientes[i];
        contenidoTabla +=
        "<tr>" +
            "<td>" + cliente.cedula + "</td>" +
            "<td>" + cliente.nombre + "</td>" +
            "<td>" + cliente.apellido + "</td>" +
            "<td>" + cliente.ingresos + "</td>" +
            "<td>" + cliente.egresos + "</td>" +
            "<td>" + cliente.email + "</td>" +
            "<td> <button onclick='seleccionarCliente(" + cliente.cedula + ")'>Actualizar</button>" +
            "<button onclick='eliminarCliente(" + cliente.cedula + ")'>Eliminar</button></td>" +
        "</tr>";

    }

    
    tabla.innerHTML = contenidoTabla;
}

function buscarCliente(cedula){
    for(let i = 0; i < clientes.length; i++){
        let cliente = clientes[i];
        if(cliente.cedula == cedula){
            return cliente;
        }
    }
    return null;
}


function seleccionarCliente(cedula){
    let cliente = buscarCliente(cedula);

    

    if(cliente !=null){
    clienteSeleccionado= cliente;
    mostrarTextoEnCaja("txtCedula", cliente.cedula);
    mostrarTextoEnCaja("txtNombre", cliente.nombre);
    mostrarTextoEnCaja("txtApellido", cliente.apellido);
    mostrarTextoEnCaja("txtIngresos", cliente.ingresos);
    mostrarTextoEnCaja("txtEgresos", cliente.egresos);
    mostrarTextoEnCaja("txtEmail", cliente.email);
    }

}

function buscarClienteCredito(){

    let cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);
    if(cliente == null){
        document.getElementById("datosClienteCredito").innerHTML =
        "Cliente no encontrado";

    }else{
        let datos =
              "<h3>Datos del Cliente</h3>" +
              "<p><strong>Cedula:</strong> " + cliente.cedula + "</p>" +
              "<p><strong>Nombre:</strong> " + cliente.nombre + "</p>" +
              "<p><strong>Apellido:</strong> " + cliente.apellido + "</p>" +
              "<p><strong>Ingresos:</strong> " + cliente.ingresos + "</p>" +
              "<p><strong>Egresos:</strong> " + cliente.egresos + "</p>" +
              "<p><strong>Email:</strong> " + cliente.email + "</p>";

        document.getElementById("datosClienteCredito").innerHTML = datos;
    }
}


function limpiar (){
  document.getElementById("txtCedula").value= "";
  document.getElementById("txtNombre").value= "";
  document.getElementById("txtApellido").value= "";
  document.getElementById("txtIngresos").value= "";
  document.getElementById("txtEgresos").value= "";
  document.getElementById("txtEmail").value= "";
}

function eliminarCliente(cedula){
    for(let i = 0; i < clientes.length; i++){
        let cliente = clientes[i];
        if(cliente.cedula == cedula){
            clientes.splice(i, 1);
            break;
        }
    }
    pintarClientes();
}

function calcularCredito(){

    let cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);
    clienteSeleccionado= cliente;

    if(cliente == null){
        document.getElementById("resultadoCredito").innerHTML =
        "Cliente no encontrado";
        return;
    }

    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarFloat("plazoCredito");
    let disponible = calcularDisponible(cliente.ingresos, cliente.egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    let interes = calcularInteresSimple(monto, tasaInteres, plazo);
    let totalPagar = calcularTotalPagar(monto, interes);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);
    cuotaCalculada= cuotaMensual;
    montoCalculado=monto;
    plazoCalculado= plazo;


    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);
    let resultadoCredito =document.getElementById("resultadoCredito");
    let boton = document.getElementById("btnAsignarCredito");

    let resultado = "";

    if(aprobado == true){
        resultado = "APROBADO";
        resultadoCredito.className = "aprobado";
        boton.disabled = false;
    }else{
        resultado = "RECHAZADO";
        resultadoCredito.className = "rechazado";
        boton.disabled = true;
    }

    resultadoCredito.innerHTML =
        "Capacidad de pago: " + capacidadPago + "<br>" +
        "Total a pagar: " + totalPagar + "<br>" +
        "Cuota mensual: " + cuotaMensual + "<br>" +
        "RESULTADO: " + resultado;
}

function solicitarCredito(){
    alert("Su crédito ha sido aprobado");
}

function asignarCredito(){

    let credito = {
        cedula: clienteSeleccionado.cedula,
        nombre: clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoCalculado,
        cuota: cuotaCalculada
    };

    creditos.push(credito);

    alert("Crédito asignado correctamente");

    console.log(creditos);

    document.getElementById("btnAsignarCredito").disabled = true 
}



function buscarCreditos(cedula){
    let listaCreditos = [];
    for(let i = 0; i < creditos.length; i++){
        let elementoCredito = creditos[i];

        if(elementoCredito.cedula == cedula){
            listaCreditos.push(elementoCredito);
        }
    }

    return listaCreditos;
}


function pintarCreditos(creditos){
    let tabla = document.getElementById("tablaCreditos");
    let contenido = "";

    for(let i = 0; i < creditos.length; i++){

        let elementoCredito = creditos[i];

        contenido += 
        "<tr>" +
            "<td>" + elementoCredito.cedula + "</td>" +
            "<td>" + elementoCredito.nombre + "</td>" +
            "<td>" + elementoCredito.apellido + "</td>" +
            "<td>" + elementoCredito.monto + "</td>" +
            "<td>" + elementoCredito.tasa + "%</td>" +
            "<td>" + elementoCredito.plazo + "</td>" +
            "<td>" + elementoCredito.cuota + "</td>" +
        "</tr>";
    }

    tabla.innerHTML = contenido;
}



function buscarCreditosCliente(){
    let cedula = recuperaraTexto("buscarCedulaListado");
    let creditosEncontrados = buscarCreditos(cedula);

    pintarCreditos(creditosEncontrados);
}
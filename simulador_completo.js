
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


}

function mostrarSeccion(id) { // funcion q activa parte visual
    ocultarSecciones();
    let componente= document.getElementById(id);
    let listaClass = componente.classList;
    listaClass.add("activa");  //activa
}

mostrarSeccion("parametros");
mostrarSeccion("clientes");

function guardarTasa(){
  let tasa = recuperarFloat("tasaInteres");
  if(tasa>=10 && tasa<=20){
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

      clientes.push(nuevoCliente);

  }else{

      // ACTUALIZAR CLIENTE
      clienteSeleccionado.nombre = nombre;
      clienteSeleccionado.apellido = apellido;
      clienteSeleccionado.ingresos = ingresos;
      clienteSeleccionado.egresos = egresos;

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
            "<td> <button onclick='seleccionarCliente(" + cliente.cedula + ")'>Actualizar</button>" + "<button>"+'Eliminar'+"</button></td>" +
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
    }

}

function limpiar (){
  document.getElementById("txtCedula").value= "";
  document.getElementById("txtNombre").value= "";
  document.getElementById("txtApellido").value= "";
  document.getElementById("txtIngresos").value= "";
  document.getElementById("txtEgresos").value= "";
}
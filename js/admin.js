import {campoRequerido, validarNumero, validarURL, validacionGeneral} from "./validaciones.js"
import {Producto} from "./productoClass.js"

// traigo los elementos que se necesitan del html

let campoCodigo = document.getElementById("codigo");
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoUrl = document.getElementById("URL");
let formularioProducto = document.querySelector('#formProducto');

let productoExistente = false; // variable bandera
let listaProductos = [];



// asociar un evento a cada elemento

campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});

campoProducto.addEventListener("blur", () => {
  campoRequerido(campoProducto);
});

campoDescripcion.addEventListener("blur", () => {
  campoRequerido(campoDescripcion);
});

campoCantidad.addEventListener("blur", () => {
  console.log("desde cantidad");
  validarNumero(campoCantidad);
});

campoUrl.addEventListener("blur", () => {
  console.log("desde url");
  validarURL(campoUrl);
});

formularioProducto.addEventListener("submit", guardarProducto);

// emieza la logica CRUD

function guardarProducto(e) {
  //prevenir el actualizar del submit
  e.preventDefault();
  //verificar que todos los datos sean validos
  if (
    validacionGeneral(
      campoCodigo,
      campoProducto,
      campoDescripcion,
      campoCantidad,
      campoUrl
    )
  ) {
     console.log("los datos fueron enviados correctamente");
    if (productoExistente === false) {
      //crear producto
     crearProducto();
    } else {
      //modificar producto
     modificarProducto();
    }
  }
}

function crearProducto(){
  // crear objeto producto 
  let productoNuevo = new Producto(
    campoCodigo.value, 
    campoProducto.value, 
    campoDescripcion.value, 
    campoCantidad.value, 
    campoUrl.value
    );
    console.log(productoNuevo);
    listaProductos.push(productoNuevo);
    console.log(listaProductos);
    // limpiar formulario
    limpiarFormulario();
}

function limpiarFormulario() {
  //limpiamos los value del formulario
  formularioProducto.reset();
  //resetear las clases de los input
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCantidad.className = "form-control";
  campoUrl.className = "form-control";

  //resetear la variable bandera o booleana para el caso de modificarProducto
  productoExistente = false;
}
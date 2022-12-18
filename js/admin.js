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

// si hay productos en local storage, quiero que se guarden en el array los productos
let listaProductos = JSON.parse(localStorage.getItem("arrayProductoKey")) || [];



// asociar un evento a cada elemento

/*campoCodigo.addEventListener("blur", () => {
  campoRequerido(campoCodigo);
});*/

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

// cargo los productos del localstorage en la lista

 cargaInicial();

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
  // generar una funcion crearCodigUnico() que retorne codigo unico
  let codigoUnico = Math.floor(Math.random()*100);
  // crear objeto producto 
  let productoNuevo = new Producto(
    codigoUnico, 
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
    // guardar el array en local storage
    guardarLocalSorage();
    // mostrar un cartel al usuario
    Swal.fire(
      'Producto creado!!',
      'su producto se cargo correctamente!',
      'success'
    )
    //cargar los productos
    crearFila(productoNuevo);
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

function guardarLocalSorage() {
  localStorage.setItem("arrayProductoKey", JSON.stringify(listaProductos));
}

function crearFila(producto){
  let tablaProducto = document.querySelector('#tablaProducto');
  tablaProducto.innerHTML += `<tr>
  <th>${producto.codigo}</th>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad}</td>
  <td>${producto.url}</td>
  <td>
    <button class="btn btn-warning" onclick="prepararEdicionProducto('${producto.codigo}')">Editar</button>
    <button class="btn btn-danger" onclick="borrarProducto('${producto.codigo}')>Borrar</button>
  </td>
</tr>`

}

function cargaInicial(){
  if (listaProductos.length > 0) {
    //crear fila
    listaProductos.forEach(itemProducto => { crearFila(itemProducto);});
  } 
}

window.prepararEdicionProducto = function (codigo) {
  console.log("desde editar");
  console.log(codigo);
  //buscar el producto en el array
  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo === parseInt(codigo);
  });
  console.log(productoBuscado);
  //mostrar el producto en el formulario de Producto
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoUrl.value = productoBuscado.url;

  //cambiar la variable bandera productoExistente
  productoExistente = true;
};

/*function modificarProducto(){
  console.log('desde modificar');
  // encontrar posicion del producto
  let indiceProducto = listaProductos.findIndex((itemProducto)=> {
    return itemProducto.codigo === parseInt(campoCodigo.value);
  });
  console.log(indiceProducto);
}
*/
function modificarProducto() {
  console.log("desde modificar producto");
  Swal.fire({
    title: "¿Seguro qué desea modificar este producto?",
    text: "Esta acción no podra ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      //encontrar la posicion del elemento que quiero modificar dentro del array de productos
      let indiceProducto = listaProductos.findIndex((itemProducto) => {
        return itemProducto.codigo === parseInt(campoCodigo.value);
      });

      console.log(indiceProducto);
      //modificar los valores dentro del elemento del array de productos
      listaProductos[indiceProducto].producto = campoProducto.value;
      listaProductos[indiceProducto].descripcion = campoDescripcion.value;
      listaProductos[indiceProducto].cantidad = campoCantidad.value;
      listaProductos[indiceProducto].url = campoUrl.value;

      //actualizar el localStorage
      guardarLocalSorage();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();
      //mostrar cartel al usuario
      Swal.fire(
        "Producto modificado!",
        "Su producto fue modificado correctamente",
        "success"
      );
      //limpiar el formulario
      limpiarFormulario();
    }
  });
}

function borrarTabla() {
  let tablaProducto = document.querySelector("#tablaProducto");
  tablaProducto.innerHTML = "";
}

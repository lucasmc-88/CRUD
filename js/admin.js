// traigo los elementos que se necesitan del html

let campoCodigo = document.getElementById("codigo");
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoUrl = document.getElementById("url");
let formularioProducto = document.querySelector('#formProducto');

// Validaciones

const campoRequerido = (input) => {
  console.log("desde campo requerido");
  if (input.value.trim().length > 0) {
    console.log("no es vacia");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("esta vacia");
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarNumero = (input) => {
  // creamos una expresion regular para validar numeros
  let patron = /^[0-9]{1,5}$/;
  // el metodo test --> devuelve true o false si coincide o no
  // regex.test(streeng a validar) devuelve true o false
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return false;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};
const validarUrl = (input) => {
  let patron = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  if (patron.test(input.value)) {
    input.className = "form-control is-valid";
    return false;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

const validacionGeneral = (campoCodigo,
  campoProducto,
  campoDescripcion,
  campoCantidad,
  campoUrl) => {
  // prevenir el actualizar del submit

  //comprobar que pasen cada validacion
  let alerta = document.querySelector('#mjeAlerta')
  if (campoRequerido(campoCodigo) &&
       campoRequerido(campoProducto) && 
       campoRequerido(campoDescripcion) && 
       validarNumero(campoCantidad) && 
       validarUrl(campoUrl)) 
       {
        console.log('validacion correcta');
        alerta.className = "alert alert-danger mt-4 d-none";
        return true;

  } else {

    console.log('validacion incorrecta');
    alerta.className = "alert alert-danger mt-4";
    return false;
  }

};

const guardarProducto = (e) => {
  // prevenir el actualizar del submit
  e.preventDefault();

  if (validacionGeneral(campoCodigo,
    campoProducto,
    campoDescripcion,
    campoCantidad,
    campoUrl)) {
    console.log('los datos fueron enviados correctamente');
  }
}
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
  validarUrl(campoUrl);
});

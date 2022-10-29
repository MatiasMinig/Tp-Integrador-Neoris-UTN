/* var nombre = document.getElementById('nombre');
var email = document.getElementById('email');
var asunto = document.getElementById('asunto');
var mensaje = document.getElementById('mensaje');
var error = document.getElementById('error');

var form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e){
      e.preventDefault();

      var mensajesError = [];

      if(email.value === null || email.value === ''){
        mensajesError.push('Email no puede estar vacío')
        return false;
      } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re(email)) {
          mensajesError.push('Email le falta su @')
          return false;
        }
      }  
      if(asunto.value === null || asunto.value === ''){
        mensajesError.push('Asunto no puede estar vacío')
        return false; 
      }
      if(mensaje.value === null || mensaje.value === ''){
        mensajesError.push('Mensaje no puede estar vacío') 
        return;
      }
      
      error.innerHTML = mensajesError.join(', ');
      
      return true;
    });  */

const contenido = document.querySelector("#alerta-Contacto");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", enviarForm);
});

// Funcion cuando envias el formulario
function enviarForm(e) {
  e.preventDefault();

  // validar campos
  const nombre = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;
  const asunto = document.querySelector("#asunto").value;
  const mensaje = document.querySelector("#mensaje").value;

  // Validar si Todos o algun campo se encuentra incompleto
  if (nombre === "") {
    mostrarError("Nombre no puede estar vacío");
    return;
  }
  if (asunto === "") {
    mostrarError("Asunto no puede estar vacío");
    return;
  }
  if (mensaje === "") {
    mostrarError("Mensaje no puede estar vacío");
    return;
  }
  if (email === "") {
    mostrarError("Email no puede estar vacío");
    return;
  } else {
    const res =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!res(email)) {
      mostrarError("Email le falta su @");
    }
  }
  /* if (nombre === "" || email === "" || asunto === "" || mensaje === "") {
    mostrarError("Todos los campos son obligatorios");
    return;
  } */
}

// Funcion para mostrar si hay un error
function mostrarError(mensaje) {
  const alerta = document.querySelector(".alert");

  if (!alerta) {
    // Crear la alerta
    const alerta = document.createElement("div");
    alerta.className += "alert alert-danger mt-3";
    alerta.innerHTML = `
          <strong class="block">${mensaje}</strong>
        `;

    contenido.appendChild(alerta);
    console.log(contenido);

    // Se elimina la alerta despues de 5 segundos
    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

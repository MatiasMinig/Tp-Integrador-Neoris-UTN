const contenido = document.querySelector("#alerta-Contacto");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", handleSubmit);
});

// Funcion cuando envias el formulario
function handleSubmit(e) {
  e.preventDefault(); 

  // validar campos
  const nombre = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;
  const asunto = document.querySelector("#asunto").value;
  const mensaje = document.querySelector("#mensaje").value;

  // Validar si Todos o algun campo se encuentra incompleto
  if (nombre === "" && email === "" && asunto === "" && mensaje === "") {
    mostrarError("Todos los campos son obligatorios");
    return;
  } 
  if (nombre === "") {
    mostrarError("Nombre no puede estar vacío");
    return;
  }
  if (email === "") {
    mostrarError("Email no puede estar vacío");
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
    

    // Se elimina la alerta despues de 5 segundos
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}



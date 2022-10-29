const container = document.querySelector("#alerta-clima");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  console.log(ciudad);
  console.log(pais);

  if (ciudad === "" || pais === "") {
    // hubo un error campos vacios
    mostrarError("Ambos campos son obligatorios");

    return;
  }

  // Consultar la API
  consultarApi(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".alert");

  if (!alerta) {
    // Crear alerta
    const alerta = document.createElement("div");

    alerta.className += "alert alert-danger mt-3";

    alerta.innerHTML = `
      <strong class="font-bold">ERROR!</strong>
      <strong class="block">${mensaje}</strong>
  `;

    container.appendChild(alerta);

    // Se elimina la alerta despues de 5 segundos
    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarApi(ciudad, pais) {
  const appId = "d08b6c9ee07f12efc252d43af0248373";

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  // Muestra el spinner de carga
  Spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML(); // Limpiar el HTML

      if (datos.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }

      // Imprimir la respuesta en el HTML
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = kelvinACentigrados(temp);
  const max = kelvinACentigrados(temp_max);
  const min = kelvinACentigrados(temp_min);

  // Crear elemento para el nombre de la ciudad
  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add("font-weight-bold", "h2");

  // Crear elemento para temperatura
  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-weight-bold", "display-4");

  // Crear elemento para temperatura Maxima
  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("font-weight-bold", "h1");

  // Crear elemento para temperatura Minima
  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("font-weight-bold", "h1");

  // Crear el contenedor para la respuesta
  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-black");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {

  limpiarHTML();

  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
}

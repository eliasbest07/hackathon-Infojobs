const listaResultados = document.getElementById('resultados');
const botonAgendar = document.getElementById('agendar');
const fecha = document.getElementById('fecha').value;
const hora = document.getElementById('hora').value;
const totalPageLabel = document.getElementById('total-page');
const actualPageLabel = document.getElementById('page-actual');
const botonSiguientePage = document.getElementById('siguiente-page');
const botonAnteriorPage = document.getElementById('anterior-page');
const checkboxHibrido = document.getElementById('hib');
const checkboxPresencial = document.getElementById('pre');
const checkboxSinEspecificar = document.getElementById('sin');
const checkboxSoloTeletrabajo = document.getElementById('ste');
const apiUrl = 'https://api.infojobs.net/api/9/offer';
const apiKey = 'Basic ODUwZDc0MzBlZDBiNGJjOWFiZmQ0NWY5NDU0NjdmYzM6RFAxQkZzYmwreW5WdGlwbE1pVGxuM3pqWHpqS1RNL0hqZnFrWmpnRzF6LzJyRzJlL0Q=';

var modalidad = "";
var resultados = [];

let tarjetaSeleccionada = null;
totalPageLabel.textContent = 1;

//trae informacion guardad en el sotorage desde el background.js
chrome.runtime.sendMessage({ obtenerDatos: true }, function(response) {
  if(response && response.results.length > 0){
    const data = response.results;
    mostrar(data);
  }
});
// carga la informacion obtenida de la api para mostrar las tarjetas
function mostrar(data){
  listaResultados.innerHTML = '';
  data.forEach((resultado) => {
    const tarjeta = document.createElement('li');
    tarjeta.innerHTML = `
    <div class="card">
       <h3 class="card-title">${resultado.title}</h3>
       <button class="card-button">Abrir enlace</button>
    </div>
    `; 

    const cardButton = tarjeta.querySelector('.card-button');
    cardButton.addEventListener('click', function() {
    const link = resultado.link;
      navigator.serviceWorker.controller.postMessage({
        type: 'openLink',
        data: link
      });
    });
    listaResultados.appendChild(tarjeta);
  });
}
// cuando obtiene los datos, muestra las tarjetas en la lista de resultados
function getData(url){
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => response.json())
    .then(resp => {
      // Aquí puedes trabajar con los datos recibidos desde la API
      totalPageLabel.textContent = resp.totalPages;
      resultados = resp.items;
      navigator.serviceWorker.controller.postMessage({
        type: 'results',
        data: resultados
  
      });
      mostrar(resultados);

      actualPageLabel.textContent = resp.currentPage;

      if(totalPageLabel.textContent === '1'){
        botonSiguientePage.disabled = true;
      }else{
        botonSiguientePage.disabled = false;
      }
      if(actualPageLabel.textContent === '1'){
        botonAnteriorPage.disabled = true;
      }else{
        botonAnteriorPage.disabled = false;
      }
      
    })
    .catch(error => {
      // Manejo de errores
      console.error('Error:', error);
      navigator.serviceWorker.controller.postMessage({
        type: 'error',
        data: error
      });
    });
}

function loading(){
  if(document.getElementById("imagen-loading")===null){
    const listaTarjetas = document.getElementById('resultados');
    listaTarjetas.innerHTML = ' <img id="imagen-loading" src="loading.gif" alt="Imagen de espera"> ';
  }
    document.getElementById("imagen-loading").style.display = "block";
}
// la funcion que toma el input de busqueda, hace la peticion, en funcion de getData
// cuando obtiene los datos, los muestra en la lista de resultados
function buscar() {
  const inputBusqueda = document.getElementById('busqueda').value;
  loading();

  actualPageLabel.textContent = "1";
  botonAnteriorPage.disabled = true;

  if(checkboxHibrido.checked){
    modalidad = modalidad+"&teleworking=teletrabajo-posible";
  }
  if(checkboxPresencial.checked){
    modalidad = modalidad+"&teleworking=trabajo-solo-presencial";
  }
  if(checkboxSinEspecificar.checked){
    modalidad = modalidad+"&teleworking=no-se-sabe-no-esta-decidido"
  }
  if(checkboxSoloTeletrabajo.checked){
    modalidad = modalidad+"&teleworking=solo-teletrabajo";
  }

  const queryParams = {
    q: inputBusqueda,
  };
  const queryString = Object.keys(queryParams)
  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
  .join('&');

  const url = apiUrl + '?' + queryString + modalidad;
  getData(url);
}
//boton para ir a la siguiente pagina 
botonSiguientePage.addEventListener('click', function() {
  const inputBusqueda = document.getElementById('busqueda').value;
  if(parseInt(actualPageLabel.textContent) === parseInt(totalPageLabel.textContent) ){
    botonSiguientePage.disabled = true;
    return
  }
  loading();

  const queryParams = {
    q: inputBusqueda,
    page: parseInt(actualPageLabel.textContent) + 1,
  };
  const queryString = Object.keys(queryParams)
  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
  .join('&');

  const url = apiUrl + '?' + queryString + modalidad;

  getData(url);

});
//boton para ir a la pagina anterior
botonAnteriorPage.addEventListener('click', function() {
  const inputBusqueda = document.getElementById('busqueda').value;
  if(parseInt(actualPageLabel.textContent) === 1 ){
    botonAnteriorPage.disabled = true;
    return
  }
  loading();
  const queryParams = {
    q: inputBusqueda,
    page: parseInt(actualPageLabel.textContent) - 1,
  };
  const queryString = Object.keys(queryParams)
  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
  .join('&');

  const url = apiUrl + '?' + queryString + modalidad;
  getData(url);
});

//control del numero de paginas 
if(totalPageLabel.textContent === "1"){
  botonSiguientePage.disabled = true;
}else{
  botonSiguientePage.disabled = false;
}

if(actualPageLabel.textContent === '1'){
  botonAnteriorPage.disabled = true;
}else{
  botonAnteriorPage.disabled = false;
}

// para seleccionar una tarjeta a la cual se le va a agendar la cita
listaResultados.addEventListener('click', function(event) {
  const tarjeta = event.target.closest('.card');
  if (tarjeta) {
    if (tarjeta === tarjetaSeleccionada) {
      tarjeta.classList.remove('selected');
      tarjetaSeleccionada = null;
      botonAgendar.disabled = true;
    } else {
      if (tarjetaSeleccionada) {
        tarjetaSeleccionada.classList.remove('selected');
      }
      tarjeta.classList.add('selected');
      tarjetaSeleccionada = tarjeta;
      if(fecha){
        botonAgendar.disabled = false;
      }
    }
  }
});

// el boton de buscar
document.getElementById("btnbuscar").addEventListener("click", buscar);
document.getElementById('formulariobusqueda').addEventListener('submit', function(event) {
  event.preventDefault(); 
  buscar();
});
// para cambian de avilitado a desabilido el boton de agendar
const fechaInput = document.getElementById('fecha');
fechaInput.addEventListener('change', function(event) {
  const fechaSeleccionada = event.target.value;
  if(fechaSeleccionada && tarjetaSeleccionada){
    botonAgendar.disabled = false;
  }

});

// Mostrar la notificacion de la entrevista
document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const notificacion = new Notification('Recordatorio de entrevista', {
    body: 'Tu entrevista está programada para comenzar en 15 minutos.'
  });
});


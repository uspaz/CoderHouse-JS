// Variables, Arrays y acceso al DOM 
const listaPokemons = [];
const spinner = document.querySelector(".spinner");
const containerPokemons = document.getElementById("pokemons");
const pages = document.querySelector(".pages");
let usuario = document.getElementById("usuario");
let offset = 1;
let limit = 12;

/* Hago llamado a la API y guardo sus datos dependiendo de un id para que vengan de a uno, guardarlos en una variable para luego pushear esos datos al array y luego utilizar otra función para mostrarlos con su estructura */

async function getPokemons() {
  for (let i = offset; i <= limit; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    const pokemons = await res.json();
    listaPokemons.push(pokemons);    
  }
  hideSpinner();
  showPokemons(listaPokemons);
}

/* Hago que evalue si hay algun pokemon en el array (en caso de que haya los saco), y luego utilizo una condición para saber si dentro de los limites de los pokemons que hay, para luego llamar a otra función para poder mostrarlos  */

function pagPokemons() {
  listaPokemons.splice(0, listaPokemons.length);
  showSpinner();

  setTimeout(()=>{
    if( (offset >= 1) || (limit <= 898)){
      getPokemons();
    }
  }, 1000);
}

/* Botón para avanzar a los siguientes 12 pokemons */
document.getElementById("siguiente").addEventListener("click", ()=>{
  offset += 12;
  limit += 12;
  pagPokemons();
});

/* Botón para retroceder a los anteriores 12 pokemons */
document.getElementById("anterior").addEventListener("click", ()=>{
  offset -= 12;
  limit -= 12;
  pagPokemons();
});

/* Botón para avanzar hasta los ultimos 12 pokemons */
document.getElementById("final").addEventListener("click", ()=>{
  offset = 887;
  limit = 898;
  pagPokemons();
});

/* Botón para retroceder a los primeros 12 pokemons */
document.getElementById("principal").addEventListener("click", ()=>{
  offset = 1;
  limit = 12;
  pagPokemons();
});

/* Creo la estrutura para los pokemons que tengo según la cantidad de elementos que utilice */
function showPokemons(lista){
  let container = "";
  lista.forEach( (pokemon) => {

    let {id, name , types} = pokemon;  
    if(types.length <= 1){
      container += 
      `<div class="card">
          <figure class="card--image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
          </figure>
          <div class="card--data">
            <p>#${id.toString().padStart(3, '0')}</p>
            <h2>${name}</h2>
          </div>
          <div class="card--type">
            <span class="${(types[0].type.name)}">${types[0].type.name}</span>
          </div>
        </div>`
    }else{
      container += 
      `<div class="card">
          <figure class="card--image">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
          </figure>
          <div class="card--data">
          <p>#${id.toString().padStart(3, '0')}</p>
            <h2>${name}</h2>
          </div>
          <div class="card--type">
            <span class="${(types[0].type.name)}">${types[0].type.name}</span>
            <span class="${(types[1].type.name)}">${types[1].type.name}</span>
          </div>
        </div>`;
    }
    containerPokemons.innerHTML = container;
  });
}

/* En esta función agrupo los filtrados por generacion*/
function genPokemons() {
  document.getElementById("gen1").addEventListener("click", ()=>{
    offset = 1;
    limit = 151;
    pagPokemons();
  });

  document.getElementById("gen2").addEventListener("click", ()=>{
    offset = 152;
    limit = 251;
    pagPokemons();
  });

  document.getElementById("gen3").addEventListener("click", ()=>{
    offset = 252;
    limit = 386;
    pagPokemons();
  });

  document.getElementById("gen4").addEventListener("click", ()=>{
    offset = 387;
    limit = 493;
    pagPokemons();
  });

  document.getElementById("gen5").addEventListener("click", ()=>{
    offset = 494;
    limit = 649;
    pagPokemons();
  });

  document.getElementById("gen6").addEventListener("click", ()=>{
    offset = 650;
    limit = 721;
    pagPokemons();
  });

  document.getElementById("gen7").addEventListener("click", ()=>{
    offset = 722;
    limit = 809;
    pagPokemons();
  });

  document.getElementById("gen8").addEventListener("click", ()=>{
    offset = 810;
    limit = 898;
    pagPokemons();
  });
}

// Agrego y quito los filtros cuando esta en vista mobile para que el usuario los pueda visualizar
function mostrarFiltros(){
  let filtros = document.querySelector(".ul--filter");

  document.getElementById("filtrar").addEventListener("click", () =>{
    filtros.classList.contains("active") == false && filtros.classList.add("active");
  });
  
  document.getElementById("close").addEventListener("click", () =>{
    filtros.classList.remove("active");
  });
}


// Recupero el usuario guardado en el LocalStorage
function recuperarUsuario() {
  if(localStorage.length > 0){
    let local = JSON.parse(localStorage.getItem("usuario"));
    let {nombre} = local[0];
    usuario.innerHTML = `<p style="color:white">${nombre}</p>`;
  }else{
    let session = JSON.parse(sessionStorage.getItem("usuario"));
    let {nombre} = session[0];
    usuario.innerHTML = `<p style="color:white">${nombre}</p>`;
  }
}


// Al utilizar el boton salir vuelve al login y borra los datos del localStorage 
function signOut(){
  document.querySelector(".btn").addEventListener("click", ()=>{ 
    Swal.fire({
      icon: 'warning',
      title: '<h3 style="font-family: Quicksand">¿Estas seguro?</h3>',
      showCancelButton: true,
      confirmButtonText: '<span style="font-family: Quicksand">Quiero salir</span>',
      confirmButtonColor: '#d33',
      cancelButtonText: '<span style="font-family: Quicksand">Mejor me quedo</span>',
      cancelButtonColor: '#3085d6'
    }).then(res =>{
      if(res.isConfirmed){
        localStorage.clear();
        sessionStorage.clear();
        location.href = "../index.html"; 
      }
    });
    
  });
}

/* Filtro por los nombres de los pokemons, tiene mejor ultilidad cuando utilizamos los botones de generaciones porque hay una busqueda más amplia */
function busqueda(){
  let search = document.getElementById("buscar").value;
  
  let listaFiltrada = listaPokemons.filter(element =>{
    return (element.name).toLowerCase().indexOf(search.toLowerCase()) > -1
  });
  showPokemons(listaFiltrada);
}
document.getElementById("buscar").addEventListener("keyup", ()=>{
  busqueda();
})

function showSpinner() {
  spinner.classList.add("spinner");
  containerPokemons.style.display = "none";
  pages.style.display = "none";
}

function hideSpinner() {
  spinner.classList.remove("spinner");
  containerPokemons.style.display = "flex";
  pages.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", ()=>{
  pagPokemons();
  genPokemons();
  mostrarFiltros();
  recuperarUsuario();
  signOut();
});
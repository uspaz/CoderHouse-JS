// Variables, Arrays y acceso al DOM 
const listaPokemons = [];
let usuario = document.getElementById("usuario");
let offset = 1;
let limit = 9;

async function getPokemons(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemons = await res.json();
  listaPokemons.push(pokemons);
}

function pagPokemons() {
  if(listaPokemons != []){
    listaPokemons.splice(0, listaPokemons.length);
  }
  if( offset >= 1){
    for (let i = offset; i <= limit; i++) {
      getPokemons(i);
    }
  }
  showPokemons(listaPokemons);
}
document.getElementById("siguiente").addEventListener("click", ()=>{
  offset += 9;
  limit += 9;
  pagPokemons();
});
document.getElementById("anterior").addEventListener("click", ()=>{
  offset -= 9;
  limit -= 9;
  pagPokemons();
});
// Muestro los pokemons que tengo según la cantidad de elementos que utilice
function showPokemons(lista){
  let container = "";
  lista.forEach( (pokemon) => {

    let {id, name , types} = pokemon;  
    if(types[1] == ""){
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
    document.getElementById("pokemons").innerHTML = container;
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

function busqueda(){
  let search = document.getElementById("buscar").value;
  
  let listaFiltrada = listaPokemons.filter(element =>{
    return element.nombre.toLowerCase().indexOf(search.toLowerCase()) > -1
  });
  mostrarPokemons(listaFiltrada);
}
document.getElementById("buscar").addEventListener("keyup", ()=>{
  busqueda();
})


document.addEventListener("DOMContentLoaded", ()=>{
  getPokemons(3);
  // pagPokemons();
  // mostrarFiltros();
  // recuperarUsuario();
  // signOut();
});
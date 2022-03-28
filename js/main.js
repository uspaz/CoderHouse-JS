const listaPokemons = [];
let container = document.getElementById("pokemons");


class Pokemon {
  constructor(id, nombre, tipo1, tipo2, url) {
    this.id = id;
    this.nombre = nombre;
    this.tipoPrincipal = tipo1;
    this.tipoSecundario = tipo2;
    this.image = url;
  }
}

listaPokemons.push(new Pokemon("#001", "Squirtle", "Agua","", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"));
listaPokemons.push(new Pokemon("#002", "Bulbasaur", "Planta","Veneno", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"));
listaPokemons.push(new Pokemon("#003", "Charmander", "Fuego","", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"));
listaPokemons.push(new Pokemon("#004", "Abra", "Psiquico","", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png"));
listaPokemons.push(new Pokemon("#005", "Pikachu", "Electrico","", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/pikachu-partner.png"));
listaPokemons.push(new Pokemon("#006", "Machop", "Lucha","", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png"));
listaPokemons.push(new Pokemon("#007", "Larvitar", "Roca","Tierra", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/246.png"));
listaPokemons.push(new Pokemon("#008", "Ralts", "Psiquico","Hada", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/280.png"));

function mostrarPokemons(){
  listaPokemons.forEach((pokemon) => {
    let card = document.createElement("div");
    card.classList.add("card");
    if(pokemon.tipoSecundario == ""){
      card.innerHTML = 
      `<div class="card">
        <figure class="card--image">
          <img src="${pokemon.image}" alt="">
        </figure>
        <div class="card--data">
          <p>${pokemon.id}</p>
          <h2>${pokemon.nombre}</h2>
        </div>
        <div class="card--type">
          <span class="${(pokemon.tipoPrincipal).toLowerCase()}">${pokemon.tipoPrincipal}</span>
        </div>
      </div>`
      container.appendChild(card);
    }else{
    card.innerHTML = 
      `
        <figure class="card--image">
          <img src="${pokemon.image}" alt="">
        </figure>
        <div class="card--data">
          <p>${pokemon.id}</p>
          <h2>${pokemon.nombre}</h2>
        </div>
        <div class="card--type">
          <span class="${(pokemon.tipoPrincipal).toLowerCase()}">${pokemon.tipoPrincipal}</span>
          <span class="${(pokemon.tipoSecundario).toLowerCase()}">${pokemon.tipoSecundario}</span>
        </div>`;
      container.appendChild(card);
    }
  });
}
function mostrarFiltros(){
  let filtros = document.querySelector(".ul--filter");

  document.getElementById("filtrar").addEventListener("click", () =>{
    if(filtros.classList.contains("active") == false){
      filtros.classList.add("active");
    }
  });
  document.getElementById("close").addEventListener("click", () =>{
    filtros.classList.remove("active");
  });
} 

mostrarPokemons();
mostrarFiltros();
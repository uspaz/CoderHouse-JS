function verificar(){
  let user = document.getElementById("usuario");
  let pass = document.getElementById("contraseña");

  document.getElementById("verificar").addEventListener("click", () =>{
    if(user.value.trim() == "" || pass.value.trim() == ""){
      alert("Necesitas completar todos los campos");
    }else{
      location.href = "public/pokedex.html";
    }
  });
}

verificar();
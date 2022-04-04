function verificar(){
  let user = document.getElementById("usuario");
  let pass = document.getElementById("contraseña");
  let btn = document.querySelector("#remember");
  let span = document.getElementById("datos");

  document.getElementById("verificar").addEventListener("click", () =>{
    if(user.value.trim() == "" || pass.value.trim() == ""){
      span.innerText = `Necesitas completar todos los campos`;
    }else{
      let perfil = [{nombre: user.value, contraseña: pass.value}];
      location.href = "public/pokedex.html";

      btn.checked == true ? localStorage.setItem("usuario", JSON.stringify(perfil)) : sessionStorage.setItem("usuario", JSON.stringify(perfil));
    }
  });
}

verificar();
function logIn(){
  let user = document.getElementById("usuario");
  let pass = document.getElementById("contraseña");
  let btn = document.querySelector("#remember");
  let span = document.getElementById("datos");

  if(localStorage.length > 0){
    location.href = 'public/pokedex.html';
  }
  
  document.getElementById("verificar").addEventListener("click", () =>{
    if(user.value.trim() == "" || pass.value.trim() == ""){
      Swal.fire({
        icon: 'error',
        title: '<h3 style="font-family: Work Sans;">Oops...</h3>',
        html: '<p style="font-family: Work Sans;">Necesitas completar todos los campo</p>',
        position: 'top-end',
        showConfirmButton: false,
        width: 400,
        timer: 1800
      })
    }else{
      let perfil = [{nombre: user.value, contraseña: pass.value}];
      location.href = "public/pokedex.html";

      btn.checked ? localStorage.setItem("usuario", JSON.stringify(perfil)) : sessionStorage.setItem("usuario", JSON.stringify(perfil));
    }
  });
}

logIn();
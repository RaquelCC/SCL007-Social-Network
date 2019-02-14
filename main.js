document.addEventListener("DOMContentLoaded", event => {
// Initialize Firebase
const config = {
    apiKey: "AIzaSyAzb47AU23OXlHs6sjt-uGq9ZcbwuaBVTg",
    authDomain: "red-social-profesores.firebaseapp.com",
    databaseURL: "https://red-social-profesores.firebaseio.com",
    projectId: "red-social-profesores",
    storageBucket: "",
    messagingSenderId: "847131414857"
  };
  firebase.initializeApp(config);
  loginPage();



//   function printPostsDOM(snapshot){
//     document.getElementById("content").innerHTML = ""
//     let postKeys = Object.keys(snapshot.val());
//     postKeys.reverse();
//     for(let post of postKeys) {
//         // console.log(Object.values(snapshot.val()[post].comments).length)
//         document.getElementById("content").innerHTML += `
//         <div class="post" id="caja${post}">
//                <div class="post-header">
//                    <span><img src="${snapshot.val()[post].authorPic ? snapshot.val()[post].authorPic : './img/userLogo.png'}" class="user-pic-post" alt="userPic"><p>${snapshot.val()[post].author} - Profesora de Básica</p></span>
  
//                </div>
//                <div class="post-content">
//                 <span>${snapshot.val()[post].content}</span>
//                </div>
//                <div class="options">
//                <a class="like" id=${post}><i class="material-icons">star_border</i><span>${snapshot.val()[post].likes ? Object.values(snapshot.val()[post].likes).length : "0"}</span></a>
//                <a class="comments" id="comments${post}"><i class="material-icons">comment</i><span>${snapshot.val()[post]["comments"] ? Object.values(snapshot.val()[post]["comments"]).length : "0"}</span></a>
//                <a class="teachers-font create-comment" id="create-comment-${post}">Comentar</a>
//                </div>
//                <div id="create-comments-section-${post}"></div>
//                <div class="comments-section" id="comments-section-${post}">
               
//                </div>
//         </div>

        
//         `

//         document.getElementById("comments-section-"+post).style.display = "none"

//         if (snapshot.val()[post].likes !== undefined && Object.keys(snapshot.val()[post].likes).indexOf(firebase.auth().currentUser.uid) !== -1) {
//             document.getElementById(post).innerHTML = `
//             <i class="material-icons">star</i><span>${snapshot.val()[post].likes ? Object.values(snapshot.val()[post].likes).length : "0"}</span>
//             `
//         }
//         // console.log("creando funciones")
//         let likeButtons = document.getElementsByClassName("like");
//         for (let i = 0; i < likeButtons.length; i++) {
//             likeButtons[i].addEventListener("click", setLikePost)
//         }
//         let commentsButtons = document.getElementsByClassName("comments");
//         for (let i = 0; i < commentsButtons.length; i++) {
//             commentsButtons[i].addEventListener("click", showComments)
//         }
//         let createCommentsButtons = document.getElementsByClassName("create-comment");
//         for (let i = 0; i < createCommentsButtons.length; i ++) {
//           createCommentsButtons[i].addEventListener("click", createComment)
//         }

//         // document.getElementById(post).addEventListener("click", setLikePost)
//         // document.getElementById("comments"+post).addEventListener("click", showComments)
        
//       }
    
// }

  // FUNCION QUE CREA PAGINA INICIAL
  function loginPage() {
    
    document.getElementById("root").innerHTML = `
    <div id="logo-login"><img src="./img/teachersLogo.png"></div>
    <div id="logins">
    <p class="teachers-font">Si ya tienes cuenta con nosotros, inicia sesión!</p>
    <input type="text"  id="login-mail" class="login-input" placeholder="Correo electrónico..">
    <input type="password" id="login-pwd" class="login-input" placeholder="Contraseña..">
    <button id="login-btn" class="login-btn">Iniciar Sesión</button>
    <p class="teachers-font">¿No tienes cuenta? Registrate <a id="new-account">AQUÍ</a></p>
    <p class="teachers-font">------------------  O  ------------------</p>
    <span id="google-login" class="login"><img src="img/googleLogo.png" class="icon" alt="googleLogo"><p>Iniciar Sesión con Google</p></span>
    <span id="facebook-login" class="login facebook"><img src="img/facebookLogo2.png" class="icon" alt="facebookLogo"><p>Iniciar Sesión con Facebook</p></span>
    </div>
    
    `
    // BOTON LOGIN CON GOOGLE
    document.getElementById("google-login").addEventListener("click", googleLogin)
  
    // BOTON LOGIN CON FACEBOOK
    document.getElementById("facebook-login").addEventListener("click", facebookLogin)
  
    // BOTON PARA LOGIN CON EMAIL Y PASSWORD
    document.getElementById("login-btn").addEventListener("click", ()=> {
      const email = document.getElementById("login-mail").value;
      const password = document.getElementById("login-pwd").value;
      emailLogin(email, password);
    })

    // BOTON QUE LLEVA A PAGINA DE CREAR CUENTA
    document.getElementById("new-account").addEventListener("click", ()=> {
      document.getElementById("root").innerHTML = `
      <div id="logo-login"><img src="./img/teachersLogo.png"></div>
      <div id="create-account">
      <p class="teachers-font">Ingresa un correo y una contraseña para tu cuenta</p>
      <input type="text"  id="login-mail" class="login-input" placeholder="Correo electrónico..">
      <input type="password" id="login-pwd" class="login-input" placeholder="Contraseña..">
      <button id="login-btn" class="login-btn">Crear Cuenta</button>
      <a class="teachers-font" id="volver">Volver</a>
      </div>
      
      
      `
      // BOTON QUE VUELVE AL LOGIN
      document.getElementById("volver").addEventListener("click", loginPage)

      // BOTON QUE CREA CUENTA
      document.getElementById("login-btn").addEventListener("click", ()=>{
        const mail = document.getElementById("login-mail"). value;
        const pwd = document.getElementById("login-pwd").value;
        createAccount(mail, pwd);
      })
    })

    
  }


  

  // LO QUE SE CREA CUANDO LOGEA EL USUARIO
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        window.socialNetwork.createNewUserStorage();
        document.getElementById("root").innerHTML = `
        
        <nav class="responsive">
        <div id="div-logo">
            <img id="logo" src="./img/teachersLogo.png" alt="logo">
        </div>
        <div id="search-nav"><input id="search" type="text" placeholder="Buscar.."><a><i class="fas fa-search fa-lg"></i></a></div>
       </nav>
  
       <div id="content">
           
  
       </div>
       <div id="user-profile-side-nav">
           <div id="user-pic"><img src="${firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : './img/userLogo.png'}" class="user-pic" alt="userPic"></div>
           <div id="user-name">${firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : firebase.auth().currentUser.email}</div>
           <div class="side-option"><a>Perfil de Usuario</a></div>
           <div class="side-option"><a>Amigos</a></div>
           <div class="side-option"><a id="logout">Cerrar Sesión</a></div>
  
       </div>
       <footer class="responsive">
          <a id="user-profile"><img src="./img/userLogo.png" alt="userlogo" class="icon-large"></a>
          <a id="new-post"><i class="fas fa-edit fa-3x"></i></a>
          <a><i id="btnUp"class="arrow material-icons">arrow_upward</i></a>
        </footer>
        `

    document.getElementById("btnUp").addEventListener("click", scrollWin);

    function scrollWin() {
      document.getElementById("content").scrollTo(0, 0);
    }
        
      window.socialNetwork.printPosts(window.socialNetwork.printPostsDOM);

  
  // BOTON QUE CREA PAGINA PARA POSTEAR
  document.getElementById("new-post").addEventListener("click", ()=> {
    document.getElementById("content").innerHTML = `
    <div><input class="post-input" type="text" id="post-tags" placeholder="#tags #etiquetas #máximo3"></div>
    <div class="select-div" ><select class="post-input" id="privacy-setting">
    <option value="" disabled selected>Seleccione la privacidad de su post</option>
    <option value="public">Post Público</option>
    <option value="private">Post Privado(solo amigos)</option>
    </select></div>
    <div class="input-div"><textarea class="post-input" type="text" id="post-text"></textarea></div>
    <div class="post-and-cancel">
    <button type="button" id="cancel">Cancelar</button>
    <button type="button" id="post-it">Crear publicación</button>
    </div>
    
    `
    //BOTON QUE GENERA POST
    document.getElementById("post-it").addEventListener("click", ()=> {
      const tags = document.getElementById("post-tags").value;
      const privacy = document.getElementById("privacy-setting").value;
      const userId = firebase.auth().currentUser.uid;
      const post_text = document.getElementById("post-text").value;

      if (post_text === "" || tags === "" || privacy === "") {
        alert("Por favor, ingrese todos los campos requeridos: ingrese al menos una etiqueta y especifique la privacidad de su mensaje")
        return
      }
      submitpost(tags, privacy, userId, post_text)
    } )//este es el de submit post

    //BOTON QUE VUELVE A LOS POST
    document.getElementById("cancel").addEventListener("click", ()=> {
      window.socialNetwork.printPosts(window.socialNetwork.printPostsDOM)
    })
  })

  // BOTON BARRA DE NAVEGACIÓN LATERAL
  document.getElementById("user-profile").addEventListener("click", ()=> {
    document.getElementById("user-profile-side-nav").style.display = "block";
  })

  // PARA CERRAR NAVEGACIÓN LATERAL
  document.getElementById("content").addEventListener("click", ()=> {
    document.getElementById("user-profile-side-nav").style.display = "none";
  })

  document.getElementById("logout").addEventListener("click", logout)
    } else {
      // No user is signed in.
      loginPage();
    }
  });

 
  

  // PARA VERIFICAR QUE LA AUTENTICACION CON REDIRECCIONAMIENTO SALIO OK
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    const user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(`${errorCode} ${errorMessage}`)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  
 

})







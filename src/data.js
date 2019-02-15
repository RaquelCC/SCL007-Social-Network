


window.socialNetwork = {

    createNewUserStorage: ()=> {
        firebase.database().ref("users/"+firebase.auth().currentUser.uid).once("value", function(snapshot) {
            if (snapshot.val() === null) {
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid).set({
                    "profile": {
                        "username": firebase.auth().currentUser.displayName !== null ? firebase.auth().currentUser.displayName : firebase.auth().currentUser.email,
                        "especialidad": false,
                        "profilePic": firebase.auth().currentUser.photoURL ? firebase.auth().currentUser.photoURL : './img/userLogo.png',
                        "email": firebase.auth().currentUser.email
                    },
                    "posts": false,
                    "comments": false
                })
                // firebase.database().ref("users/"+firebase.auth().currentUser.uid).once("value", function(snapshot) {
                //     window.currentUser = snapshot.val();
                // })
            }
            else {
                // firebase.database().ref("users/"+firebase.auth().currentUser.uid).once("value", function(snapshot) {
                //     window.currentUser = snapshot.val();
                // })
                // console.log(snapshot.val())
                // console.log("usuario ya existia")
                return snapshot
            }
        })
        
    },
    

    printPosts: (cbDOM)=> {
        firebase.database().ref("/posts").on("value", cbDOM)
    },
   
    printPostsDOM: (snapshot)=>{
        document.getElementById("content").innerHTML = ""
        let postKeys = Object.keys(snapshot.val());
        postKeys.reverse();
        for(let post of postKeys) {
            // console.log(Object.values(snapshot.val()[post].comments).length)
            document.getElementById("content").innerHTML += `
            <div class="post div-responsive" id="caja${post}">
                   <div class="post-header">
                       <span><img src="${snapshot.val()[post].authorPic ? snapshot.val()[post].authorPic : './img/userLogo.png'}" class="user-pic-post" alt="userPic"><p>${snapshot.val()[post].author} ${snapshot.val()[post].especialidad ? "- "+snapshot.val()[post].especialidad : ""}</p></span>

                   </div>
                   <div class="post-content">
                    <textarea disabled  class= "postUser" id="post-user${post}">${snapshot.val()[post].content}</textarea>
                        <div id="button-option${post}" class="optionConfirmCancel">
                        <a id="to_update-${post}" class="update-post teachers-font">Actualizar</a>
                        <a id="cancel_edit-${post}" class="cancel-post teachers-font">Cancelar</a>
                        </div>

                   </div>
                   <div class="options">
                   <a class="like" id=${post}><i class="material-icons">star_border</i><span>${snapshot.val()[post].likes ? Object.values(snapshot.val()[post].likes).length : "0"}</span></a>
                   <a class="comments" id="comments${post}"><i class="material-icons">comment</i><span>${snapshot.val()[post]["comments"] ? Object.values(snapshot.val()[post]["comments"]).length : "0"}</span></a>
                   <a id="edit-${post}" class="edit-post teachers-font">Editar</a>
                   <a id="delete-${post}" class="remove-post teachers-font">Eliminar</a>
                   <a class="teachers-font create-comment" id="create-comment-${post}">Comentar</a>
                   </div>
                   <div id="create-comments-section-${post}"></div>
                   <div class="comments-section div-responsive" id="comments-section-${post}">
                   
                   </div>
            </div>
                        
            `
                
            document.getElementById("comments-section-"+post).style.display = "none"
    
            if (snapshot.val()[post].likes !== undefined && Object.keys(snapshot.val()[post].likes).indexOf(firebase.auth().currentUser.uid) !== -1) {
                document.getElementById(post).innerHTML = `
                <i class="material-icons">star</i><span>${snapshot.val()[post].likes ? Object.values(snapshot.val()[post].likes).length : "0"}</span>
                `
            }
            // console.log("creando funciones")
            let likeButtons = document.getElementsByClassName("like");
            for (let i = 0; i < likeButtons.length; i++) {
                likeButtons[i].addEventListener("click", setLikePost)
            }
            let commentsButtons = document.getElementsByClassName("comments");
            for (let i = 0; i < commentsButtons.length; i++) {
                commentsButtons[i].addEventListener("click", showComments)
            }
            let createCommentsButtons = document.getElementsByClassName("create-comment");
            for (let i = 0; i < createCommentsButtons.length; i ++) {
                createCommentsButtons[i].addEventListener("click", createComment)
            }

            let deletePost = document.getElementsByClassName("remove-post");
            for (let i = 0; i < deletePost.length; i ++) {
                deletePost[i].addEventListener("click", removePost)
            }

            let modifyPost = document.getElementsByClassName("edit-post");
            for (let i = 0; i < modifyPost.length; i++){
                modifyPost[i].addEventListener("click", enableTextarea)
            }

            let confirmEdit = document.getElementsByClassName("update-post");
            for (let i= 0; i < confirmEdit.length; i++){
                confirmEdit[i].addEventListener("click", confirm_edit)
            }

            let cancelEdit = document.getElementsByClassName("cancel-post");
            for (let i= 0; i < cancelEdit.length; i++){
                cancelEdit[i].addEventListener("click", cancel_editPost)
            }

        

          
    
            // document.getElementById(post).addEventListener("click", setLikePost)
            // document.getElementById("comments"+post).addEventListener("click", showComments)
            
          }
        
    },
    
    updateProfile: (username, profiency, userPic)=>{

        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once("value", function(snapshot){
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/profile`).update({
                username: username ? username : snapshot.val().profile.username,
                especialidad: profiency ? profiency : snapshot.val().profile.especialidad,
                profilePic: userPic ? userPic : snapshot.val().profile.profilePic
            })


        })
            
    },
    //tag es un array
    searchTag: (tag)=> {
        let filteredPosts = {};
        firebase.database().ref("posts/").on("value", function(snapshot){
            // console.log(snapshot.val())
            for (let i = 0; i<tag.length; i++){
                for (let post in snapshot.val()) {
                    // console.log(post)
                    if(snapshot.val()[post].tags.toLowerCase().split(" ").indexOf(tag[i].toLowerCase()) !== -1 || snapshot.val()[post].tags.toLowerCase().split(" ").indexOf("#"+tag[i].toLowerCase()) !== -1 ){
                        filteredPosts[post] = snapshot.val()[post]
                    }
                }
            }


        })
        return filteredPosts
    },
    

   verification: ()=>{
        let user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
            // Email sent.
            console.log("Enviando correo..");
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    }






}



















// {
//     /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
//     "rules": {
//       ".read": false,
//       ".write": false,
//         "users": {
//           "$uid": {
//             "profile": {
//                ".validate": "auth.uid == $uid"
//             },
//                "posts": {
//                   "tags": {
//                    ".validate": "auth.uid == $uid"
//                 },
//                 "content": {
//                   ".validate": "auth.uid == $uid"
//                 },
//                 "comments": {
//                   "$commentid": {
//                       ".validate": "auth.uid != null && newData.child('user_id').val() == auth.uid"
                  
//                   }
//                 }
//             }
//           },
//         ".read": "auth.uid != null",
//         ".write": "auth.uid != null",
            
//         }
//     }
//   }







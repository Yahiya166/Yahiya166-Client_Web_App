// Autherization start

// function of gotoSignUp()

function gotoSignUp() {
    window.location.replace("index2.html");
}




// function  of  SignUp()

function SignUp() {

    // get element by ID

    var Name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var phoneNumber = document.getElementById("number").value;
    var adress = document.getElementById("adress").value;

    var create_user = {
        name: Name,
        email: email,
        number: phoneNumber,
        adress: adress,
    }

    if (Name == "" || email == "" || password == "" || phoneNumber == "" || adress == "") {
        alert("please enter your data to signup the application")
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            console.log(create_user);
            firebase.database().ref('/').child(`users/Email/${create_user.name}`).push(create_user).then((result) => {
                alert(create_user.name + " signup successfully")
                window.location.replace("index.html")
                console.log(result)
            }).catch((error) => {
                alert(error.message)
            })


        })

            .catch(function (error) {
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }
}



// function  of  Login()


function Login() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {

        alert("User login successfully")

        window.location.replace("pages/Home/home.html")
    }).catch((error) => {
        var errorMessage = error.message;

        alert(errorMessage);
    })
}



// function  of  GoogleLogin()

function GoogleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            let create_users = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                uid: user.uid,
            }

            firebase.database().ref('/').child(`users/Google/${user.displayName}`).set(create_users).then(() => {
                alert(user.displayName + " is login successfull")
                window.location.replace("pages/Home/home.html");
            })
                .catch()

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert(errorMessage);
        });


}

// function  of  FacebookLogin()


function facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;
            let create_users = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                uid: user.uid,
            }

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            // console.log(user);

            firebase.database().ref('/').child(`users/Facebook/${user.displayName}`).set(create_users).then(() => {
                alert(user.displayName + " is login successfull")
                window.location.replace("pages/Home/home.html");
            })
                .catch()

        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            alert(errorMessage);

        });
}




// function  of  Logout()

function Logout() {
    firebase.auth().signOut().then(() => {
        alert("user logout successful")
        window.location.replace("../../index.html")
    }).catch((error) => {
        console.log(error.message);
    });
}


// Autherization end



// Database start

// firebase.database().ref('/').on(create_user)

// var userParah = document.getElementById("userID");

// userParah.innerHTML = "Wellcome Muhamamd Asif"




// Database End
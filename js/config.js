// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCmdOMPI8XDQg_jpLCFnw7SCJBQ0rx2XNQ",
  authDomain: "gsdemo-15532.firebaseapp.com",
  databaseURL: "https://gsdemo-15532.firebaseio.com",
  projectId: "gsdemo-15532",
  storageBucket: "gsdemo-15532.appspot.com",
  messagingSenderId: "45049544375",
  appId: "1:45049544375:web:6df75ca8a1d90ab9711732",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const refDB = firebase.database();

//sign in btn

//signup
$("#signUp").on("click", function () {
  const displayName = $("#displayName").val();
  const email = $("#upEmail").val();
  const password = $("#upPassword").val();
  console.log(displayName);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (result) {
      $("#log").html("サインアップ成功");
      $("#displayName").val(``);
      $("#upEmail").val(``);
      $("#upPassword").val(``);
      console.log(result);

     

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          if (user != null) {
            uid = user.uid;
            email2 = user.email;
            photoUrl = user.photoURL;
            world  = 1

            const userInfo = {
              uid: uid,
              email: email2,
              displayName: displayName,
              world: world
            };
            //user情報をusersに保存
            refDB.ref(`users/${uid}`).set(userInfo);
          }
          $("#log").html(`サインアップ完了。もう一度サインインしてください。`);
          return firebase.auth().currentUser.updateProfile({
            displayName: displayName,
          });
        } else {
          // No user is signed in.
          location.href = "index.html";
        }

        $("#top").html(`Hello ${name} email:${email}`);
      });

       
      
    })
    .catch(function (error) {
      console.log("signup error");
      const errorCode = error.code;
      const errorMessage = error.message;
      $("#log").html(`サインアップ失敗 ${errorCode} ${errorMessage}`);
    });
});

//signin
$("#signIn").on("click", function () {
  const email = $("#email").val();
  const password = $("#password").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (result) {
      console.log(result);
      $("#log").html(`ログイン成功`);
      $("#email").val(``);
      $("#password").val(``);
      
    location.href = "world.html";
    })
    .catch(function (error) {
      console.log("signin error");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      $("#log").html(`サインイン失敗${errorCode} ${errorMessage}`);
      $("#password").val(``);
    });
});

//signout
$("#signOut").on("click", function () {
  firebase
    .auth()
    .signOut()
    .then(function () {
      $("#log").html(`サインアウト成功`);
      $("#state").html(`Bye...`);
    })
    .catch(function (error) {
      console.log(error);
      $("#log").html(`サインアウト失敗`);
    });
});

//userInfo
// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     //user is signed in
//     const displayName = user.displayName;
//     const email = user.email;
//     const emailVerified = user.emailVerified;
//     const uid = user.uid;

//     $("#state").html(`Hello ${displayName}.`);
//     console.log(email);
//     console.log(displayName);
//     console.log(uid);
//   }
// });

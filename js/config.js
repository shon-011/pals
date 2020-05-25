var firebaseConfig = {
  apiKey: "AIzaSyCmdOMPI8XDQg_jpLCFnw7SCJBQ0rx2XNQ",
  authDomain: "gsdemo-15532.firebaseapp.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
      return firebase.auth().currentUser.updateProfile({
        displayName: displayName,
      });
      location.href="world.html"
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
      location.href="world.html"
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
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    //user is signed in
    const displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    $("#state").html(`Hello ${displayName}.`);
    console.log(email);
    console.log(displayName);
    console.log(uid);
  }
});

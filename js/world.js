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

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      console.log(name);
      console.log(email);
    } else {
      console.log("noName");
    }
  } else {
    // No user is signed in.
    location.href = "index.html";
  }

  $("#top").html(`Hello ${name}`);

});


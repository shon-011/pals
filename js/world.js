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
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    if (user != null) {
      name = user.displayName;
      uid = user.uid;
      email = user.email;
      photoUrl = user.photoURL;
    }
  } else {
    // No user is signed in.
    location.href = "index.html";
  }
  $("#top").html(`Hello ${name} email:${email}`);
});

$("#enterNewWorld").on("click", function () {
  const worldName = $("#newWorldName").val();
  const worldInfo = {
    worldName: worldName,
    users: uid,
  };

  //ワールド情報を/world/に保存
  refDB
    .ref("world/")
    .push(worldInfo)
    .then(function (data) {
     console.log(data);
      worldKey = data.key;
      const pushWorld = {
          worldKey: worldKey,
          worldName: worldName
      }


      //   ワールド情報を / users / world / に保存
          worldKey: worldKey,
      refDB.ref(`users/${uid}/world/`).set(worldKey).then(function(){
        $("#idView").html(`Idは　"${worldKey}" です。`)
      });
      
        

      

    
    
    $("#newWorldName").val("");
});
});

$("#enterWorld").on("click", function(){
  const worldId = $("#worldId").val();
  
  refDB.ref(`users/${uid}/world/`).set(worldId).then(function(){
    location.href = "main.html";
  });
});

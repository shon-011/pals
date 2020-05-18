var firebaseConfig = {
    apiKey: "AIzaSyCmdOMPI8XDQg_jpLCFnw7SCJBQ0rx2XNQ",
    authDomain: "gsdemo-15532.firebaseapp.com",
    databaseURL: "https://gsdemo-15532.firebaseio.com",
    projectId: "gsdemo-15532",
    storageBucket: "gsdemo-15532.appspot.com",
    messagingSenderId: "45049544375",
    appId: "1:45049544375:web:6df75ca8a1d90ab9711732"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  import firebase from "firebase/app";
  import "firebase/auth";
  
  const firebaseConfig = {
      /* firebase config */
  }
  
  // 初期化は一度だけ
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
  firebase.auth().createUserWithEmailAndPassword(email, password)
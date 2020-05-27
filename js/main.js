//HomeButton
$("#btn-home").on("click", function () {
  location.reload();
});

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
  $("#top1").html(`Hello ${name} `);

  const refText = firebase.database().ref(`world/timeLine`);

  // FirebaseSet
  var storage = firebase.storage();

  //getGPS by exif-API
  function exif() {
    return new Promise((resolve, reject) => {
      //同期化処理
      var file_input = $("#fileButton");
      var file = file_input[0].files[0];

      // EXIF.getDataでexif情報を解析
      EXIF.getData(file, function () {
        let gpsData = EXIF.getAllTags(this);
        console.log(gpsData);
        if (gpsData.GPSLatitude != undefined) {
          //lat
          let lat0 = gpsData.GPSLatitude[0].numerator;
          let lat1 = gpsData.GPSLatitude[1].numerator;
          let lat2 = gpsData.GPSLatitude[2].numerator;
          //60進数→10進数
          let lat1A = lat1 / 60;
          let lat2A = lat2 / 360000;
          let lat = lat0 + lat1A + lat2A;

          //lon
          let lon0 = gpsData.GPSLongitude[0].numerator;
          let lon1 = gpsData.GPSLongitude[1].numerator;
          let lon2 = gpsData.GPSLongitude[2].numerator;
          //60進数→10進数
          let lon1A = lon1 / 60;
          let lon2A = lon2 / 360000;
          let lon = lon0 + lon1A + lon2A;

          resolve([lat, lon]);
        } else {
          let lat = 0;
          let lon = 0;
          resolve([lat, lon]);
        }
      });
    });
  }

  // putCardInfo
  //selctFile
  let fileButton = document.querySelector("#fileButton");
  fileButton.addEventListener("change", function (e) {
    //ファイルを選択→送信でput〇
    //preView
    $("#img").remove();
    var file = $(this).prop("files")[0];
    if (!file.type.match("image.*")) {
      return;
    }
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      $("#result").html('<img  src="' + fileReader.result + '"/>');
    };
    fileReader.readAsDataURL(file);
    $("#file-label").html(e.target.files[0]);

    //Put
    $("#send").on("click", function () {
      //imgData
      //getImgData
      let file = e.target.files[0];

      //storage ref を作成 //UP lode imgData
      let storageRef = firebase
        .storage()
        .ref("wolrd/")
        .child(file.name)
        .put(file)
        .then((snapshot) => {
          let imgpath = firebase.storage().ref("wolrd/").child(file.name)
            .fullPath;

          //get imgURL
          let url = snapshot.ref.getDownloadURL().then((url) => {
            //get img GPS
            exif().then(function (gps) {
              let lat = gps[0];
              let lon = gps[1];

              //GPSData
              const la = lat;
              const lo = lon;
              //imgData
              const path = file.name;
              const imgUrl = url;

              //textData
              const uname = $("#uname").val();
              const text = $("#text").val();

              //dateData
              let now = new Date(); //Time取得
              let getMonth = now.getMonth();
              let getDate = now.getDate();
              let timeH = now.getHours(); //時間
              let timeM = now.getMinutes(); //分
              if (timeH < 10) {
                timeH = "0" + timeH;
              } //数字が一桁の場合０をつける。
              if (timeM < 10) {
                timeM = "0" + timeM;
              }
              const time = `${getMonth}/${getDate}   ${timeH}:${timeM}`; //時間：分を"time"に入れる

              //sendData
              const msg = {
                lat: la,
                lon: lo,
                imgpath: path,
                imgUrl: imgUrl,
                uname: name,
                text: text,
                time: time,
              };
              refText.push(msg).then(function () {
                $("#text").val("");
                $("#fileButton").val("");
                $("#result").remove();
              });
            });
          });
        });
    });
  }); //rink at change

  // Receive
  refText.on("child_added", function (data) {
    console.log(data);

    const val = data.val();
    const key = data.key;

    const lat = val.lat;
    const lon = val.lon;
    const dataImgpath = val.imgpath;
    const dataImg = val.imgUrl;
    const dataTime = val.time;
    const dataUname = val.uname;
    const dataText = val.text;
    const dataAll = `
                    <div id="${key}" class="card">
                            <img src="${dataImg}" class="card-img-top" alt="">
                        <div class="card-body">
                            <button type="button" id="btnmap" class="btn"  data-toggle="modal" data-target="#Modal2">...</button>
                            <h5 class="card-title">${dataUname}</h5>
                            <p class="card-text">${dataText}</p>
                            <p class="card-text text-right">
                                <small class="text-muted">${dataTime}</small> 
                                <button id="del" class="btn">×</button>  
                            </p> 
                        </div>
                     </div>

                    <script>

                        if(${lat} ==  0){$("#btnmap").hide();}
                        $("#btnmap").on("click",function(){
                          
                            var opts = {
                              zoom: 17,
                              center: new google.maps.LatLng(${lat},${lon})
                          };
                          var map = new google.maps.Map(document.getElementById("map"), opts);

                          marker = new google.maps.Marker({ // マーカーの追加
                              animation: google.maps.Animation.DROP,
                              position: new google.maps.LatLng(${lat},${lon}), // マーカーを立てる位置を指定
                              map: map // マーカーを立てる地図を指定
                          });
                          
                            
                        })
                    </script>`;

    //Output Card
    $("#output").prepend(dataAll);

    $("#del").on("click", function () {
      flag = confirm("この投稿を削除しますか？");
      console.log(data);

      console.log(data.key);
      console.log(dataImgpath);
      if (flag == true) {
        firebase
          .database()
          .ref(`world/timeLine/${data.key}`)
          .remove()
          .then(function () {
            firebase.storage().ref("wolrd/").child(dataImgpath).delete();
            $(`#${key}`).remove();
          });
      }
    });
  });
});

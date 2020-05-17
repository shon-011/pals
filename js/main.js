$(function(){
    $('.js-modal-open').on('click',function(){
        $('.js-modal').fadeIn();
        return false;
    });
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
        return false;
    });
});


// Your web app's Firebase configuration
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
  
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();



   

      

    let fileButton = document.querySelector("#fileButton")

    fileButton.addEventListener("change",function(e){
        
    });

  const refText = firebase.database().ref();






//  ボタン送信
    fileButton.addEventListener("change",function(e){   //ファイルを選択→送信でput〇
        console.log(e)
    $("#send").on("click",function(){
    //画像うｐ
    //ファイル名を取得
    let file = e.target.files[0];
    //storage ref を作成 //ファイルのアップロード
    let storageRef = firebase.storage().ref('shon_wolrd/').child(file.name).put(file).then(snapshot => {
        let url = snapshot.ref.getDownloadURL().then(url =>{
            const imgUrl = url;
    const uname = $("#uname").val();
    const text = $("#text").val();
            let now = new Date();  //Time取得
            let timeH = now.getHours();     //時間
            let timeM = now.getMinutes();      //分
                if(timeH<10){timeH ="0" + timeH}     //数字が一桁の場合０をつける。
                if(timeM<10){timeM ="0" + timeM}
    const time = `${timeH}:${timeM}`;         //時間：分を"time"に入れる
        
     const msg = {
        imgUrl: imgUrl, 
        uname: uname,
        text: text,
        time: time
    };
    refText.push(msg);
        }
           
        );
    });
   
        });
    });
    




// 受信
refText.on("child_added",function(data){
    const v = data.val();
    const k = data.key;
    
    const dataImg = v.imgUrl
    const dataTime = v.time;
    const dataUname = v.uname;
    const dataText = v.text;
    const dataAll = `<div class="col mb-4">
                     <div class="card">
                        <img src="${dataImg}" class="card-img-top" alt="">
                     <div class="card-body">
                        <h5 class="card-title">${dataUname}</h5>
                        <p class="card-text">${dataText}</p>
                        <p class="card-text"><small class="text-muted">${dataTime}</small></p>   
                     </div>
                     </div>
                     </div> `
    
    $("#output").prepend(dataAll);
    



});

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


//DBに送信の関数（pushFun）
  function pushDB(){ 
    const imgUrl = "";
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


let url;
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
            console.log(url);
            pushDB();
        });
    });
   
        });
    });
    
//  Ctrl+Enter送信
    fileButton.addEventListener("change",function(e){   //ファイルを選択→送信でput〇
    $("#text").on("keydown",function(e){
    if(e.ctrlKey && e.keyCode==13){
    //画像うｐ
    //ファイル名を取得
    let file = eb.target.files[0];
    //storage ref を作成 //ファイルのアップロード
    let storageRef = firebase.storage().ref('shon_wolrd/').child(file.name).put(file).then(snapshot => {
        let url = snapshot.ref.getDownloadURL();
             console.log(url);
             pushDB();
    });
    
    }
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
    const dataAll = `<div class="card">
                        <div id="imgcont"><img src="${dataImg}" alt=""></div>
                        <p class="name">${dataUname}<span> ${dataTime}</span></p><br>
                        <p class="comment">${dataText}</p>
                     </div>`
    
    $("#output").prepend(dataAll);
    



});

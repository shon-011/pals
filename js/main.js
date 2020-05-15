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

  const ref = firebase.database().ref();



//送信の関数（pushFun）
  function pushFun(){ 
    const uname = $("#uname").val();
    const text = $("#text").val();
            let now = new Date();  //Time取得
            let timeH = now.getHours();     //時間
            let timeM = now.getMinutes();      //分
                if(timeH<10){timeH ="0" + timeH}     //数字が一桁の場合０をつける。
                if(timeM<10){timeM ="0" + timeM}
    const time = `${timeH}:${timeM}`;         //時間：分を"time"に入れる
        
     const msg = {
        uname: uname,
        text: text,
        time: time
    };
    ref.push(msg);
    
}



//  ボタン送信
$("#send").on("click",function(){
    pushFun();
});
//  Ctrl+Enter送信
$("#text").on("keydown",function(e){
    if(e.ctrlKey && e.keyCode==13){
        pushFun();
    }
});



// 受信
ref.on("child_added",function(data){
    const v = data.val();
    const k = data.key;


    const dataTime = v.time;
    const dataUname = v.uname;
    const dataText = v.text;
    const dataAll = `<div class="card">
                        <div clas="imgcont"><img src=""></div>
                        <p class="name">${dataUname}<span> ${dataTime}</span></p><br>
                        <p class="comment">${dataText}</p>
                     </div>`
    
    $("#output").prepend(dataAll);



});

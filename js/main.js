$("#btn-home").on("click",function(){
    location.reload();
})


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
  
 

let lat;
let lon;





//  ボタン送信
    fileButton.addEventListener("change",function(e){   //ファイルを選択→送信でput〇


        // preview
        $('img').remove();
        var file = $(this).prop('files')[0];
        if(!file.type.match('image.*')){
            return;
        }
        var fileReader = new FileReader();
        fileReader.onloadend = function() {
            $('#result').html('<img  src="' + fileReader.result + '"/>');
        }
        fileReader.readAsDataURL(file);
        $("file-label").html(e.target.files[0]);

    // get exif
    var file_input = $('#fileButton');
    console.log(file_input);
    
    var file = file_input[0].files[0];
    // EXIF.getDataでexif情報を解析
    EXIF.getData(file, function() {
        let data = EXIF.getAllTags(this);
        console.log(data);
            
            let lat0 = data.GPSLatitude[0].numerator;
            let lat1 = data.GPSLatitude[1].numerator;
            let lat2 = data.GPSLatitude[2].numerator ;

            let lat1A = lat1 / 60 
            let lat2A = lat2 / 360000
            
            let lat = lat0 + lat1A + lat2A
            


            
                let lon0 = data.GPSLongitude[0].numerator;
                let lon1 = data.GPSLongitude[1].numerator;
                let lon2 = data.GPSLongitude[2].numerator;

                let lon1A = lon1 / 60 
                let lon2A = lon2 / 360000

            let lon = lon0 + lon1A + lon2A    
        
        
    });
    

    $("#send").on("click",function(){
        
    
        
    //img upload
    //ファイル名を取得
    let file = e.target.files[0];
        
    //storage ref を作成 //ファイルのアップロード
    let storageRef = firebase.storage().ref('shon_wolrd/').child(file.name).put(file).then(snapshot => {
        let imgpath = firebase.storage().ref('shon_wolrd/').child(file.name).fullPath
        
        
            
       
        let url = snapshot.ref.getDownloadURL().then(url =>{

            
           
            const path = file.name;
            const imgUrl = url;
            console.log(lat,lon)
            
            const uname = $("#uname").val();
            const text = $("#text").val();

            let now = new Date();  //Time取得
                let getMonth = now.getMonth();
                let getDate = now.getDate();
                let timeH = now.getHours();     //時間
                let timeM = now.getMinutes();      //分
                    if(timeH<10){timeH ="0" + timeH}     //数字が一桁の場合０をつける。
                    if(timeM<10){timeM ="0" + timeM}
            const time = `${getMonth}/${getDate}   ${timeH}:${timeM}`;         //時間：分を"time"に入れる
        
            const msg = {
                
                lat: "a",
                lon: "b",
                imgpath:path,
                imgUrl: imgUrl, 
                uname: uname,
                text: text,
                time: time
            };
            refText.push(msg);
   
        });
    });
    });
    
    
    
        });

    
    
    




// 受信
refText.on("child_added",function(data){
    console.log(data);

    const v = data.val();
    const k = data.key;
    
    
    const dataImgpath = v.imgpath;
    const dataImg = v.imgUrl;
    const dataTime = v.time;
    const dataUname = v.uname;
    const dataText = v.text;
    const dataAll = `
                     <div class="card">
                        <img src="${dataImg}" class="card-img-top" alt="">
                     <div class="card-body">
                     
                        <button type="button" id="btnmap" class="btn"  data-toggle="modal" data-target="#Moda2">...</button>
                        <h5 class="card-title">${dataUname} </h5>
                        <p class="card-text">${dataText}</p>
                       <p class="card-text text-right"><small class="text-muted">${dataTime}</small> <button id="del" class="btn">×</button>  </p> 
                     </div>
                     </div>
                     <script>
                     $("#btnmap").on("click",function(){
                        var opts = {
                            zoom: 2,
                            center: new google.maps.LatLng(33.354747,130.265603)
                          };
                          var map = new google.maps.Map(document.getElementById("map"), opts);
                    })
                    </script>
                     `
    
   

        $("#output").prepend(dataAll);
  
  
    
    
$("#del").on("click",function(){
    flag = confirm("この投稿を削除しますか？");
    if(flag == true){
        console.log(data.key);
       console.log(dataImgpath);
        firebase.database().ref(data.key).remove().then(function(){
            firebase.storage().ref('shon_wolrd/').child(dataImgpath).delete();
            
            location.reload();
        });
    }else{

    }
   });
    



  

});


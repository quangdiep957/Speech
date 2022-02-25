const APP_ID = 'cf26e7b2c25b5acd18ed5c3e836fb235';
const DEFAULT_VALUE = '--';
const searchInput=document.querySelector("#search-input");
searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);
            speak("Thời tiết :" + data.name +"có Nhiệt độ"+(Math.round(data.main.temp))+"Độ C" +" có sức gió"+(data.wind.speed * 3.6)+"km trên giờ");
           document.getElementById('cityname').innerHTML = data.name ;
           document.getElementById('container').style.display='block';
           document.getElementById('temperature').innerHTML = Math.round(data.main.temp)+"°C";
           document.getElementById('windspeed').innerHTML = (data.wind.speed * 3.6).toFixed(2);
           document.getElementById('sunrise').innerHTML = moment.unix(data.sys.sunrise).format('H:mm');
           document.getElementById('humidity').innerHTML = data.main.humidity ;
           document.getElementById('sunset').innerHTML = moment.unix(data.sys.sunset).format('H:mm') ;
            
        });
});
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'vi-VN';
recognition.continuous = false;


const microphone = document.querySelector('.btn-start');

const speak = (text) => {
    if (synth.speaking) {
        console.error('Busy. Speaking...');
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);

    utter.onend = () => {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utter.onerror = (err) => {
        console.error('SpeechSynthesisUtterance.onerror', err);
    }

    synth.speak(utter);
};
function openWindow( url )
{
  window.open(url, '_blank');
  window.focus();
  
}

function app(app)
{
    document.dispatchEvent(new CustomEvent('funcIntraLaunch',
    {
       'detail': { task: 'run',
                program: app,
          workingfolder: 'C://Windows/System32',
            windowstate: 'max',

             showerrors: 'true'
                 } })); 
}
function Hat_random()
{
     i=Math.floor((Math.random() * 10) + 1);
   switch(i)
   {
       case i=1:
       {
            speak("Bà ơi bà ,cháu yêu bà lắm. Tóc bà trắng màu trắng như mây");
           break;
       }
       case i=2:
       {
            speak("Một con vịt xòe ,ra hai cái cánh .Nó kêu rằng cáp cáp cáp ,cạp cạp cạp");
           break;
       }
       case i=3:
       {
            speak("Trong tù không rượu cũng không hoa.Cảnh đẹp đêm này khó hững hờ");
           break;
       }
       case i=4:
       {
            speak("Anh yêu người khác rồi.Người ấy như em ,cũng rất tuyệt vời");
           break;
       }
       case i=5:
       {
            speak("Dù là cơn mơ băng giá...Dù đợi chờ là ..nỗi xót xa...");
           break;
       }
       case i=6:
       {
            speak("dù tình chỉ là mong manh..Bờ môi còn khao khát chờ...");
           break;
       }
       case i=7:
       {
            speak("Nên anh lùi bước ,về sau");
           break;
       }
       case i=8:
       {
            speak("hihihih");
           break;
       }
       case i=9:
        {
             speak("hihihih");
            break;
        }
   }



}
function Read()
{
    speak("Dù đục dù trong, con sông vẫn chảy, Dù cao dù thấp, cây lá vẫn xanh, Dù người phàm tục hay kẻ tu hành, Vẫn phải sống từ những điều rất nhỏ, Ta hay chê rằng cuộc đời méo mó, Sao ta không tròn ngay tự trong tâm, Đất ấp ôm cho mọi hạt nảy mầm, Những chồi non tự vươn lên tìm ánh sáng, Nếu tất cả đường đời đều trơn láng Chắc gì ta đã nhận ra ta, Ai trong đời cũng có thể tiến xa, Nếu có khả năng tự mình đứng dậy, Hạnh phúc cũng như bầu trời này vậy, Không chỉ dành cho một riêng ai!");
}
const handleVoice = (text) => {
    console.log('text', text);
    document.getElementById("output").innerHTML = text;

    // "thời tiết tại Đà Nẵng" => ["thời tiết tại", "Đà Nẵng"]
    const handledText = text.toLowerCase();
    if (handledText.includes('thời tiết tại')) {
        const location = handledText.split('tại')[1].trim();

        console.log('location', location);
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
       
        return;
    }
    const container = document.querySelector('.demo');
    if (handledText.includes('nền')) {
        const color = handledText.split('nền')[1].trim();
        container.style.background = color;
        return;
    }

    if (handledText.includes('màu nền mặc định')) {
        container.style.background = '';
        return;
    }
    if (handledText.includes('đọc thơ')) {
        Read();
        return;
    }
    if (handledText.includes('điểm')) {
      speak("Bài này chỉ được 9,5 thôi");
        return;
    }
    if(handledText.includes('định nghĩa'))
    {
        const location = handledText.split('nghĩa')[1].trim();
         retrieve (location);
        return;
    }
    

    if (handledText.includes('mấy giờ')) {
        var currentdate = new Date();
        var time = "Bây giờ là: "
        + currentdate.getHours() + "giờ " 
        + currentdate.getMinutes() + "phút " + currentdate.getSeconds()+"giây ";
        const textToSpeech = time;
        document.getElementById("output").innerHTML = time;
        speak(textToSpeech);
        return;
    }
    if (handledText.includes('xin chào')) {
        speak("Xin chào bạn cần tôi giúp gì nào");
        return;
    }
    if (handledText.includes('ngày')) {
        var currentdate = new Date();
        var date = "Hôm nay là: " + currentdate.getDate() + "/" + (currentdate.getMonth() +1)
        + "/" + currentdate.getFullYear() ;
        const textToSpeech = date;
        document.getElementById("output").innerHTML = date;
        speak(textToSpeech);
        return;
    }
    if (handledText.includes('google')) {
        openWindow("https://google.com/");
       // speak(textToSpeech);
        return;
    }
    if (handledText.includes('youtube')) {
        openWindow("https://www.youtube.com/");
       // speak(textToSpeech);
        return;
    }
    if (handledText.includes('facebook')) {
        openWindow("https://www.facebook.com/");
       // speak(textToSpeech);
        return;
    }
    if (handledText.includes('mở')) {
        const location = handledText.split('mở')[1].trim();
        search="https://www.youtube.com/results?search_query=";
        search+=location;
        setTimeout('openWindow(search)', 3000);
       // speak(textToSpeech);
        return;
    }
    
    if (handledText.includes('ghi chú')) {

       app('notepad.exe');
        return;
    }
    if (handledText.includes('máy tính')) {

        app('calc.exe');
         return;
     }
     if (handledText.includes('cmd')) {

        app('cmd.exe');
         return;
     }
     if (handledText.includes('excel')) {

        app('excel.exe');
         return;
     }
     if(handledText.includes('phát nhạc'))
     {
    var sound = new Howl({
      src: ['https://zingmp3.vn/'],
      volume: 1,
      onend: function () {
        alert('Finished!');
      }
    });
    sound.play()

        return;
     }
    if (handledText.includes('giá vàng')) {
        
           document.getElementById("Giavang").style='block';
        return;
    }
    if (handledText.includes('hát')) {
        
     Hat_random();
     return;
 }
 if(handledText.includes('null'))
    {
        speak("Tôi chưa nghe thấy bạn nói gì");
        return;
    }
  {
    search="https://www.google.com/search?q=";
    search+=handledText;
    setTimeout('openWindow(search)',3000);
   // speak(textToSpeech);
    return;
}
   
}

microphone.addEventListener('click', (e) => {
    e.preventDefault();
    recognition.start();
    document.getElementById('container').style.display='none';
    document.getElementById('Giavang').style.display='none';
    microphone.classList.add('recording');
});

recognition.onspeechend = () => {
    recognition.stop();
    microphone.classList.remove('recording');
}

recognition.onerror = (err) => {
    console.error(err);
    if((document.getElementById("output").innerText)=="")
    {
        speak("Tôi chưa nghe thấy bạn nói gì ");
    }
    microphone.classList.remove('recording');
}

recognition.onresult = (e) => {
    console.log('onresult', e);
    const text = e.results[0][0].transcript;
    if(text!=null)
    {
        handleVoice(text);
    }
   
   

    
}
function retrieve(keyword)
{
  // Wikipedia API URL
   var url="https://vi.wikipedia.org/w/api.php";

  $.ajax({
             type:"GET",
             url:url,
             data:{action:"opensearch",format:"json",search:keyword},
             dataType:"jsonp",
             success: function (data)
                        {
                       
                           
                           speak(data[1]);
                        },
              error: function (error) 
                        {
                            alert(JSON.stringify(error));
                        }
                         
                          });

 }
 

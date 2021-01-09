prediction_1= "";
prediction_2= ""; 

Webcam.set({
   width:350,
   height:300,
   image_format : 'png',
   png_quality:90
 });

 camera = document.getElementById("camera");

Webcam.attach('#camera');

     
function take_snapshot()
{
   Webcam.snap(function(data_uri) {
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
   });
}

console.log("ml5 Version",ml5.version);

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UdQfNVAGM/model.json",modelLoaded);

function modelLoaded(){
   console.log("Model Loaded!");
}

function speak(){
   var synth= window.speechSynthesis;
   speak1= "The 1st prediction is "+prediction_1;
   speak2= "The 2nd prediction is "+prediction_2;
   var utterThis= new SpeechSynthesisUtterance(speak1,speak2);
   synth.speak(utterThis);
}

function check(){
   img= document.getElementById("captured_image");
   classifier.classify(img, gotResult);
}

function gotResult(error, results){
   if (error){
      console.log(error);
   } else {
      console.log(results);
      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_gesture_icon").innerHTML = results[1].label;
      prediction_1= results[0].label;
      prediction_2= results[1].label;
      speak();
      if(results[0].label == "👌"){
         document.getElementById("result_object_name").innerHTML = "👌";
      }
      if(results[0].label == "👍"){
         document.getElementById("result_object_name").innerHTML = "👍";         
      }
      if(results[0].label == "✌"){
         document.getElementById("result_object_name").innerHTML = "✌";         
      }
      if(results[1].label == "👌"){
         document.getElementById("result_object_gesture_icon").innerHTML = "👌";
      }
      if(results[1].label == "👍"){
         document.getElementById("result_object_gesture_icon").innerHTML = "👍";         
      }
      if(results[1].label == "✌"){
         document.getElementById("result_object_gesture_icon").innerHTML = "✌";         
      }
   } 
}
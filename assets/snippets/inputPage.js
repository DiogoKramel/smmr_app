function PlaySound(melody) {
    var path = "assets/sounds/"
    var snd = new Audio(path + melody + ".mp3");
    snd.play();
}

$(document).ready(function(){
    $("#btn1").click(function(){
      $("#test1").text("BLUE WHALE SELECTED");
      $("#test2").text("Select Sperm Whale");
      $("#test3").text("SELECT FIN WHALE");
      $("#test4").text("SELECT RIGHT WHALE");
      $("#test5").text("SELECT HUMPBACK WHALE");
      $("#test6").text("SELECT GRAY WHALE");
      $("#test6").text("SELECT ALTERNATIVE WHALE");
      $("#btn1").addClass('button-clicked-whale');
      $("#btn2").removeClass("button-clicked-whale");
      $("#btn3").removeClass("button-clicked-whale");
      $("#btn4").removeClass("button-clicked-whale");
      $("#btn5").removeClass("button-clicked-whale");
      $("#btn6").removeClass("button-clicked-whale");
      $("#btn7").removeClass("button-clicked-whale");
    });
});

$(document).ready(function(){
    $("#btn2").click(function(){
      $("#test1").text("SELECT BLUE WHALE");
      $("#test2").text("SPERM WHALE SELECTED");
      $("#test3").text("SELECT FIN WHALE");
      $("#test4").text("SELECT RIGHT WHALE");
      $("#test5").text("SELECT HUMPBACK WHALE");
      $("#test6").text("SELECT GRAY WHALE");
      $("#test7").text("SELECT ALTERNATIVE WHALE");
      $("#btn1").removeClass("button-clicked-whale");
      $("#btn2").addClass("button-clicked-whale");
      $("#btn3").removeClass("button-clicked-whale");
      $("#btn4").removeClass("button-clicked-whale");
      $("#btn5").removeClass("button-clicked-whale");
      $("#btn6").removeClass("button-clicked-whale");
      $("#btn7").removeClass("button-clicked-whale");
    });
  });
  
$(document).ready(function(){
    $("#btn3").click(function(){
      $("#test1").text("SELECT BLUE WHALE");
      $("#test2").text("Select Sperm Whale");
      $("#test3").text("FIN WHALE SELECTED");
      $("#test4").text("SELECT RIGHT WHALE");
      $("#test5").text("SELECT HUMPBACK WHALE");
      $("#test6").text("SELECT GRAY WHALE");
      $("#test7").text("SELECT ALTERNATIVE WHALE");
      $("#btn1").removeClass('button-clicked-whale');
      $("#btn2").removeClass('button-clicked-whale');
      $("#btn3").addClass('button-clicked-whale');
      $("#btn4").removeClass('button-clicked-whale');
      $("#btn5").removeClass('button-clicked-whale');
      $("#btn6").removeClass('button-clicked-whale');
      $("#btn7").removeClass("button-clicked-whale");
    });
});

$(document).ready(function(){
    $("#btn4").click(function(){
      $("#test1").text("SELECT BLUE WHALE");
      $("#test2").text("Select Sperm Whale");
      $("#test3").text("SELECT FIN WHALE");
      $("#test4").text("RIGHT WHALE SELECTED");
      $("#test5").text("SELECT HUMPBACK WHALE");
      $("#test6").text("SELECT GRAY WHALE");
      $("#test7").text("SELECT ALTERNATIVE WHALE");
      $("#btn1").removeClass('button-clicked-whale');
      $("#btn2").removeClass('button-clicked-whale');
      $("#btn3").removeClass('button-clicked-whale');
      $("#btn4").addClass('button-clicked-whale');
      $("#btn5").removeClass('button-clicked-whale');
      $("#btn6").removeClass('button-clicked-whale');
      $("#btn7").removeClass("button-clicked-whale");
    });
});

$(document).ready(function(){
    $("#btn5").click(function(){
      $("#test1").text("SELECT BLUE WHALE");
      $("#test2").text("Select Sperm Whale");
      $("#test3").text("SELECT FIN WHALE");
      $("#test4").text("SELECT RIGHT WHALE");
      $("#test5").text("HUMPBACK WHALE SELECTED");
      $("#test6").text("SELECT GRAY WHALE");
      $("#test7").text("SELECT ALTERNATIVE WHALE");
      $("#btn1").removeClass('button-clicked-whale');
      $("#btn2").removeClass('button-clicked-whale');
      $("#btn3").removeClass('button-clicked-whale');
      $("#btn4").removeClass('button-clicked-whale');
      $("#btn5").addClass('button-clicked-whale');
      $("#btn6").removeClass('button-clicked-whale');
      $("#btn7").removeClass("button-clicked-whale");
    });
});

 $(document).ready(function(){
    $("#btn6").click(function(){
      $("#test1").text("SELECT BLUE WHALE");
      $("#test2").text("Select Sperm Whale");
      $("#test3").text("SELECT FIN WHALE");
      $("#test4").text("SELECT RIGHT WHALE");
      $("#test5").text("SELECT HUMPBACK WHALE");
      $("#test6").text("GRAY WHALE SELECTED");
      $("#test7").text("SELECT ALTERNATIVE WHALE");
      $("#btn1").removeClass('button-clicked-whale');
      $("#btn2").removeClass('button-clicked-whale');
      $("#btn3").removeClass('button-clicked-whale');
      $("#btn4").removeClass('button-clicked-whale');
      $("#btn5").removeClass('button-clicked-whale');
      $("#btn6").addClass('button-clicked-whale');
      $("#btn7").removeClass("button-clicked-whale");
    });
});

$(document).ready(function(){
  $("#btn7").click(function(){
    $("#test1").text("SELECT BLUE WHALE");
    $("#test2").text("Select Sperm Whale");
    $("#test3").text("SELECT FIN WHALE");
    $("#test4").text("SELECT RIGHT WHALE");
    $("#test5").text("SELECT HUMPBACK WHALE");
    $("#test6").text("SELECT GRAY WHALE");
    $("#test7").text("ALTERNATIVE WHALE SELECTED");
    $("#btn1").removeClass('button-clicked-whale');
    $("#btn2").removeClass('button-clicked-whale');
    $("#btn3").removeClass('button-clicked-whale');
    $("#btn4").removeClass('button-clicked-whale');
    $("#btn5").removeClass('button-clicked-whale');
    $("#btn6").removeClass('button-clicked-whale');
    $("#btn7").addClass('button-clicked-whale');
  });
});

function myFunction1() {
  var popup = document.getElementById("myPopup1");
  popup.classList.toggle("show");
};

function myFunction2() {
  var popup = document.getElementById("myPopup2");
  popup.classList.toggle("show");
};

function myFunction3() {
  var popup = document.getElementById("myPopup3");
  popup.classList.toggle("show");
};

function myFunction4() {
  var popup = document.getElementById("myPopup4");
  popup.classList.toggle("show");
};

function myFunction5() {
  var popup = document.getElementById("myPopup5");
  popup.classList.toggle("show");
};

function myFunction6() {
  var popup = document.getElementById("myPopup6");
  popup.classList.toggle("show");
};

function myFunction7() {
  var popup = document.getElementById("myPopup7");
  popup.classList.toggle("show");
};

function myFunction8() {
  var popup = document.getElementById("myPopup8");
  popup.classList.toggle("show");
};

function myFunction9() {
  var popup = document.getElementById("myPopup9");
  popup.classList.toggle("show");
};

function myFunction10() {
  var popup = document.getElementById("myPopup10");
  popup.classList.toggle("show");
};

function myFunction11() {
  var popup = document.getElementById("myPopup11");
  popup.classList.toggle("show");
};

function myFunction12() {
  var popup = document.getElementById("myPopup12");
  popup.classList.toggle("show");
};

function myFunction13() {
  var popup = document.getElementById("myPopup13");
  popup.classList.toggle("show");
};

function myFunction15() {
  var popup = document.getElementById("myPopup15");
  popup.classList.toggle("show");
};

function myFunction16() {
  var popup = document.getElementById("myPopup16");
  popup.classList.toggle("show");
};

function myFunction17() {
  var popup = document.getElementById("myPopup17");
  popup.classList.toggle("show");
};

var speciesSelected = [];
function dataSpermWhale() {
  document.getElementById("ageLifeExpectancy").value = "70"
  document.getElementById("ageMaturationMin").value = "9"
  document.getElementById("ageMaturationMax").value = "10"
  document.getElementById("ageMenopause").value = "50"
  document.getElementById("pregnancyCycleMin").value = "3"
  document.getElementById("pregnancyCycleMax").value = "5"
  document.getElementById("probBirth").value = "90"
  document.getElementById("percentualJuveniles").value = "35"
  localStorage.setItem("speciesSelected", "Sperm Whale")
};

function dataBlueWhale() {
  document.getElementById("ageLifeExpectancy").value = "85"
  document.getElementById("ageMaturationMin").value = "5"
  document.getElementById("ageMaturationMax").value = "10"
  document.getElementById("ageMenopause").value = "60"
  document.getElementById("pregnancyCycleMin").value = "2"
  document.getElementById("pregnancyCycleMax").value = "3"
  document.getElementById("probBirth").value = "80"
  document.getElementById("percentualJuveniles").value = "30"
  localStorage.setItem("speciesSelected", "Blue Whale")
};

function dataFinWhale() {
  document.getElementById("ageLifeExpectancy").value = "90"
  document.getElementById("ageMaturationMin").value = "7"
  document.getElementById("ageMaturationMax").value = "12"
  document.getElementById("ageMenopause").value = "65"
  document.getElementById("pregnancyCycleMin").value = "2"
  document.getElementById("pregnancyCycleMax").value = "3"
  document.getElementById("probBirth").value = "80"
  document.getElementById("percentualJuveniles").value = "35"
  localStorage.setItem("speciesSelected", "Fin Whale")
};

function dataRightWhale() {
  document.getElementById("ageLifeExpectancy").value = "60"
  document.getElementById("ageMaturationMin").value = "5"
  document.getElementById("ageMaturationMax").value = "21"
  document.getElementById("ageMenopause").value = "40"
  document.getElementById("pregnancyCycleMin").value = "2"
  document.getElementById("pregnancyCycleMax").value = "3"
  document.getElementById("probBirth").value = "80"
  document.getElementById("percentualJuveniles").value = "50"
  localStorage.setItem("speciesSelected", "Right Whale")
};

function dataHumpbackWhale() {
  document.getElementById("ageLifeExpectancy").value = "50"
  document.getElementById("ageMaturationMin").value = "5"
  document.getElementById("ageMaturationMax").value = "7"
  document.getElementById("ageMenopause").value = "35"
  document.getElementById("pregnancyCycleMin").value = "2"
  document.getElementById("pregnancyCycleMax").value = "4"
  document.getElementById("probBirth").value = "80"
  document.getElementById("percentualJuveniles").value = "25"
  localStorage.setItem("speciesSelected", "Humpback Whale")
};

function dataGrayWhale() {
  document.getElementById("ageLifeExpectancy").value = "60"
  document.getElementById("ageMaturationMin").value = "5"
  document.getElementById("ageMaturationMax").value = "11"
  document.getElementById("ageMenopause").value = "40"
  document.getElementById("pregnancyCycleMin").value = "2"
  document.getElementById("pregnancyCycleMax").value = "3"
  document.getElementById("probBirth").value = "80"
  document.getElementById("percentualJuveniles").value = "30"
  localStorage.setItem("speciesSelected", "Gray Whale")
};

function dataAlternativeWhale() {
  localStorage.setItem("speciesSelected", "Alternative Species")
};
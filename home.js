var arText;
var enText;
var surah;
var ayahNumber;
var lastAyahNumber;
var surahAndAyah;
var nextSurahAndAyah;
var nextAyah;
var ayah;
var urlNext;

$(document).ready(function(){
  // getQuote();
  $("#shuffle").on("click", getQuote);
  $("#showme").on("click", showRest);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

function getQuote() {
  var min = document.getElementById("min").value;
  var max = document.getElementById("max").value;

  // ayah = getRandomInt(4676, 5104); // Juz' 27
  // ayah = getRandomInt(4676, 5242); // Juz' 27 + 28
  // ayah = getRandomInt(5105, 6236);
  // ayah = getRandomInt(5105, 5242); // Juz' 28
  // ayah = getRandomInt(5242, 5673);
  ayah = getRandomInt(min, max);

  var url = "https://api.alquran.cloud/ayah/"+ayah+"/en.asad";
  var urlArabic = "https://api.alquran.cloud/ayah/"+ayah;
  nextAyah = ayah + 1;
  urlNext = "https://api.alquran.cloud/ayah/"+nextAyah;

  arText;
  enText;
  surah;
  ayahNumber;
  lastAyahNumber;
  surahAndAyah;

  $.getJSON( urlArabic, function(data) {
    arText = data.data.text;
    document.getElementById("arabicVerseText").innerHTML = arText;
    document.getElementById("arabicNextText").innerHTML = "";
    document.getElementById("surahAndAyah").innerHTML = "";
    document.getElementById("nextSurahAndAyah").innerHTML = "";

    console.log(arText);
  });

  $.getJSON( url, function(data) {
    console.log(data);
    enText = data.data.text;
    surah = data.data.surah.englishName;
    lastAyahNumber = data.data.surah.numberOfAyahs;
    ayahNumber = data.data.numberInSurah;
    surahAndAyah = surah + " : "+ ayahNumber;

    console.log(enText);
    console.log(surah);
    console.log(ayahNumber);
    console.log( "success" );
  })
    .done(function() {
      console.log("second success");
    })
    .fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + textStatus); })
    .always(function() {
      console.log( "complete" );
    });
}

function showRest() {
  var url = "https://api.alquran.cloud/ayah/"+nextAyah+"/en.asad";
  var urlArabic = "https://api.alquran.cloud/ayah/"+nextAyah;
  ayah = nextAyah;
  nextAyah = ayah + 1;
  arText;
  enText;
  surah;
  ayahNumber;
  lastAyahNumber;
  surahAndAyah;
  nextSurahAndAyah;

  $.getJSON( urlArabic, function(data) {
    arText = data.data.text;
    document.getElementById("arabicNextText").innerHTML = arText;

    console.log(arText);
  });

  $.getJSON( url, function(data) {
    console.log(data);
    enText = data.data.text;
    surah = data.data.surah.englishName;
    lastAyahNumber = data.data.surah.numberOfAyahs;
    ayahNumber = data.data.numberInSurah;
    nextSurahAndAyah = surah + " : "+ ayahNumber;
    document.getElementById("surahAndAyah").innerHTML = surahAndAyah;
    document.getElementById("nextSurahAndAyah").innerHTML = nextSurahAndAyah;

    console.log(enText);
    console.log(surah);
    console.log(ayahNumber);
    console.log( "success" );
  })
    .done(function() {
      console.log("second success");
    })
    .fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + textStatus); })
    .always(function() {
      console.log( "complete" );
    });
}



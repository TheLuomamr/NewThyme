//document.getElementById("HurryHunger").innerHTML = "Paragraph changed!";
/*$(function(){

    $("#Hangry").typingeffect();
    /*$(function(){

        $("#Hangy").typingeffect({
          maxlength: 120
        });
      
      });
  });*/
  $(document).ready(function() {
      

    $("#Hangry").typingeffect({
        maxlength: "30"
    })

});

//second text animate plugin
/*var $input = $('.bloop input');
var $div = $('.bloop div');
var $carrat = $('.bloop div .frame');

var current = '';

function addLetters(letters) {
  var delay = 200;
  var base = 0;
  letters.split('').forEach(function(letter, i) {
    console.log('delaying %d on letter %s', i*delay, letter);
    setTimeout(function() {
      if (letter === ' ') { letter = '&nbsp;'; }
      var span = '<span>' + letter + '</span>';
      $frame.before(span);
    }, delay * i);
  });
}

function deleteLastLetter() {
  $div.find('span:last').remove();
}

function indexOfChange(a, b) {
  var i = 0;
  while (a.charAt(i) === b.charAt(i)) { i++; }
  return i;
}

// keypress only fires for 'readable' content
$input.on('input', function(e){
  var val = this.value;
  var idx = indexOfChange(current, val);
  var base = current.slice(0, idx);
  
  // shrink current and displayed down to base size
  while(current.length > base.length) {
    deleteLastLetter();
    current = current.slice(0, current.length - 1);
  }
  
  // adding
  if (val.length > base.length) {
    var letters = val.slice(idx);
    addLetters(letters);
    current = val;
  }

});*/
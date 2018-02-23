console.log('Loaded!');
var counter = 0;
var button = document.getElementById("container");
button.onclick = function() {
    
    counter = counter+1;
    var span = document.getElementById("count");
    span.innerHTML = counter.toString();
};
      
  











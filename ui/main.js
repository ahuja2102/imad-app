console.log('Loaded!');
var button = document.getElementById("container");
button.onclick = function() 
{
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
      if (request.readyState == XMLHttpRequest.DONE)
      {
          if(request.status == 200){
              var counter=request.responseText;
              var span=document.getElementById('count');
              span.innerHTML = counter.toString();
              
          }
          
      }  
        
    };
  request.open('GET', 'http://ahujaaditya7.imad.hasura-app.io/counter', true);
  request.send(null);
};
      
  











function createDevice(){
  console.log("It Worked");
  
  var request = getRequestObject();
  request.onreadystatechange = function() {handleRequest(request)};
  request.open("GET", "http://skynet.im/status", true);
  request.send(null);
}

function addField(divName){
    var newDiv = document.createElement('div');
    newDiv.innerHTML = "Key/Value Pair: <input type='text' name='keyInputs[]'>=<input type='text' name='valueInputs[]'>"
    document.getElementById(divName).appendChild(newDiv);
}
  
function getRequestObject() {
  if (window.XMLHttpRequest) return (new XMLHttpRequest());
  else return (null);
}

function handleRequest(request) {
  if (request.readyState == 4) console.log(request.responseText);
}
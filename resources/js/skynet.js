function createDevice(){
  console.log("It Worked");
  
  var owner = document.getElementById("owner").value;
  var token = document.getElementById("token").value;
  var keys = document.getElementsByName("keyInputs[]");
  var values = document.getElementsByName("valueInputs[]");
  
  if ((owner.length > 0) && (token.length > 0)) {
    var payload = "owner=" + owner + "&token=" + token;

    for (var i=0; i < keys.length; i++) {
      if ((keys[i].value.length > 0) && (values[i].value.length > 0)) {
        payload = payload + "&"+ keys[i].value + "=" + values[i].value;
      }
    }
  
    var request = getRequestObject();
    request.onreadystatechange = function() {handleRequest(request)};
    request.open("POST", "http://skynet.im/devices", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(payload);
    
  }else console.log("invalid input");
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
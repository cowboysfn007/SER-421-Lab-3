var __owner = "robruss";
var __token = 421;

function loadForms(){
    newForm();
    newQuery();
}

function createDevice(){
  console.log("It Worked");
  
  //var owner = document.getElementById("owner").value;
  //var token = 421;
  var keys = document.getElementsByName("keyInputs[]");
  var values = document.getElementsByName("valueInputs[]");
  
  //if ((owner.length > 0) && (token.length > 0)) {
    var payload = "owner=" + owner + "&token=" + __token;

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
    
    document.getElementById("tabs-1").innerHTML = "";
    document.getElementById("tabs-1").appendChild(pseudoDeviceForm(owner));
    
 // }else console.log("invalid input");
}

function newForm() {
  document.getElementById("tabs-1").innerHTML = "";
  document.getElementById("tabs-1").appendChild(pseudoDeviceForm());
}

function pseudoDeviceForm() {
  var form = document.createElement("form");
  
  var p = document.createElement("p");
  p.innerHTML = "Create Pseudo Devices"
  form.appendChild(p);
  
  var label = document.createElement("label");
  label.innerHTML = "Owner: ";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "owner");
  input.setAttribute("value", __owner);
  input.setAttribute("disabled", "true");
  form.appendChild(input);
  
  var label = document.createElement("label");
  label.innerHTML = "<br>Key/Value Pair: ";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "keyInputs[]");
  form.appendChild(input);
  
  var label = document.createElement("label");
  label.innerHTML = "=";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "valueInputs[]");
  form.appendChild(input);
  
  var div = document.createElement("div");
  div.setAttribute("id", "dynamicField");
  form.appendChild(div);
  
  var input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("value", "Add Additional Pair");
  input.setAttribute("onClick", "addField('dynamicField')");
  form.appendChild(input);
  
  var input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Submit");
  form.appendChild(input);
  
  form.setAttribute("action", "javascript:createDevice()");
  form.setAttribute("method", "post");
                           
  return form;
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

function newQuery(){
    document.getElementById("tabs-2").innerHTML = "";
    document.getElementById("tabs-2").appendChild(queryForm());
}

function queryForm(){
    var form = document.createElement("form");
  
  var p = document.createElement("p");
  p.innerHTML = "Query by UUID"
  form.appendChild(p);
  
  var label = document.createElement("label");
  label.innerHTML = "UUID: ";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "uuid");
  form.appendChild(input);
  
  var input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Query");
  form.appendChild(input);
  
  form.setAttribute("action", "javascript:queryDevice()");
  form.setAttribute("method", "get");
                           
  return form;
}

function queryDevice(){
    console.log("Query");   
}
var __owner = "robruss";
var __token = 421;
var __baseURL = "http://skynet.im/devices";

function loadForms(){
    newForm();
    newQuery();
    newSearch();
    newDelete();
}

function createDevice(){
  console.log("It Worked");
  
  //var owner = document.getElementById("owner").value;
  //var token = 421;
  var keys = document.getElementsByName("keyInputs[]");
  var values = document.getElementsByName("valueInputs[]");
  
  //if ((owner.length > 0) && (token.length > 0)) {
    var payload = "owner=" + __owner + "&token=" + __token;

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
    document.getElementById("tabs-1").appendChild(pseudoDeviceForm());
    
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

function searchForm() {
  var form = document.createElement("form");
  
  var p = document.createElement("p");
  p.innerHTML = "Search for Devices by Key/Value Pair";
  form.appendChild(p);
  
  var label = document.createElement("label");
  label.innerHTML = "Key/Value Pair: ";
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
  div.setAttribute("id", "dynamicSearchField");
  form.appendChild(div);
  
  var input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("value", "Add Additional Pair");
  input.setAttribute("onClick", "addField('dynamicSearchField')");
  form.appendChild(input);
  
  var input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Search");
  form.appendChild(input);
  
  form.setAttribute("action", "javascript:searchForDevice()");
  form.setAttribute("method", "get");
  form.setAttribute("id", "searchForm");
  
  return form;
}

function newSearch() {
  document.getElementById("tabs-3").innerHTML = "";
  document.getElementById("tabs-3").appendChild(searchForm());
}

function searchForDevice() {
  console.log("search called");
  
  //var form = document.getElementById("searchForm");
  
  //console.log(form.innerHTML);
  var keys = document.getElementsByName("keyInputs[]");
  var values = document.getElementsByName("valueInputs[]");
  
  var payload = "?";

    for (var i=0; i < keys.length; i++) {
      if ((keys[i].value.length > 0) && (values[i].value.length > 0)) {
        if (i != 0) payload = payload + "&";
        payload = payload + keys[i].value + "=" + values[i].value;
      }
    }
  
  var request = getRequestObject();
  request.onreadystatechange = function() {handleRequest(request)};
  request.open("GET", __baseURL + payload, true);
  request.setRequestHeader("skynet_auth_uuid", __owner);
  request.setRequestHeader("skynet_auth_token", __token);
  request.send(null);
  
  newSearch();
}

function addField(divName) {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = "Key/Value Pair: <input type='text' name='keyInputs[]'>=<input type='text' name='valueInputs[]'>"
    document.getElementById(divName).appendChild(newDiv);
}
  
function getRequestObject() {
  if (window.XMLHttpRequest) return (new XMLHttpRequest());
  else return (null);
}

function handleRequest(request) {
  if (request.readyState == 4) {
    var text = "";
    var results = JSON.parse(request.responseText);
    
    if (!results.hasOwnProperty("devices")) {
      text += parseDevice(results);
    }else if (results.hasOwnProperty("devices")) {
      var num = results.devices.length;
    
      for (var i=0; i<num; i++) {
        var device = results.devices[i];
        var name = "Device - " + device.uuid;
      
        var element = parseDevice(device);
        console.log(name);
        console.log(element);
        
        text += "<br>" + name + "<br>";
        text += element;
      //document.getElementById("results").appendChild = element;
      
      }
    }
    
    document.getElementById("results").innerHTML = text;
  }
}

function parseDevice(device) {
  var text = "";
  for (var key in device) {
    if (device.hasOwnProperty(key)) {
      if (typeof device[key] === 'object') text += key + ":<br>" + parseDevice(device[key]);
      else text += (key + ":" + device[key] + "<br>");
    }
  }
  return text;
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
  form.setAttribute("method", "post");
                           
  return form;
}

function queryDevice(){
    console.log("Query");
    var uuid = document.getElementById("uuid").value;
    var request = getRequestObject();
    request.onreadystatechange = function() {handleRequest(request)};
    request.open("GET", "http://skynet.im/devices/" + uuid, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("skynet_auth_uuid", __owner);
    request.setRequestHeader("skynet_auth_token", __token);
    request.send(null);
    
    document.getElementById("tabs-2").innerHTML = "";
    document.getElementById("tabs-2").appendChild(queryForm());
}

/*
function handleQueryRequest(request){
    if (request.readyState == 4) {
      console.log(request.responseText);
    }
}
*/

//Delete Functionality
function newDelete(){
    document.getElementById("tabs-4").innerHTML = "";
    document.getElementById("tabs-4").appendChild(deleteForm());
}

function deleteForm(){
  var form = document.createElement("form");
  
  var p = document.createElement("p");
  p.innerHTML = "Delete by UUID"
  form.appendChild(p);
  
  var label = document.createElement("label");
  label.innerHTML = "UUID: ";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "deleteUuid");
  form.appendChild(input);
  
  var input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Delete");
  form.appendChild(input);
  
  form.setAttribute("action", "javascript:deleteDevice()");
  form.setAttribute("method", "post");
                           
  return form;
}

function deleteDevice(){
    console.log("Delete");
    var uuid = document.getElementById("deleteUuid").value;
    var request = getRequestObject();
    request.onreadystatechange = function() {handleRequest(request)};
    request.open("DELETE", "http://skynet.im/devices/" + uuid, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("skynet_auth_uuid", __owner);
    request.setRequestHeader("skynet_auth_token", __token);
    request.send(null);
    
    document.getElementById("tabs-4").innerHTML = "";
    document.getElementById("tabs-4").appendChild(deleteForm());
}

/*
function handleDeleteRequest(request){
    if (request.readyState == 4) console.log(request.responseText);  
}
*/


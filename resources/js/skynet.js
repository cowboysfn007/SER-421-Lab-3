var __owner = "robruss";
var __token = 421;
var __baseURL = "http://skynet.im/devices";

function loadForms() {
  newCreate();
  newQuery();
  newSearch();
  newDelete();
  newUpdate();
}

function newCreate() {
  document.getElementById("tabs-1").innerHTML = "";
  document.getElementById("tabs-1").appendChild(createForm());
}

function newQuery() {
  document.getElementById("tabs-2").innerHTML = "";
  document.getElementById("tabs-2").appendChild(queryForm());
}

function newSearch() {
  document.getElementById("tabs-3").innerHTML = "";
  document.getElementById("tabs-3").appendChild(searchForm());
}

function newDelete() {
  document.getElementById("tabs-4").innerHTML = "";
  document.getElementById("tabs-4").appendChild(deleteForm());
}

function newUpdate(){
  document.getElementById("tabs-5").innerHTML = "";
  document.getElementById("tabs-5").appendChild(updateForm()); 
}

// Tab forms
function createForm() {
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

function queryForm() {
  var form = document.createElement("form");
  
  var p = document.createElement("p");
  p.innerHTML = "Query by UUID"
  form.appendChild(p);
  
  var label = document.createElement("label");
  label.innerHTML = "UUID: ";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "queryUUID");
  //input.setAttribute("selectBoxOptions", "Test;Test2");
  form.appendChild(input);
  
  var input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Query");
  form.appendChild(input);
  
  var label = document.createElement("label");
  label.innerHTML = "<br>Select UUID: ";
  form.appendChild(label);
  
  var select = document.createElement("select");
  fillCookieUUID(select);
  select.setAttribute("id", "selectQueryUUID");
  select.setAttribute("onChange", "javascript:copyToUUID(this, 'queryUUID')");
  form.appendChild(select);
  
  form.setAttribute("action", "javascript:queryDevice()");
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
  
  form.setAttribute("action", "javascript:searchDevice()");
  form.setAttribute("method", "get");
  form.setAttribute("id", "searchForm");
  
  return form;
}

function deleteForm() {
  var form = document.createElement("form");
  
  var p = document.createElement("p");
  p.innerHTML = "Delete by UUID"
  form.appendChild(p);
  
  var label = document.createElement("label");
  label.innerHTML = "UUID: ";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "deleteUUID");
  form.appendChild(input);
  
  var input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Delete");
  form.appendChild(input);
  
  var label = document.createElement("label");
  label.innerHTML = "<br>Select UUID: ";
  form.appendChild(label);
  
  var select = document.createElement("select");
  fillCookieUUID(select);
  select.setAttribute("id", "selectDeleteUUID");
  select.setAttribute("onChange", "javascript:copyToUUID(this, 'deleteUUID')");
  form.appendChild(select);
  
  form.setAttribute("action", "javascript:deleteDevice()");
  form.setAttribute("method", "post");
                           
  return form;
}

function updateForm(){
  var form = document.createElement("form");
  
  var p = document.createElement("p");
  p.innerHTML = "Update Geo Location"
  form.appendChild(p);
  
  var label = document.createElement("label");
  label.innerHTML = "UUID: ";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "updateUUID");
  form.appendChild(input);
  
  var input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Update");
  form.appendChild(input);
  
  form.setAttribute("action", "javascript:updateDevice()");
  form.setAttribute("method", "post");
                           
  return form; 
}

// AJAX and REST functions
function createDevice() {
  console.log("Create");
  var keys = document.getElementsByName("keyInputs[]");
  var values = document.getElementsByName("valueInputs[]");
  var payload = "owner=" + __owner + "&token=" + __token;

  for (var i=0; i < keys.length; i++) {
    if ((keys[i].value.length > 0) && (values[i].value.length > 0)) {
      payload = payload + "&"+ keys[i].value + "=" + values[i].value;
    }
  }

  var request = getRequestObject();
  request.onreadystatechange = function() {handleRequest(request)};
  request.open("POST", __baseURL, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(payload);
    
  newCreate();
}

function queryDevice(){
  console.log("Query");
  var uuid = document.getElementById("queryUUID").value;
  var request = getRequestObject();
  request.onreadystatechange = function() {handleRequest(request)};
  request.open("GET", __baseURL + "/" + uuid, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.setRequestHeader("skynet_auth_uuid", __owner);
  request.setRequestHeader("skynet_auth_token", __token);
  request.send(null);
    
  newQuery();
}

function searchDevice() {
  console.log("Search");
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

function deleteDevice() {
  console.log("Delete");
  var uuid = document.getElementById("deleteUUID").value;
  var request = getRequestObject();
  request.onreadystatechange = function() {handleRequest(request)};
  request.open("DELETE", __baseURL + "/" + uuid, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.setRequestHeader("skynet_auth_uuid", __owner);
  request.setRequestHeader("skynet_auth_token", __token);
  request.send(null);
    
  newDelete();
}

function updateDevice(){
  console.log("Update");
  var uuid = document.getElementById("updateUUID").value;
  var request = getRequestObject();
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude; 
    var long = position.coords.longitude;
    var payload = "lat=" + lat + "&long=" + long;
    request.onreadystatechange = function() {handleRequest(request)};
    request.open("PUT", __baseURL + "/" + uuid, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("skynet_auth_uuid", __owner);
    request.setRequestHeader("skynet_auth_token", __token);
    request.send(payload);
  });
  
  newUpdate();
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

function copyToUUID(select, uuidLocation) {
  var value = select.options[select.selectedIndex].value;
  document.getElementById(uuidLocation).value = value;
}

function fillCookieUUID(select) {
  var sample = ["sample1", "sample2", "sample3"];
  
  var option = document.createElement("option");
  option.disabled = true;
  option.selected = true;
  option.textContent = "Select One";
  select.appendChild(option);
  
  for (var i=0; i < sample.length; i++) {
    option = document.createElement("option");
    option.textContent = sample[i];
    option.value = sample[i];
    select.appendChild(option);
  }
}

function addField(divName) {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = "Key/Value Pair: <input type='text' name='keyInputs[]'>=<input type='text' name='valueInputs[]'>"
    document.getElementById(divName).appendChild(newDiv);
}

function getRequestObject() {
  if (window.XMLHttpRequest) return new XMLHttpRequest();
  else return null;
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
      }
    }
    document.getElementById("results").innerHTML = text;
  }
}
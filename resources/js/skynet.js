/*
 *  Rob Miller
 *  Russ Parmer
 *  SER421
 *  Lab 3 - EC
 *  10/15/14
 */

var __owner = "robruss";
var __token = 421;
var __baseURL = "http://skynet.im/devices";
var __cookieName = "skynet-ser-421";
var __pinCookie = "pin-locations";
var __map;

function loadForms() {
  newCreate();
  newQuery();
  newSearch();
  newDelete();
  newUpdate();
  initialize();
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
  p.innerHTML = "Create Pseudo Devices";
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
  p.innerHTML = "Query by UUID";
  form.appendChild(p);
  
  var label = document.createElement("label");
  label.innerHTML = "UUID: ";
  form.appendChild(label);
  
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "queryUUID");
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
  p.innerHTML = "Delete by UUID";
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
  
  var label = document.createElement("label");
  label.innerHTML = "<br>Select UUID: ";
  form.appendChild(label);
  
  var select = document.createElement("select");
  fillCookieUUID(select);
  select.setAttribute("id", "selectUpdateUUID");
  select.setAttribute("onChange", "javascript:copyToUUID(this, 'updateUUID')");
  form.appendChild(select);
  
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
  request.onreadystatechange = function() {handleRequest(request, "create")};
  request.open("POST", __baseURL, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(payload);
    
  newCreate();
}

function queryDevice(){
  console.log("Query");
  var uuid = document.getElementById("queryUUID").value;
  var request = getRequestObject();
  request.onreadystatechange = function() {handleRequest(request, "query")};
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
  request.onreadystatechange = function() {handleRequest(request, "search")};
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
  request.onreadystatechange = function() {handleRequest(request, "delete")};
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
    request.onreadystatechange = function() {handleRequest(request, "update")};
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
  var option = document.createElement("option");
  option.disabled = true;
  option.selected = true;
  option.textContent = "Select One";
  select.appendChild(option);
  
  var cookie = getCookie(__cookieName);
  if (cookie != "") {
    var uuids = JSON.parse(getCookie(__cookieName));
    for (var i=0; i < uuids.length; i++) {
      option = document.createElement("option");
      option.textContent = uuids[i];
      option.value = uuids[i];
      select.appendChild(option);
    }
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

function handleRequest(request, method) {
  if (request.readyState == 4) {
    var text = "";
    var results = JSON.parse(request.responseText);
    
    if ( method === "create" || method === "delete" || method === "update") {
      text += "<br>" + parseDevice(results);
    }else if (method === "query" || method === "search") {
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
    if(method === "create"){
      addToCookie(__cookieName, results.uuid);
    }
    else if(method === "delete"){
      deleteFromCookie(__cookieName, results.uuid);
      deleteFromCookie(__pinCookie, results.uuid);
    }
    else if(method === "update"){
      var pinInfo = {uuid:results.uuid, lat:results.lat, long:results.long, timestamp:results.timestamp}; 
      addToCookie(__pinCookie, JSON.stringify(pinInfo));
    }
      
    document.getElementById("results").innerHTML = text;
    loadForms();
  }
}

//Cookie Functions
function addToCookie(cname, cvalue){
  if(checkCookie(cname)){
    modifyCookie(cname, cvalue);   
  }else{
    createCookie(cname, JSON.stringify([cvalue]));   
  }
}

function createCookie(cname, cvalue){
  var d = new Date();
  d.setTime(d.getTime() + (365*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++){
    var c = ca[i];
    while(c.charAt(0) == ' ') c = c.substring(1);
    if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

function checkCookie(cname){
  var value = getCookie(cname);
  if(value != ""){
    return true;   
  }
  else{
    return false;
  }
}

function modifyCookie(cname, cvalue){
  var value = getCookie(cname);
  var valueArray = JSON.parse(value);
  valueArray.push(cvalue);
  value = JSON.stringify(valueArray)
  createCookie(cname, value);
}

function deleteFromCookie(cname, cvalue){
  if(checkCookie(cname)){
    deleteEntry(cname, cvalue);
  }
}

function deleteEntry(cname, cvalue){
  var value = getCookie(cname);
  var valueArray = JSON.parse(value);
  
  for(var i = 0; i < valueArray.length; i++){
    var uuid;
    if (cname == __pinCookie) {
      var temp = JSON.parse(valueArray[i]);
      uuid = temp.uuid;
    }else if (cname === __cookieName) {
      uuid = valueArray[i];
    }
    if(uuid === cvalue){
      valueArray.splice(i,1);
      break;
    }
  }
  createCookie(cname, JSON.stringify(valueArray));
}

//Google Maps
function initialize(){
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(33.2952149,-111.7639625)
  };
  __map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  updateMap();
}

function updateMap(){
  var pins = JSON.parse(getCookie(__pinCookie));
  for(var i = 0; i < pins.length; i++){
    var pin = JSON.parse(pins[i]);
    console.log("UUID: " + pin.uuid + " LAT: " + pin.lat);
    var myLatLong = new google.maps.LatLng(pin.lat,pin.long);
    var marker = new google.maps.Marker({
      position: myLatLong,
      map: __map,
      title: pin.uuid + " @ " + pin.timestamp
    });
  }
}
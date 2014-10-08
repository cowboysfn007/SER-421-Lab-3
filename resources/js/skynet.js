function createDevice(){
  console.log("It Worked");
}

function addField(divName){
    var newDiv = document.createElement('div');
    newDiv.innerHTML = "<br><input type='text' name='keyInputs[]'>-<input type='text' name='valueInputs[]'>"
    document.getElementById(divName).appendChild(newDiv);
}
function createDevice(){
  console.log("It Worked");
}

function addField(divName){
    var newDiv = document.createElement('div');
    newDiv.innerHTML = "Key/Value Pair: <input type='text' name='keyInputs[]'>-<input type='text' name='valueInputs[]'>"
    document.getElementById(divName).appendChild(newDiv);
}
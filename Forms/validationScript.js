
let inputfield = document.getElementById("inputField");
let myForm = document.getElementById("myForm");
const paragraph = document.createElement("p");
myForm.appendChild(paragraph);

myForm.addEventListener("submit", function(event) {
  
  formAnswer = inputField.value;

  paragraph.textContent = "";
  const re = /^[A-Za-z0-9]*$/

  if (re.test(formAnswer) == false) {
    paragraph.textContent = "Error! Input text must be Alphanumeric!";
    event.preventDefault();
  } 
  else {
    document.write("Form Submitted!");

  }

})


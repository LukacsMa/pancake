function checkEmail(e) {
    let email = document.querySelector("#email").value;
    if (!email.includes(".") || !email.includes("@") || !email.endsWith("mese")) {
        alert("Adjon meg valós e-mail címet! Az e-mail címnek 'mese'-vel kell végződnie!");
        e.preventDefault();
    } 
}


function checkPassword(e) {
    let password = document.querySelector("#passwor").value;
    let pattern = /[A-Z][a-z][0-9]/g;
    
    if(password.length < 8 ){
        
    }
}


let submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click", checkEmail);

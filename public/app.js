function showPassword() {

    let password = document.getElementById('password');
    if( password.type === "password"){
        password.type = "text";
    }
    else {
        password.type = "password";
    }

}

function showCFPassword() {

    let cf_password = document.getElementById('cf-password');
    if( cf_password.type === "password"){
        cf_password.type = "text";
    }
    else {
        cf_password.type = "password";
    }
}

function checkPassword() {

    let password = document.getElementById('password');
    let cf_password = document.getElementById('cf-password');

    if(cf_password.value == ""){
        document.getElementById('message').innerHTML = "";
    }
    else{
        if(password.value == cf_password.value){
            document.getElementById('message').innerHTML = "Matching !";
            document.getElementById('message').style.color = "green";
        }
        else {
            document.getElementById('message').innerHTML = "Not Match";
            document.getElementById('message').style.color = "red";
        }
    }
    

}
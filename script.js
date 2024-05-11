/*Code by Soleman Hossain 2021682042*/

let register_btn = document.querySelector(".Register-btn");
let login_btn = document.querySelector(".Login-btn");
let form = document.querySelector(".Form-box");
register_btn.addEventListener("click", () => {
  form.classList.add("change-form");
});
login_btn.addEventListener("click", () => {
  form.classList.remove("change-form");
});







/*Code by Abrar Ur Alam 2211447042*/

function validateUsername(username){
  /*starts with a letter, no whitespaces, and at least 5 characters long */
  const usernamePattern = /^[a-zA-Z][^\s]{4,}$/
  return String(username).match(usernamePattern);
}

function validateEmail(email){
  /*email pattern as shown in lab class*/
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return String(email).toLowerCase().match(emailPattern);
};

function validatePassword(password){

  if(password.length < 5)
    return false;
  
  let symbol_used = false;
  let number_used = false;

  for(let char of password){
    let ascii_char_number = char.charCodeAt(0);
    /*console.log(char + "=" + ascii_char_number);*/

    if(char.match(/\s/))
      return false;

    else if(ascii_char_number >= 48 && ascii_char_number <= 57){
      number_used = true;
    }

    else if(
      (ascii_char_number >= 33 && ascii_char_number <= 47) ||
      (ascii_char_number >= 58 && ascii_char_number <= 64) ||
      (ascii_char_number >= 91 && ascii_char_number <= 96) ||
      (ascii_char_number >= 123 && ascii_char_number <= 126)){
      symbol_used = true;
    }
  }

  return (number_used && symbol_used);
}

function register() {
  const username = document.getElementById("register_username_field").value;
  const email = document.getElementById("register_email_field").value;
  const password = document.getElementById("register_password_field").value;
  const agreed_to_terms = document.getElementById("register-checkbox").checked;


  if(!validateUsername(username)){
    alert("Invalid username, it should:\n- start with a letter\n- have no whitespaces\n- be at least 5 characters long")
    return;
  }

  if (!validateEmail(email)){
      alert("Invalid email");
      return;
  }

  if (!validatePassword(password)){
    alert("Invalid password it should have:\n- atleast 5 characters total\n- atleast 1 special character\n- atleast 1 number\n- no whitespace.")
    return;
  }

  if(!agreed_to_terms){
    alert("Please agree to the Terms & Conditions to proceed.")
    return;
  }

  
  let data = {
    username: username,
    email: email,
    password: password,
  };
  console.log("data", data);

  fetch("http://localhost:3000/add-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res);
      if (res.result) {
        alert("User registered successfully");
        location.href = "http://localhost:5500/";
      } else {
        alert("User not registered: " + res.error.sqlMessage);
      }
    });
}

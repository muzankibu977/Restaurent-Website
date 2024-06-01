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


// DRY code
function hide_element(element_id){
  document.getElementById(element_id).setAttribute("hidden", "true");
}
function unhide_element(element_id){
  document.getElementById(element_id).removeAttribute("hidden");
}
function highlight_field(field_id, is_correct){
      document.getElementById(field_id).setAttribute("class", (is_correct ? "" : "error"));
}


function validate_login(){

    // the commented-out code line just below this comment is not suitable for validation though it is more efficient, because all of the functions will not execute after the first false is returned
    // let valid_submission = check_email() && check_password();
    // suitable method:
    let valid_email = check_email("login_email_field","login_email_prompt");
    let valid_password = check_password("login_password_field","login_password_prompt");

    let valid_submission = valid_email && valid_password;

    if(valid_submission){    
        //accept the input field values
        let login_data = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
        console.log("data", login_data);

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login_data),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("res:", res.result);
                if (res.result && res.result.length > 0) {
                    // saving the logged profile info in browser under the key named "profile" to retrive it in the profile page
                    localStorage.setItem("profile", JSON.stringify(res.result[0]));
                    alert("Logging in");
                } else {
                    alert("Login failed: Invalid email or password");
                }
            });
    }else{
        return false;
    }
}



// input validation function
function validate_registration(){
  // the commented-out code line just below this comment is not suitable for validation though it is more efficient, because all of the functions will not execute after the first false is returned
  // let valid_submission = check_first_name() && check_last_name() && check_gender() && check_dob() && check_email() && check_password() && check_retyped_password();
  // suitable method:
  let valid_username = check_username();
  let valid_email = check_email("register_email_field","register_email_prompt");
  let valid_password = check_password("register_password_field","register_password_prompt");
  let valid_retyped_password = check_retyped_password();
  let valid_submission = valid_username && valid_email && valid_password && valid_retyped_password;
  
  if(valid_submission){
      //accept the input field values
      let profile_data = {
          username: document.getElementById("register_username_field").value,
          email: document.getElementById("register_email_field").value,
          password: document.getElementById("register_password_field").value,
      };
      console.log("data", profile_data);

      fetch("http://localhost:3000/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile_data),
      })
          .then((res) => res.json())
          .then((res) => {
          console.log("res", res);
          if (res.result) {
              let form = document.querySelector(".Form-box");
              form.classList.remove("change-form");
              alert("Profile registered successfully");
          } else {
              alert("Profile not registered: " + res.error.sqlMessage);
          }
          });
  }else{
      return false;
  }
}



function check_username(){
  let username = document.getElementById("register_username_field").value;
  console.log("first name = " + username);

  let prompt = document.getElementById("register_username_prompt");
  if(username == ""){
      prompt.innerHTML = "This field must be filled";
  }
  else if(username.match(/^.*\s.*$/)){
      prompt.innerHTML = "Usernames cannot have whitespaces in them";
  }
  else{
      hide_element(prompt.id);
      highlight_field("register_username_field", true);
      return true;
  }
  unhide_element(prompt.id);
  highlight_field("register_username_field", false);
  return false;
}



function check_email(field_id, prompt_id){
  let email = document.getElementById(field_id).value;

  let prompt = document.getElementById(prompt_id);
  if(email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      hide_element(prompt.id);
      highlight_field(field_id, true);
      return true;
  }
  else if(email == ""){
      prompt.innerHTML = "This field must be filled";
  }
  else{
      prompt.innerHTML = "Invalid email address"
  }
  unhide_element(prompt.id)
  highlight_field(field_id, false);
  return false;
}



function check_password(field_id, prompt_id){
  let password = document.getElementById(field_id).value;

  let prompt = document.getElementById(prompt_id);
  prompt.innerHTML = ""; // clear up the innerHTML so that previous prompts are reset
  if(password == ""){
      unhide_element(prompt.id);
      highlight_field(field_id, false);
      prompt.innerHTML = "This field must be filled";
      return false;
  }
  
  
  let min_length_fulfilled = (password.length >= 5);
  let symbol_used = false;
  let number_used = false;
  let no_whitepaces = true;

  for(let char of password){
      let ascii_char_number = char.charCodeAt(0);
      if(char.match(/\s/)){ // checks for whitespace (password cannot have spaces)
          no_whitepaces = false;
      }
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

  if(!min_length_fulfilled){
      prompt.innerHTML += "Password length must be at least 5\n";
  }
  if(!no_whitepaces){
      prompt.innerHTML += "Password cannot have whitespaces\n";
  }
  if(!symbol_used){
      prompt.innerHTML += "Password must have at least one symbol\n";
  }
  if(!number_used){
      prompt.innerHTML += "Password must have at least one number\n";
  }

  if (min_length_fulfilled && no_whitepaces && symbol_used && number_used){
      hide_element(prompt.id);
      highlight_field(field_id, true);
      return true;
  }
  else{
      unhide_element(prompt.id);
      highlight_field(field_id, false);
      return false;
  }
}

function check_retyped_password(){
  let retyped_password = document.getElementById("register_retype_password_field").value;
  let password = document.getElementById("register_password_field").value;

  let prompt = document.getElementById("register_retype_password_prompt");
  if(retyped_password == ""){
      prompt.innerHTML = "This field must be filled";
  }
  else if(retyped_password != password){
      prompt.innerHTML = "Retyped password did not match set password"
  }
  else{
      hide_element(prompt.id);
      highlight_field("register_retype_password_field", true);
      return true;
  }
  unhide_element(prompt.id);
  highlight_field("register_retype_password_field", false);
  return false;
}
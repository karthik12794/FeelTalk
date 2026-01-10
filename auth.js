/* -------- MOBILE MUSIC START -------- */
document.body.addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  if(music){
    music.play().catch(()=>{});
  }
}, { once: true });

/* -------- LOGIN -------- */
function login(){
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  const savedUser = JSON.parse(localStorage.getItem("feeltalkUser"));

  if(savedUser && user === savedUser.username && pass === savedUser.password){
    localStorage.setItem("feeltalkLoggedIn", "true");
    window.location.href = "locker.html";
  } else {
    alert("Invalid username or password");
  }
}

/* -------- SIGNUP -------- */
function signup(){
  const username = document.getElementById("su_username").value.trim();
  const password = document.getElementById("su_password").value.trim();
  const confirm  = document.getElementById("su_confirm").value.trim();

  if(!username || !password || !confirm){
    alert("Please fill all fields");
    return;
  }

  if(password !== confirm){
    alert("Passwords do not match");
    return;
  }

  const userData = {
    username: username,
    password: password,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("feeltalkUser", JSON.stringify(userData));
  alert("Account created successfully");
  window.location.href = "index.html";
}

/* -------- NAVIGATION -------- */
function goToLogin(){
  window.location.href = "index.html";
}

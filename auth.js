/* -------- MUSIC (Mobile Safe) -------- */
document.body.addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  if (music) music.play();
}, { once: true });

/* -------- LOGIN -------- */
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const savedUser = JSON.parse(localStorage.getItem("feeltalkUser"));

  if (savedUser && user === savedUser.username && pass === savedUser.password) {
    localStorage.setItem("feeltalkLoggedIn", "true");
    window.location.href = "locker.html";
  } else {
    alert("Invalid username or password");
  }
}

/* -------- SIGNUP -------- */
function signup() {
  const username = document.getElementById("su_username").value;
  const password = document.getElementById("su_password").value;
  const confirm  = document.getElementById("su_confirm").value;

  if (!username || !password || !confirm) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirm) {
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
function goToLogin() {
  window.location.href = "index.html";
}

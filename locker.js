const video = document.getElementById("lockerVideo");
const image = document.getElementById("lockerImage");
const pinBox = document.getElementById("pinBox");

// After video ends → show locker image + PIN box
video.onended = () => {
  video.style.display = "none";
  image.style.display = "block";
  pinBox.style.display = "flex";
};

// If page refreshed and video already loaded
if (video.readyState >= 3) {
  setTimeout(() => {
    video.style.display = "none";
    image.style.display = "block";
    pinBox.style.display = "flex";
  }, 1000);
}

/* ---------- PIN CHECK ---------- */
function checkPin() {
  const enteredPin = document.getElementById("pinInput").value;
  const savedPin = localStorage.getItem("feeltalkPin");

  if (enteredPin === savedPin) {
    window.location.href = "diary-entry.html";
  } else {
    alert("Wrong PIN");
  }
}

/* ---------- CREATE / CHANGE PIN ---------- */
function createPin() {
  const existingPin = localStorage.getItem("feeltalkPin");

  if (existingPin) {
    const oldPin = prompt("Enter old PIN");
    if (oldPin !== existingPin) {
      alert("Old PIN incorrect");
      return;
    }
  }

  const newPin = prompt("Create new 4-digit PIN");
  if (newPin && newPin.length === 4) {
    localStorage.setItem("feeltalkPin", newPin);

    const food = prompt("Security Q1: Your favorite food?");
    const person = prompt("Security Q2: Favorite person?");
    const place = prompt("Security Q3: Favorite place?");

    localStorage.setItem("secQ", JSON.stringify({ food, person, place }));
    alert("PIN saved successfully");
  } else {
    alert("PIN must be 4 digits");
  }
}

/* ---------- RESET PIN ---------- */
function resetPin() {
  const sec = JSON.parse(localStorage.getItem("secQ"));
  if (!sec) {
    alert("Security questions not set");
    return;
  }

  const food = prompt("Favorite food?");
  const person = prompt("Favorite person?");
  const place = prompt("Favorite place?");

  if (food === sec.food && person === sec.person && place === sec.place) {
    const newPin = prompt("Enter new 4-digit PIN");
    if (newPin && newPin.length === 4) {
      localStorage.setItem("feeltalkPin", newPin);
      alert("PIN reset successful");
    }
  } else {
    alert("Security answers incorrect");
  }
}

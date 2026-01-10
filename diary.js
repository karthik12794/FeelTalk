/* ========================== */
/*   ENTER DIARY / BOOK VIDEO */
/* ========================== */

const entryBox = document.getElementById("entryBox");
const bookVideo = document.getElementById("bookVideo");

function openDiary() {
  if(entryBox) entryBox.style.display = "none"; // hide entry box
  if(bookVideo){
    bookVideo.style.display = "block";          // show video
    bookVideo.play();

    // After video ends → go to diary page
    bookVideo.onended = () => {
      window.location.href = "diary.html";
    };
  }
}

/* ========================== */
/*        WALLET & PAGES      */
/* ========================== */
let wallet = Number(localStorage.getItem("wallet")) || 0;
let usedPages = Number(localStorage.getItem("usedPages")) || 0;
let totalPages = Number(localStorage.getItem("totalPages")) || 150;
let subscription = JSON.parse(localStorage.getItem("subscription")) || null;

function loadWalletAndPages() {
  const wb = document.getElementById("walletBalance");
  const up = document.getElementById("usedPages");
  const tp = document.getElementById("totalPages");

  if (wb) wb.innerText = wallet;
  if (up) up.innerText = usedPages;
  if (tp) tp.innerText = totalPages;
}

loadWalletAndPages();

/* ========================== */
/*        TAB SWITCH          */
/* ========================== */
function showHome() {
  document.getElementById("homeSection").style.display = "block";
  document.getElementById("settingsSection").style.display = "none";
}

function showSettings() {
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("settingsSection").style.display = "block";
}

/* ========================== */
/*      DATE & DAY             */
/* ========================== */
const now = new Date();
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

if(document.getElementById("dayText")) 
  document.getElementById("dayText").innerText = days[now.getDay()];
if(document.getElementById("dateText")) 
  document.getElementById("dateText").innerText = now.toDateString();

/* ========================== */
/*      WORD COUNTER           */
/* ========================== */
const textarea = document.getElementById("diaryText");
const counter = document.getElementById("wordCount");

if(textarea){
  textarea.addEventListener("input", () => {
    const words = textarea.value.trim().split(/\s+/).filter(Boolean);
    counter.innerText = words.length;
  });
}

/* ========================== */
/*      YOUTUBE PLAYER         */
/* ========================== */
function playYT() {
  const link = document.getElementById("ytLink").value;
  if (!link) return;

  let videoId = "";
  if (link.includes("v=")) {
    videoId = link.split("v=")[1].substring(0, 11);
  }

  if (!videoId) {
    alert("Invalid YouTube link");
    return;
  }

  document.getElementById("ytPlayer").innerHTML = `
    <iframe 
      width="100%" 
      height="200"
      src="https://www.youtube.com/embed/${videoId}" 
      frameborder="0" 
      allowfullscreen>
    </iframe>`;
}

/* ========================== */
/*      SAVE DIARY PAGE        */
/* ========================== */
function saveDiary() {

  if (usedPages >= totalPages) {
    alert("Page limit reached. Buy more pages.");
    return;
  }

  const text = textarea.value.trim();
  if (!text) {
    alert("Write something first");
    return;
  }

  const diary = JSON.parse(localStorage.getItem("feeltalkDiary")) || [];

  diary.push({
    date: new Date().toISOString(),
    day: days[new Date().getDay()],
    text: text
  });

  localStorage.setItem("feeltalkDiary", JSON.stringify(diary));

  usedPages++;
  localStorage.setItem("usedPages", usedPages);

  alert("Diary page saved 💙");

  textarea.value = "";
  counter.innerText = "0";

  loadWalletAndPages();
}

/* ========================== */
/*      WALLET FUNCTIONS       */
/* ========================== */
function addMoney() {
  const amount = Number(document.getElementById("addAmount").value);

  if (amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  wallet += amount;
  localStorage.setItem("wallet", wallet);

  alert("Payment Successful (Demo)");
  loadWalletAndPages();
}

/* ========================== */
/*      BUY PAGES              */
/* ========================== */
function buyPages(pages, cost) {
  if (wallet < cost) {
    alert("Insufficient wallet balance");
    return;
  }

  wallet -= cost;
  totalPages += pages;

  localStorage.setItem("wallet", wallet);
  localStorage.setItem("totalPages", totalPages);

  alert(pages + " pages added successfully");
  loadWalletAndPages();
}

/* ========================== */
/*      SUBSCRIPTION           */
/* ========================== */
function buySubscription(plan) {
  let subData;

  if (plan === 1) {
    if (wallet < 150) {
      alert("Not enough balance");
      return;
    }
    wallet -= 150;
    subData = { pages: 300, photos: 4, days: 30, start: Date.now() };
  } else {
    if (wallet < 200) {
      alert("Not enough balance");
      return;
    }
    wallet -= 200;
    subData = { pages: 500, photos: 6, days: 50, start: Date.now() };
  }

  subscription = subData;
  totalPages += subData.pages;

  localStorage.setItem("wallet", wallet);
  localStorage.setItem("subscription", JSON.stringify(subscription));
  localStorage.setItem("totalPages", totalPages);

  alert("Subscription Activated 🎉");
  loadWalletAndPages();
}

/* ========================== */
/*       STUDY MODE            */
/* ========================== */
function openStudyMode() {
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("settingsSection").style.display = "none";
  document.getElementById("studyMode").style.display = "block";

  const diary = JSON.parse(localStorage.getItem("feeltalkDiary")) || [];
  const container = document.getElementById("studyContent");
  container.innerHTML = "";

  if (diary.length === 0) {
    container.innerHTML = "<p>No diary pages yet.</p>";
    return;
  }

  diary.forEach(entry => {
    const div = document.createElement("div");
    div.className = "study-entry";
    div.innerHTML = `
      <h4>${new Date(entry.date).toDateString()}</h4>
      <p>${entry.text}</p>
    `;
    container.appendChild(div);
  });
}

function closeStudyMode() {
  document.getElementById("studyMode").style.display = "none";
  showHome();
}

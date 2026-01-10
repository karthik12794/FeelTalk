// ---------- WALLET & PAGES ----------
let wallet = Number(localStorage.getItem("wallet")) || 0;
let usedPages = Number(localStorage.getItem("usedPages")) || 0;
let totalPages = Number(localStorage.getItem("totalPages")) || 150;
let subscription = JSON.parse(localStorage.getItem("subscription")) || null;

// ---------- LOAD WALLET & PAGES ----------
function loadWalletAndPages() {
  document.getElementById("walletBalance").innerText = wallet;
  document.getElementById("usedPages").innerText = usedPages;
  document.getElementById("totalPages").innerText = totalPages;
}
loadWalletAndPages();

// ---------- TAB SWITCH ----------
document.querySelectorAll(".tab")[0].addEventListener("click", showHome);
document.querySelectorAll(".tab")[1].addEventListener("click", showSettings);

function showHome(){
  document.getElementById("homeSection").style.display = "block";
  document.getElementById("settingsSection").style.display = "none";
}

function showSettings(){
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("settingsSection").style.display = "block";
}

// ---------- DATE & DAY ----------
const now = new Date();
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
document.getElementById("dayText").innerText = days[now.getDay()];
document.getElementById("dateText").innerText = now.toDateString();

// ---------- WORD COUNTER ----------
const textarea = document.getElementById("diaryText");
const counter = document.getElementById("wordCount");
textarea.addEventListener("input", () => {
  const words = textarea.value.trim().split(/\s+/).filter(Boolean);
  counter.innerText = words.length;
});

// ---------- YOUTUBE ----------
document.querySelector(".yt-box button").addEventListener("click", playYT);
function playYT() {
  const link = document.getElementById("ytLink").value.trim();
  if (!link) return;

  let videoId = "";
  if(link.includes("v=")) videoId = link.split("v=")[1].substring(0,11);
  if(!videoId) { alert("Invalid YouTube link"); return; }

  document.getElementById("ytPlayer").innerHTML = `
    <iframe width="100%" height="200"
      src="https://www.youtube.com/embed/${videoId}" frameborder="0"
      allowfullscreen>
    </iframe>`;
}

// ---------- SAVE DIARY ----------
document.querySelector(".save-btn").addEventListener("click", saveDiary);
function saveDiary(){
  if(usedPages >= totalPages){ alert("Page limit reached"); return; }
  const text = textarea.value.trim();
  if(!text){ alert("Write something first"); return; }

  const diary = JSON.parse(localStorage.getItem("feeltalkDiary")) || [];
  diary.push({ date: new Date().toISOString(), day: days[new Date().getDay()], text });
  localStorage.setItem("feeltalkDiary", JSON.stringify(diary));

  usedPages++;
  localStorage.setItem("usedPages", usedPages);
  alert("Diary page saved 💙");
  textarea.value = ""; counter.innerText = "0";
  loadWalletAndPages();
}

// ---------- WALLET FUNCTIONS ----------
document.querySelector("#settingsSection button:nth-of-type(1)").addEventListener("click", addMoney);
function addMoney(){
  const amount = Number(document.getElementById("addAmount").value);
  if(amount <= 0){ alert("Enter valid amount"); return; }
  wallet += amount;
  localStorage.setItem("wallet", wallet);
  alert("Payment Successful");
  loadWalletAndPages();
}

// ---------- BUY PAGES ----------
document.querySelector("#settingsSection button:nth-of-type(2)").addEventListener("click", ()=>buyPages(80,20));
function buyPages(pages,cost){
  if(wallet < cost){ alert("Insufficient wallet"); return; }
  wallet -= cost; totalPages += pages;
  localStorage.setItem("wallet", wallet);
  localStorage.setItem("totalPages", totalPages);
  alert(pages+" pages added successfully");
  loadWalletAndPages();
}

// ---------- SUBSCRIPTION ----------
document.querySelector("#settingsSection button:nth-of-type(3)").addEventListener("click", ()=>buySubscription(1));
document.querySelector("#settingsSection button:nth-of-type(4)").addEventListener("click", ()=>buySubscription(2));
function buySubscription(plan){
  let subData;
  if(plan===1){
    if(wallet<150){ alert("Not enough balance"); return; }
    wallet-=150; subData={pages:300, photos:4, days:30, start:Date.now()};
  } else {
    if(wallet<200){ alert("Not enough balance"); return; }
    wallet-=200; subData={pages:500, photos:6, days:50, start:Date.now()};
  }
  subscription=subData; totalPages+=subData.pages;
  localStorage.setItem("wallet", wallet);
  localStorage.setItem("subscription", JSON.stringify(subscription));
  localStorage.setItem("totalPages", totalPages);
  alert("Subscription Activated 🎉");
  loadWalletAndPages();
}

// ---------- STUDY MODE ----------
document.querySelector("#settingsSection button:nth-of-type(5)").addEventListener("click", openStudyMode);
document.querySelector("#studyMode button").addEventListener("click", closeStudyMode);

function openStudyMode(){
  document.getElementById("homeSection").style.display="none";
  document.getElementById("settingsSection").style.display="none";
  document.getElementById("studyMode").style.display="block";

  const diary = JSON.parse(localStorage.getItem("feeltalkDiary")) || [];
  const container = document.getElementById("studyContent");
  container.innerHTML = "";
  if(diary.length===0){ container.innerHTML="<p>No diary pages yet.</p>"; return; }
  diary.forEach(entry=>{
    const div = document.createElement("div");
    div.className="study-entry";
    div.innerHTML=`<h4>${new Date(entry.date).toDateString()}</h4><p>${entry.text}</p>`;
    container.appendChild(div);
  });
}

function closeStudyMode(){
  document.getElementById("studyMode").style.display="none";
  showHome();
}


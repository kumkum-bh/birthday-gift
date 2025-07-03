let userName = "";
let clickedCount = 0;
let heartInterval;

// Get DOM elements
const heartContainer = document.getElementById('heart-container');
const mainContent = document.getElementById('main-content');
const bg = document.getElementById('bg');

// Start hearts
heartInterval = setInterval(() => createHeart('red'), 200);

// Heart animation function
function createHeart(color = 'red') {
  const span = document.createElement('span');
  span.className = 'heart';
  span.innerText = '❤';
  span.style.left = Math.random() * 100 + 'vw';
  span.style.color = color;
  span.style.animationDuration = 3 + Math.random() * 4 + 's';
  heartContainer.appendChild(span);
  setTimeout(() => span.remove(), 7000);
}

// Gift box click triggers the name prompt stage
document.getElementById('gift-box').addEventListener('click', promptNameStage);

// Stage 1: Ask for name and change theme
function promptNameStage() {
  clearInterval(heartInterval);
  //bg.style.background = '#330066'; // new theme color
  bg.style.backgroundImage = "url('bg4.jpg')";  // replace with your image filename
  bg.style.backgroundSize = "cover";
  bg.style.backgroundPosition = "center";
  bg.style.backgroundRepeat = "no-repeat";

  document.body.style.color = '#111'; // or add 'dark-text' class

  heartInterval = setInterval(() => createHeart('red'), 200);

  //   userName = prompt("🎂Enter your name");
  //   if (userName) showCard(userName);
  // Show custom modal
  document.getElementById('nameModal').style.display = 'flex';

  // Handle submit
  document.getElementById('submitName').onclick = () => {
    const nameInput = document.getElementById('nameInput');
    userName = nameInput.value.trim();
    if (userName) {
      document.getElementById('nameModal').style.display = 'none';
      showCard(userName);
    } else {
      nameInput.placeholder = "Please enter your name! 😅";
    }
  };

}

// Stage 2: Show card
function showCard(name) {
  mainContent.innerHTML = `
    <div class="card">
      <img src="toy.gif3.gif" class="toy-animated" alt="Animated toy">
      <h1>Hi, ${name}!👋</h1>
      <p>I have something for you...🎁</p>
      <button id="to1">Click to continue 👉</button>
    </div>`;
  document.getElementById('to1').addEventListener('click', heartsGameStage);
}

// Stage 3: Hearts game
function heartsGameStage() {
  clickedCount = 0;
  mainContent.innerHTML = `
    <div class="game">
      <h2>Click the hearts one by one! ❤️</h2>
      <div class="hearts">
        ${[...Array(4)].map((_, i) =>
          `<span class="heart-game" data-id="${i}">💛</span>`).join('')}
      </div>
    </div>`;

  document.querySelectorAll('.heart-game').forEach(h => {
    h.addEventListener('click', onHeartClick);
  });
}

// Heart clicks
function onHeartClick(e) {
  const h = e.target;
  h.style.opacity = 0.3;
  h.style.pointerEvents = 'none';
  clickedCount++;
  if (clickedCount === 4) {
    setTimeout(showBirthdayMessages, 1000); // 1 second
  }
}

// Stage 4: Show messages
function showBirthdayMessages() {
  const msgs = [
    "🎈Someone has a birthday today!",
    `🎉Happy Birthdayy... ${userName}`,
    "😜You're getting older, hehe ><",
    "🎂Hope you have a long life so you can treat me every year!",
    "Just Kidding!😂 You're awesome!"
  ];
  let idx = 0;

  mainContent.innerHTML = `<div class="messages"></div>`;
  const container = document.querySelector('.messages');

  function nextMsg() {
    if (idx < msgs.length) {
      const p = document.createElement('p');
      p.innerText = msgs[idx++];
      container.appendChild(p);
      setTimeout(nextMsg, 1000); // 1 second delay
    } else {
      const btn = document.createElement('button');
      btn.innerText = 'Continue 🎬';
      btn.onclick = giftOfferStage;
      container.appendChild(btn);
    }
  }

  nextMsg();
}

// Stage 5: Gift offer
function giftOfferStage() {
  mainContent.innerHTML = `
    <div class="offer">
       <img src="toy.gif1.gif" class="toy-animated" alt="Animated toy">
      <p>${userName}, do you want a gift? 🎁<br>❤ Come on... take it!💝</p>
      <button id="yes">Dedoo 😍</button>
      <button id="no">Nahi Chahiye 🙅‍♂️</button>
    </div>`;

  document.getElementById('yes').onclick = afterOffer;
  document.getElementById('no').onclick = afterOffer;
}

function afterOffer() {
  mainContent.innerHTML = `
    <img src="toy.gif2.gif" class="toy-animated" alt="Animated toy">
    <p>🍕 Pehle Party dey... 🍰</p>`;
  setTimeout(() => {
    mainContent.innerHTML = `
      <img src="toy.gif4.gif" class="toy-animated" alt="Animated toy">
      <p>🎂 Happy Birthday... ${userName}<br>You’re officially a better person today! 🎉</p>`;
  }, 2000); // 1 second
}


// flower collection: switch flowers, bloom/reset, and add little magical touches.
const flowerButtons = document.querySelectorAll(".nav-option");
const flowers = document.querySelectorAll(".flower-art");
const flowerWrap = document.getElementById("flowerWrap");
const flowerName = document.getElementById("flowerName");
const bloomBtn = document.getElementById("bloomBtn");
const resetBtn = document.getElementById("resetBtn");

const names = {
  carnation: "The Carnation",
  sunflower: "The Sunflower",
  tulip: "The Tulip"
};

let currentFlower = "carnation";
let switchTimer;

function showFlower(name) {
  if (name === currentFlower) return;

  clearTimeout(switchTimer);
  const current = document.getElementById(currentFlower);
  const next = document.getElementById(name);

  current.classList.add("switching-out");
  flowerButtons.forEach(button => {
    const selected = button.dataset.flower === name;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  switchTimer = setTimeout(() => {
    current.classList.add("hidden");
    current.classList.remove("switching-out", "opened");
    next.classList.remove("hidden");
    next.classList.add("switching-in");
    currentFlower = name;
    flowerName.textContent = names[name];
    setTimeout(() => next.classList.remove("switching-in"), 600);
  }, 220);
}

flowerButtons.forEach(button => {
  button.addEventListener("click", () => showFlower(button.dataset.flower));
});

bloomBtn.addEventListener("click", () => {
  document.getElementById(currentFlower).classList.add("opened");
  makeMagic("✦");
});

resetBtn.addEventListener("click", () => {
  flowers.forEach(flower => flower.classList.remove("opened"));
  makeMagic("✧");
});

// clicking the flower creates a small sparkle and a floating heart.
flowerWrap.addEventListener("click", event => {
  const rect = flowerWrap.getBoundingClientRect();
  const x = event.clientX || rect.left + rect.width / 2;
  const y = event.clientY || rect.top + rect.height / 2;
  makeMagic(Math.random() > 0.5 ? "✧" : "♡", x, y);
});

function makeMagic(symbol, x, y) {
  const rect = flowerWrap.getBoundingClientRect();
  const sparkle = document.createElement("span");
  sparkle.className = symbol === "♡" ? "heart" : "sparkle";
  sparkle.textContent = symbol;
  sparkle.style.left = `${(x ?? rect.left + rect.width / 2) - rect.left}px`;
  sparkle.style.top = `${(y ?? rect.top + rect.height / 2) - rect.top}px`;
  flowerWrap.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1400);
}

// a few softly drifting petals in the background.
const petalDrift = document.getElementById("petalDrift");
const petalSymbols = ["✿", "❀", "·", "✧"];

function createDriftingPetal() {
  const petal = document.createElement("span");
  petal.className = "drift-petal";
  petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${12 + Math.random() * 12}s`;
  petal.style.fontSize = `${10 + Math.random() * 12}px`;
  petalDrift.appendChild(petal);
  setTimeout(() => petal.remove(), 25000);
}

for (let i = 0; i < 7; i++) {
  setTimeout(createDriftingPetal, i * 850);
}
setInterval(createDriftingPetal, 2300);

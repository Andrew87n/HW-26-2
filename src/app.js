import { success, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

defaultModules.set(PNotifyMobile, {});

const keys = ["a", "s", "d", "f", "j", "k", "l", "q", "w", "e"];

let currentKeyIndex = 0;

const keyEl = document.getElementById("key");
const newGameBtn = document.getElementById("new-game");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}

function setCurrentKey() {
  keyEl.textContent = keys[currentKeyIndex];
}

shuffle(keys);
setCurrentKey();

document.addEventListener("keydown", event => {
  const pressedKey = event.key.toLowerCase();
  const correctKey = keys[currentKeyIndex];

  if (pressedKey === correctKey) {
    success({
      text: "Правильно!",
      delay: 1000,
    });

    currentKeyIndex += 1;

    if (currentKeyIndex === keys.length) {
      success({
        text: "Вітаємо! Ви виграли гру!",
      });
      currentKeyIndex = 0;
    }

    setCurrentKey();
  } else {
    error({
      text: `Помилка! Очікувалась клавіша "${correctKey}"`,
      delay: 1500,
    });
  }
});

document.addEventListener("keypress", event => {
  event.preventDefault();
});

newGameBtn.addEventListener("click", () => {
shuffle(keys);
currentKeyIndex = 0;
setCurrentKey();

  success({
    text: "Нова гра розпочата!",
    delay: 1200,
  });
});


const chartData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
           "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
           "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
  datasets: [
    {
      label: "Продажі за останній місяць",
      data: [150, 220, 180, 200, 250, 300, 280, 350, 400, 380,
             420, 450, 500, 550, 600, 650, 700, 750, 800, 850,
             900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350],
      backgroundColor: "rgba(33, 150, 243, 0.2)",
      borderColor: "#2196f3",
      borderWidth: 2,
      tension: 0.4
    },
  ],
};

const ctx = document.getElementById("sales-chart");

const salesChart = new Chart(ctx, {
  type: "line",
  data: chartData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
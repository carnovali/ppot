let resultArray = [];
let result = 0;
let realBalance = 5.0;

const root = document.querySelector(":root");
const displayBalance = document.querySelector("#balance");
const displayBalanceUpdate = () => {
  return (displayBalance.innerHTML = realBalance.toFixed(2));
};

const popupButton = document.querySelector("#open-popup");
const popupAddCash = document.querySelector("#popup-addcash-wrapper");
const sumAmmountButton = document.querySelector("#sum-ammount-button");

popupButton.addEventListener("click", () => {
  popupAddCash.style.display = "block";
});

sumAmmountButton.addEventListener("click", () => {
  popupAddCash.style.display = "none";
});

const sumAmount = () => {
  const select = document.querySelector("#amount");
  const userAmountValue = parseInt(
    document.querySelector("#amount").options[select.selectedIndex].value
  );
  const sumAmountFunction = () => {
    return (realBalance += userAmountValue);
  };
  sumAmountFunction();
  displayBalanceUpdate();
};

let realBetVolume = 0.5;
const displayBetVolume = document.querySelector("#bet");
const displayBetVolumeUpdate = () => {
  return (displayBetVolume.innerHTML = realBetVolume.toFixed(2));
};
const increaseBet = (sum) => {
  realBetVolume = Math.max(Math.min(realBetVolume + sum, 25), 0.5);
  return displayBetVolumeUpdate();
};
const decreaseBet = (sum) => {
  realBetVolume = Math.max(realBetVolume - sum, 0.5);
  return displayBetVolumeUpdate();
};

const tieColor = "#c8c8c8";
const winColor = "#cbb36d";
const losColor = "#e27d63";

const changeResponseColor = (color) => {
  root.style.setProperty("--responsecolor", color);
};

const finalGains = document.querySelector("#result-amount");
const finalGainsUpdate = (result) => {
  finalGains.innerHTML = `${result}$${realBetVolume.toFixed(2)}`;
};
const select = document.querySelector("#answers");
let userChoice = "piedra";
const responseTextArea = document.querySelector("#response");
const finalResponseTextArea = document.querySelector("#final-response");
const userChoiceUpdate = () => {
  userChoice =
    document.querySelector("#answers").options[select.selectedIndex].value;
};

const aiChoiceNumberFunction = () => {
  const aiChoiceNumber = Math.floor(Math.random() * 3);
  switch (aiChoiceNumber) {
    case 0:
      aiChoice = "piedra";
      break;
    case 1:
      aiChoice = "papel";
      break;
    case 2:
      aiChoice = "tijera";
      break;
  }
};

const gameChooseWinnerFunction = () => {
  const responseResult = (resultNumber) => {
    result = resultNumber;
    resultArray.push(resultNumber);
  };
  if (
    (userChoice === "piedra" && aiChoice === "tijera") ||
    (userChoice === "papel" && aiChoice === "piedra") ||
    (userChoice === "tijera" && aiChoice === "papel")
  ) {
    responseResult(3);
  } else if (userChoice === aiChoice) {
    responseResult(2);
  } else {
    responseResult(1);
  }
};

const displayClassicResponse = () => {
  const displayResponse = () => {
    responseTextArea.innerHTML = `Elegiste <b>${userChoice}</b>, yo elegi <b>${aiChoice}</b> </br>`;
  };
  const displayFinalResponse = (FinalResponse) => {
    finalResponseTextArea.innerHTML = `<span>${FinalResponse}</span>`;
  };
  switch (result) {
    case 3:
      displayResponse();
      displayFinalResponse("GANASTE!");
      changeResponseColor(winColor);
      finalGainsUpdate("+");
      break;
    case 2:
      displayResponse();
      displayFinalResponse("EMPATAMO");
      changeResponseColor(tieColor);
      finalGains.innerHTML = "";
      break;
    case 1:
      displayResponse();
      displayFinalResponse("PERDISTE!");
      changeResponseColor(losColor);
      finalGainsUpdate("-");
      break;
  }
};

const gameClassicFunction = () => {
  aiChoiceNumberFunction();
  userChoiceUpdate();
  gameChooseWinnerFunction();
  displayClassicResponse();
};

let resPositivos = 0;
let resNegativos = 0;
let resEmpatados = 0;
const displayResPositivos = document.querySelector("#res-positivos");
const displayResNegativos = document.querySelector("#res-negativos");

const resultsFunction = () => {
  if (result === 3) {
    resPositivos += 1;
  } else if (result === 1) {
    resNegativos += 1;
  } else {
    resEmpatados += 1;
  }
};

const displayResultsFunction = () => {
  resultsFunction();
  displayResPositivos.innerHTML = resPositivos;
  displayResNegativos.innerHTML = resNegativos;
};

const bet = () => {
  const betFunction = (multiplier) => {
    realBalance += realBetVolume * multiplier;
    displayBalanceUpdate();
  };
  if (result === 3) {
    betFunction(1);
  } else if (result === 1) {
    betFunction(-1);
  } else {
    betFunction(-0.05);
  }
};

const betConfirmation = function () {
  if (realBetVolume <= realBalance) {
    gameClassicFunction();
    displayResultsFunction();
    bet();
  } else if (realBetVolume >= realBalance && realBalance >= 0.5) {
    responseTextArea.innerHTML = "BAJA LA APUESTA";
  } else {
    responseTextArea.innerHTML = "NO TENES MAS PLATA :P";
  }
};

const clearResultArray = () => {
  if (resultArray.length === 10) {
    resultArray.length = 0;
  }
};

function exejuego() {
  clearResultArray();
  betConfirmation();
  console.log(userChoice);
  console.log(result);
  console.log(resultArray);
}

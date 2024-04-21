document.addEventListener("DOMContentLoaded", main());

function main() {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const value = event.target.innerText;

      switch (value) {
        case "C":
          display.innerHTML = "";
          break;
        case "DEL":
          display.innerHTML = display.innerHTML.slice(0, -1);
          break;
        case "=":
          try {
            const result = calculate(display.innerText);
            display.innerText = result;
          } catch (error) {
            display.innerText = "Error";
            console.error(error);
          }
          break;
        case "+":
        case "-":
        case "X":
        case "/":
          display.innerHTML += `&nbsp;${value}&nbsp;`;
          break;
        case ".":
          if (!display.innerText.includes(".")) {
            display.innerText += value;
          }
        default:
          console.log('display.innerText', display.innerText);
          if (display.innerText === "Error") {
            display.innerText = value;
          } else {
            display.innerText += value;
          }
          break;
      }
    });
  });
}

function calculate(expression) {
  const tokens = expression.split(/\s/).filter((token) => token);
  const stack = [];
  const operators = ["+", "-", "X", "/"];

  let operand1, operand2, operator;
  for (let operator of operators) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === operator) {

        let value = 0;
        switch (tokens[i]) {
          case '+':
            value = parseFloat(tokens[i - 1]) + parseFloat(tokens[i + 1]);
            break;
          case '-':
            value = parseFloat(tokens[i - 1]) - parseFloat(tokens[i + 1]);
            break;
          case 'X':
            value = parseFloat(tokens[i - 1]) * parseFloat(tokens[i + 1]);
            break;
          case '/':
            value = parseFloat(tokens[i - 1]) / parseFloat(tokens[i + 1]);
            break;

          default:
            break;
        }
        tokens.splice(i - 1, 3, value);
        console.log('tokens', tokens);
        i--;
      }
    }
  }

  return tokens[0];

}

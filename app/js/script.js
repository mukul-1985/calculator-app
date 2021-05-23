let theme = localStorage.getItem('theme')

if (theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelector(`input[type="radio"][value="${theme}"]`).checked = true
} else {
  document.documentElement.setAttribute('data-theme', 'theme-1')
  localStorage.setItem('theme', 'theme-1')
  document.querySelector('input[type="radio"][value="theme-1"]').checked = true
}

function changeTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

const buttons = document.querySelectorAll('button')
const display = document.getElementById('display')
let operator = ''
let result = 0
let operand = 0
let operand2 = 0
let isSecondOperand = false

buttons.forEach((button) => {
  button.addEventListener('click', calculate)
})

function calculate(event) {
  const clickedButton = event.target.value

  if (clickedButton === '=') {
    result = calc()
    operand = result
    display.textContent = result
    isSecondOperand = false
  } else if (['+','-','*','/'].includes(clickedButton)) {
    operator = clickedButton
    if (!isSecondOperand) {
      isSecondOperand = true
      operand2 = 0
    } else if (!(operand2 === '0')) {
      operand = calc()
      isSecondOperand = true
      operand2 = 0
    }
  } else if (event.target.className === 'keypad__reset') {
    operator = ''
    result = 0
    operand = 0
    operand2 = 0
    display.textContent = 0
    isSecondOperand = false
  } else if (event.target.className === 'keypad__del') {
    display.textContent = display.textContent.substr(0, display.textContent.length - 1)
    display.textContent = display.textContent === '' ? 0 : display.textContent
  } else {
    display.textContent = display.textContent === '0' || isSecondOperand ? clickedButton : display.textContent + clickedButton
    if (!isSecondOperand)
    operand = display.textContent
    else operand2 = display.textContent
  }
}

function calc() {
  return eval(`${operand}${operator}${operand2}`)
}
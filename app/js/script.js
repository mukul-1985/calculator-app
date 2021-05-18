let theme = localStorage.getItem('theme')
let themeMap = new Map()
themeMap.set('theme-1', '1')
themeMap.set('theme-2', '2')
themeMap.set('theme-3', '3')

if (theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelector('input[type="range"]').value = themeMap.get(theme)
} else {
  document.documentElement.setAttribute('data-theme', 'theme-1')
  localStorage.setItem('theme', 'theme-1')
}

function changeTheme(theme) {
  if (theme === '1') {
    document.documentElement.setAttribute('data-theme', 'theme-1')
    localStorage.setItem('theme', 'theme-1')
  } else if (theme === '2') {
    document.documentElement.setAttribute('data-theme', 'theme-2')
    localStorage.setItem('theme', 'theme-2')
  } else if (theme === '3') {
    document.documentElement.setAttribute('data-theme', 'theme-3')
    localStorage.setItem('theme', 'theme-3')
  }
}

let result = 0
let display = 0
let dc = document.getElementById('display')
let operation = ''

function calcNumbers(num) {
  if (dc.innerHTML === '0') {
    display = num
  } else {
    display += num
  }
  
  dc.innerHTML = display
}

function ops(ops) {
  switch(operation) {
    case '+':
      result = Number(result) + Number(display)
      break
    case '-':
      result = Number(result) - Number(display)
      break
    case '/':
      result = Number(result) / Number(display)
      break
    case '*':
      result = Number(result) * Number(display)
      break
    default:
      result = Number(display)
  }
  operation = ops
  dc.innerHTML = 0
}

function calcDelete() {
  display = display.substr(0, display.length - 1);
  dc.innerHTML = display === '' ? 0 : display
}

function calcReset() {
  result = 0
  display = 0
  dc.innerHTML = 0
  operation = ''
}

function done() {
  ops(operation)
  dc.innerHTML = result
}
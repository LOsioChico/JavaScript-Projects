const container = document.querySelector('.container')
const button = document.querySelector('.refresh-button')

const palletteBoxes = 21

let refreshPalette = () => {
  container.innerHTML = ''
  for (let i = 0; i < palletteBoxes; i++) {
    // Generate random Hex Color
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16)
    randomHex = `#${randomHex.padStart(6, '0')}`

    // Creating 'li' element
    const color = document.createElement('li')
    color.classList.add('color')
    color.innerHTML = `<div class="hex-box" style="background-color: ${randomHex}"></div>
    <div class="hex-value">${randomHex}</div>`

    // Adding click eventlistener to current li element to copy color
    color.addEventListener('click', () => copyColor(color, randomHex))

    // Adding 'li' element to container
    container.appendChild(color)
  }
}

const copyColor = (element, hexValue) => {
  const colorElement = element.querySelector('.hex-value')
  // Copy the hex value to clipboard
  navigator.clipboard.writeText(hexValue).then(() => {
    colorElement.innerText = 'Copied'
    setTimeout(() => colorElement.innerText = hexValue, 1500)
  }).catch(() => alert('Failed to copy the hex color value!'))
}

button.addEventListener('click', refreshPalette)

refreshPalette()
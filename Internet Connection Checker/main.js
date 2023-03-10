const popup1 = document.querySelector('.popup')
const popup2 = document.querySelector('.popup2')
const container = document.querySelector('.container')
const popupTitle = document.querySelector('.content h2')
const popupText = document.querySelector('.content p')
const popupIcon = document.querySelector('.uil')
const popupRedo = document.querySelector('.uil-redo')
let isOnline = true
let timer = 5
let timerCount


const popupWindow1 = (status) => {
  if (!status) {
    popup1.classList.remove('hidden1')
    popupIcon.className = 'uil-wifi-slash'
    popupTitle.innerHTML = 'Oops! No Internet!'
    popupText.innerHTML = `Looks like you are facing a temporary network interruption.<br>We will attempt to reconnect you in <strong>${timer}</strong> seconds.`
    popupText.style = 'text-align: start'
    container.style = 'height: 270px;'
    popupRedo.style = 'visibility: visible'

    timerCount = setInterval(() => {
      timer--
      if (timer === 0) {
        checkConnection()
      }
      popup1.querySelector('p strong').innerHTML = timer;
    }, 1000)

  } else {
    popupIcon.className = 'uil-wifi'
    popupTitle.innerHTML = 'Reconnected'
    popupText.innerHTML = 'Your device is now successfully connected to the internet.'
    container.style = 'height: 14.375rem;'
    popupText.style = 'text-align: center'
    popupRedo.style = 'visibility: hidden'

    return setTimeout(() => popup1.classList.add('hidden1'), 2500)
  }
}


const popupWindow2 = (status) => {
  popup2.classList.toggle('hidden2', status)
  if (!status) {
    setTimeout(() => {
      popup2.classList.add('hidden2')
    }, 2000)
  }
}

const checkConnection = async () => {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search')
    isOnline = response.status >= 200 && response.status < 300
  }
  catch {
    isOnline = false
  }
  timer = 5
  clearInterval(timerCount)
  popupWindow1(isOnline)
  popupWindow2(isOnline)
}

setInterval(() => isOnline && checkConnection(), 3000)
popupRedo.addEventListener('click', checkConnection)

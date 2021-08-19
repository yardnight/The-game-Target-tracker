const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const ready = document.querySelector('#ready')
const timeEl = document.querySelector('#time')
const reStart = document.querySelector('#restart')
const board = document.querySelector('#board')
const colors = ['#E63946','#D90429','#F1FAEE','#EDF2F4','#A8DADC',
'#00AFB9','#d435fc','#fee440','#f15bb5','#7bf1a8']
let time = 0
let score = 0
let timeId
let slide = []

startBtn.addEventListener('click', event =>{
    event.preventDefault()
    event.target.classList.add('_active')
    slide = screens[0]
    console.log(slide)
    setTimeout(upSlide, 100) 
    // screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>{
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        event.target.classList.add('_active')
        slide = screens[1]
        console.log(slide)
        setTimeout(upSlide, 100) 
        // screens[1].classList.add('up')
        // startGame()
    }
})

ready.addEventListener('click', event =>{
    if (event.target.classList.contains('go-btn')){
        event.target.classList.add('_active')
        slide = screens[2]
        console.log(slide)
        setTimeout(upSlide, 100) 
        // screens[2].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event =>{
    if (event.target.classList.contains('circle')===true){
        score++
        event.target.remove()
        creatRandomCircle()
    }
})

reStart.addEventListener('click', event =>{
    event.preventDefault()
    if (event.target.classList.contains('reset-btn')){
        event.target.parentNode.classList.add('_vanishdown')
        board.classList.add('_vanishup')
        // event.target.classList.add('_vanish')
        setTimeout(reload, 100)
        
    }
})

function upSlide(){
    slide.classList.add('up')
}

function reload() {
    window.location.reload()
}
function startGame(){
    timeId = setInterval(decreaseTime, 1000)
    creatRandomCircle()
    setTime(time)
    return
}
    
function decreaseTime(){
    if (time === 0) {
        clearInterval(timeId)
        finishGame()
        
    } else {
        let current = --time
        if (current<10){
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime (value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    
    timeEl.parentNode.remove() 
    screens[3].classList.add('resett')
    reStart.innerHTML = `<a class = "reset-btn" href="#">Try again</a>`
    board.innerHTML = `<div class = "h4">Score: <span class ="primary">${score}</span></div>`
}

function creatRandomCircle(){     
    const circle = document.createElement('div')
    const size = getRandomNum(10,30)
    const {width, height}= board.getBoundingClientRect()
    const x=getRandomNum(0, width - size)
    const y=getRandomNum(0, height - size)
    const color = randomColor()
    circle.style.backgroundColor = `${color}`
    circle.classList.add('circle')  
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNum(min, max){
    return Math.round(Math.random() * (max-min) + min)
}

function randomColor(){
    const index = Math.floor(Math.random()*colors.length)
    return colors[index]
}
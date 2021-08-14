const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
// const timeBtn = document.querySelectorAll('.time-btn')
const timeList = document.querySelector('#time-list')
const ready = document.querySelector('#ready')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#E63946','#D90429','#F1FAEE','#EDF2F4','#A8DADC',
'#00AFB9','#457B9D','#fee440','#f15bb5','#7bf1a8']
let time = 0
let score = 0


startBtn.addEventListener('click', event =>{
    event.preventDefault()
    event.target.classList.add('_active')
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>{
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        event.target.classList.add('_active')
        screens[1].classList.add('up')
        // startGame()
    }
})

ready.addEventListener('click', event =>{
    if (event.target.classList.contains('go-btn')){
        event.target.classList.add('_active')
        screens[2].classList.add('up')
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


function startGame(){
    setInterval(decreaseTime, 1000)
    creatRandomCircle()
    setTime(time)
    
}

function decreaseTime(){
    if (time === 0) {
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
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class ="primary">${score}</span></h1>`
}

function creatRandomCircle(){     
    const circle = document.createElement('div')
    const size = getRandomNum(5,30)
    const {width, height}= board.getBoundingClientRect()
    const x=getRandomNum(0,width-size)
    const y=getRandomNum(0,height-size)

    const color = randomColor()
    // console.log('Color',color)
    circle.style.backgroundColor = `${color}`
    // console.log(circle.style.color)
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
const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ffea0f','#d510ef','#05eaff','#2cbafe','#608c13',
'#e58251','#c61a0b','#fed562','#fff','rgb(252, 166, 126)','rgb(167, 255, 95)',
'rgb(95, 236, 255)','rgb(195, 145, 252)','rgb(255, 102, 222)','rgb(253, 86, 86)' ]
let time = 0
let score = 0


startBtn.addEventListener('click', (event) =>{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>{
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click',(event)=>{
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
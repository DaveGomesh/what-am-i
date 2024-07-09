
let activeGame = false
let remainingTime = 90
let remainingWords = []
let rightAnswers = []
let interval = null



document.addEventListener('DOMContentLoaded', handleBtnStartClick)
document.querySelector('#btn-right-answer').addEventListener('click', handleBtnRightAnswerClick)
document.querySelector('#btn-wrong-answer').addEventListener('click', handleBtnWrongAnswerClick)



function handleBtnStartClick() {
    remainingTime = 3
    remainingWords = getRandomWords(words.nicknames, 10)

    showNextWord(remainingWords)
    updateAmountRemainingWords(remainingWords)

    interval = setInterval(() => {
        updateTimer(remainingTime--)
        if (remainingTime == -1 || !hasRemainingWords(remainingWords)) {
            stopGame()
        }
    }, 1000)
    activeGame = true
}

function handleBtnRightAnswerClick() {
    if(!activeGame) return

    rightAnswers.push(remainingWords.shift())
    updateAmountRemainingWords(remainingWords)
    showNextWord(remainingWords)

    if(!hasRemainingWords(remainingWords)) stopGame()
}

function handleBtnWrongAnswerClick() {
    if(!activeGame) return
    remainingWords.push(remainingWords.shift())
    showNextWord(remainingWords)
}



function getRandomWords(words=[], amount=0) {
    if (amount > words.length) {
        throw new Error('The number of words to be drawn is greater than the number of words in the array')
    }

    const selectedWords = []

    while (selectedWords.length < amount) {
        const randomIndex = Math.floor(Math.random() * words.length)
        if (!selectedWords.includes(words[randomIndex])) {
            selectedWords.push(words[randomIndex])
        }
    }

    return selectedWords
}

function hasRemainingWords(words=[]) {
    return words.length != 0
}

function showNextWord(words=[]) {
    putWordOnScreen(words[0])
}

function stopGame() {
    activeGame = false
    clearInterval(interval)
    showResultGame()
}



function updateTimer(time) {
    document.querySelector('#timer').textContent = time >= 0 ? time : '--'
}

function putWordOnScreen(word) {
    document.querySelector('#current-word').textContent = word
}

function updateAmountRemainingWords(remainingWords=[]) {
    document.querySelector('#amount-remaining-words').textContent = remainingWords.length
}



function showResultGame() {
    const rightAnswersList = document.querySelector('#right-answers-list')
    const wrongAnswersList = document.querySelector('#wrong-answers-list')

    rightAnswersList.innerHTML = ''
    wrongAnswersList.innerHTML = ''

    rightAnswers.forEach(word => {
        const item = document.createElement('li')
        item.textContent = word
        rightAnswersList.appendChild(item)
    })

    remainingWords.forEach(word => {
        const item = document.createElement('li')
        item.textContent = word
        wrongAnswersList.appendChild(item)
    })

    new bootstrap.Modal('#modal-result').show()
}




const input = document.querySelector('input')
const board = document.querySelector('.board')
const button = document.querySelector('button')

let cards = []
let prevCard = null
let clickCount = 0
let card1Index = -1
let card2Index = -2

function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
}

function clearState() {
    clickCount = 0
    card1Index = -1
    card2Index = -2
}

function changeCardsColor(card1, card2, color, fontColor = 'black') {
    card1.style.backgroundColor = color
    card2.style.backgroundColor = color
    card1.style.color = fontColor
    card2.style.color = fontColor
}
function endGame() {
    let isGameActive = false
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].active == true) {
            isGameActive = true
        }
    }
    if (isGameActive == false) {
        setTimeout(() => {
            board.innerHTML = '<h1>Игра окончена</h1>'
        }, 500)
    }
}

button.addEventListener('click', () => {
    const pairs = input.value
    if (pairs > 0 && pairs % 1 == 0) {
        const cardsCount = pairs * 2
        button.disabled = true
        for (let i = 0; i < pairs; i++) {
            // cards.push(i, i)
            cards.push({ value: i, active: true })
            cards.push({ value: i, active: true })
        }
        shuffle(cards)
        for (let index = 0; index < cardsCount; index++) {
            const card = document.createElement('div')
            card.classList.add('card')
            board.append(card)

            card.addEventListener('click', () => {
                if (cards[index].active == true) {
                    clickCount++
                    if (clickCount == 1) {
                        card.innerHTML = cards[index].value
                        card1Index = index
                        prevCard = card
                    }

                    if (clickCount == 2) {
                        card.innerHTML = cards[index].value
                        card2Index = index
                        if (cards[index].value == cards[card1Index].value) {
                            cards[index].active = false
                            cards[card1Index].active = false
                            changeCardsColor(card, prevCard, 'green', 'white')
                            clearState()
                            endGame()
                        } else {
                            changeCardsColor(card, prevCard, 'red', 'white')
                            setTimeout(() => {
                                card.innerHTML = ''
                                prevCard.innerHTML = ''
                                changeCardsColor(card, prevCard, 'transparent')
                                clearState()
                            }, 1000)
                        }
                    }
                }
            })
        }
    } else {
        board.innerHTML = '<p>Число должно быть целым и больше 0</p>'
    }
})

const input = document.querySelector('input')
const board = document.querySelector('.board')
const button = document.querySelector('button')

let prevCard = null
let clickCount = 0
let card1Index = -1
let card2Index = -2

button.addEventListener('click', () => {
    const pairs = input.value
    const cardsCount = pairs * 2
    let cards = []
    for (let i = 0; i < pairs; i++) {
        // cards.push(i, i)
        cards.push({ value: i, active: true })
        cards.push({ value: i, active: true })
    }
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
                        card.style.backgroundColor = 'green'
                        prevCard.style.backgroundColor = 'green'
                        cards[index].active = false
                        cards[card1Index].active = false
                        clickCount = 0
                        card1Index = -1
                        card2Index = -2
                    } else {
                        card.style.backgroundColor = 'red'
                        prevCard.style.backgroundColor = 'red'
                        setTimeout(() => {
                            card.innerHTML = ''
                            prevCard.innerHTML = ''
                            clickCount = 0
                            card1Index = -1
                            card2Index = -2
                            card.style.backgroundColor = 'transparent'
                            prevCard.style.backgroundColor = 'transparent'
                        }, 2000)
                    }
                }
            }
        })
    }
})

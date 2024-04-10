async function fetchTarotCards() {
    try {
        const res = await fetch(`https://tarotapi.dev/api/v1/cards/random`)
        if (!res.ok) {
            throw new Error('failed to fetch tarot cards')
        }
        const data = await res.json()
        console.log(data.cards)
        const randomCardIndex = Math.floor(Math.random() * data.cards.length)
        console.log(data.cards[randomCardIndex])
        return data.cards[randomCardIndex]
    } catch (error) {
        console.log(error)
    }
}

fetchTarotCards()

function addImage(card) {
    const imageName = card.name_short
    return `https://sacred-texts.com/tarot/pkt/img/${imageName}.jpg`
}

function tarotCardInterpretation(card) {
    const { name, meaning_up } = card
    console.log(card)
    const showData = `${name}: ${meaning_up}`
    return showData
}


const form = document.querySelector('#tarotForm')

form.addEventListener('submit', async function(e) {
    e.preventDefault()
    
    const drawCard = await fetchTarotCards()

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')

    const cardImg = document.createElement('img')
    cardImg.src = addImage(drawCard) 
    cardImg.classList.add('card-image')
    cardDiv.append(cardImg)

    const cardContainer = document.querySelector('#cardContainer')
    cardContainer.innerHTML = ''
    cardContainer.append(cardDiv)

    document.querySelector('#interpretation').textContent = tarotCardInterpretation(drawCard)

})
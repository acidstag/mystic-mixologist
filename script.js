const form = document.querySelector('#tarotForm')
const showCocktailButton = document.createElement('button')
showCocktailButton.textContent = '...reveil your libation destiny!'

const tarotCocktailMap = {
    "The Fool": "Vodka Martini",
    "The Magician": "Long Island Iced Tea",
    "The High Priestess": "Cosmopolitan",
    "The Empress": "Bloody Mary",
    "The Emperor": "Old Fashioned",
    "The Hierophant": "Mai Tai",
    "The Lovers": "Sex on the Beach",
    "The Chariot": "Mojito",
    "Strength": "Whiskey Sour",
    "The Hermit": "Gin and Tonic",
    "Wheel of Fortune": "Pina Colada",
    "Justice": "White Russian",
    "The Hanged Man": "Tequila Sunrise",
    "Death": "Dark and Stormy",
    "Temperance": "Margarita",
    "The Devil": "Satan's Whiskers",
    "The Tower": "Irish Car Bomb",
    "The Star": "Blue Lagoon",
    "The Moon": "Black Russian",
    "The Sun": "Screwdriver",
    "Judgment": "Godfather",
    "The World": "Gin Fizz",
    "Ace of Cups": "Rum Punch",
    "Two of Cups": "Pisco Sour",
    "Three of Cups": "Frozen Daiquiri",
    "Four of Cups": "White Sangria",
    "Five of Cups": "Red Sangria",
    "Six of Cups": "Strawberry Daiquiri",
    "Seven of Cups": "Amaretto Sour",
    "Eight of Cups": "Negroni",
    "Nine of Cups": "French 75",
    "Ten of Cups": "Champagne Cocktail",
    "Page of Cups": "Bellini",
    "Knight of Cups": "Mint Julep",
    "Queen of Cups": "Kir Royale",
    "King of Cups": "Paloma",
    "Ace of Pentacles": "Moscow Mule",
    "Two of Pentacles": "Sazerac",
    "Three of Pentacles": "Manhattan",
    "Four of Pentacles": "Gimlet",
    "Five of Pentacles": "Aperol Spritz",
    "Six of Pentacles": "Tom Collins",
    "Seven of Pentacles": "Caipirinha",
    "Eight of Pentacles": "Gin Gimlet",
    "Nine of Pentacles": "Sidecar",
    "Ten of Pentacles": "Mimosa",
    "Page of Pentacles": "White Lady",
    "Knight of Pentacles": "Vesper",
    "Queen of Pentacles": "Corpse Reviver",
    "King of Pentacles": "Blackberry Smash",
    "Ace of Swords": "Martinez",
    "Two of Swords": "Dark and Stormy",
    "Three of Swords": "Singapore Sling",
    "Four of Swords": "French 75",
    "Five of Swords": "Vieux Carré",
    "Six of Swords": "Zombie",
    "Seven of Swords": "Harvey Wallbanger",
    "Eight of Swords": "Paloma",
    "Nine of Swords": "Pisco Sour",
    "Ten of Swords": "Jack Rose",
    "Page of Swords": "Blood and Sand",
    "Knight of Swords": "Ramos Gin Fizz",
    "Queen of Swords": "Hemingway Daiquiri",
    "King of Swords": "Vesper",
    "Ace of Wands": "Mai Tai",
    "Two of Wands": "Aperol Spritz",
    "Three of Wands": "Negroni",
    "Four of Wands": "Pisco Sour",
    "Five of Wands": "Pina Colada",
    "Six of Wands": "Margarita",
    "Seven of Wands": "Tom Collins",
    "Eight of Wands": "Manhattan",
    "Nine of Wands": "Whiskey Sour",
    "Ten of Wands": "Old Fashioned",
    "Page of Wands": "Moscow Mule",
    "Knight of Wands": "Mojito",
    "Queen of Wands": "Sazerac",
    "King of Wands": "Dark and Stormy",
}


async function fetchTarotCards() {
    try {
        const res = await fetch(`https://tarotapi.dev/api/v1/cards/random`)
        if (!res.ok) {
            throw new Error('failed to fetch tarot cards')
        }
        const data = await res.json()
        const randomCardIndex = Math.floor(Math.random() * data.cards.length)
        return data.cards[randomCardIndex]
    } catch (error) {
        console.log(error)
    }
}

async function fetchCocktail(card) {
    try {
        const cocktailName = tarotCocktailMap[card]
        const res = await fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
        if (!res.ok) {
            throw new Error('failed to fetch cocktail data')
        }
        const data = await res.json()
        return data.drinks
    } catch (error) {
        console.log(error)
    }
}

function cocktailDisplay(cocktailData) {
    const cocktailContainer = document.querySelector('#cocktailContainer')
    cocktailContainer.innerHTML = ''
   
    if (cocktailData && cocktailData.length > 0) {
        const cocktail = cocktailData[0]

        const cocktailDiv = document.createElement('div')
        cocktailDiv.classList.add('cocktail')

        const cocktailImg = document.createElement('img')
        cocktailImg.src = cocktail.strDrinkThumb
        cocktailImg.classList.add('cocktail-img')
        cocktailDiv.append(cocktailImg)

        const name = document.createElement('h3')
        name.textContent = 'Name: ' + cocktail.strDrink
        name.classList.add('name')
        cocktailDiv.append(name)
            
        const glass = document.createElement('h4')
        glass.textContent = 'Glass: ' + cocktail.strGlass
        glass.classList.add('glass')
        cocktailDiv.append(glass)

        const instructions = document.createElement('p')
        instructions.textContent = 'Instructions: ' + cocktail.strInstructions
        instructions.classList.add('instructions')
        cocktailDiv.append(instructions)

        const ingredientsHeader = document.createElement('p')
        ingredientsHeader.textContent = 'Ingredients: '
        ingredientsHeader.classList.add('ingredients-header')
        cocktailDiv.append(ingredientsHeader)

        const ingredientsList = document.createElement('p')
        for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`]
        const measure = cocktail[`strMeasure${i}`]
        if (ingredient && measure) {
            const listItem = document.createElement('p')
            listItem.textContent = `${measure.trim()}: ${ingredient}`
            ingredientsList.classList.add('ingredients-list')
            ingredientsList.append(listItem)
        } else if (ingredient) {
            const listItem = document.createElement('p')
            ingredientsList.classList.add('ingredients-list')
            listItem.textContent = ingredient
            ingredientsList.append(listItem)
                }
            }
        cocktailDiv.append(ingredientsList)

        cocktailContainer.append(cocktailDiv)
    }

}

function addImage(card) {
    const imageName = card.name_short
    return `https://sacred-texts.com/tarot/pkt/img/${imageName}.jpg`
}

function tarotCardInterpretation(card) {
    const { name, meaning_up } = card
    const showData = `${name}: ${meaning_up}`
    return showData
}

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

    if (!document.body.contains(showCocktailButton)) {
        showCocktailButton.addEventListener('click', async function() {
        const cocktailSearch = drawCard.name
        const cocktails = await fetchCocktail(cocktailSearch)
        cocktailDisplay(cocktails)
        showCocktailButton.remove()
        })
        document.body.insertBefore(showCocktailButton, document.querySelector('#cocktailContainer'))
    }
})







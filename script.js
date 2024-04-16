const form = document.querySelector('#tarotForm')

async function fetchTarotCards() {
    try {
        const res = await fetch(`https://tarotapi.dev/api/v1/cards/random`)
        if (!res.ok) {
            throw new Error('failed to fetch tarot cards')
        }
        const data = await res.json()
        console.log(data)
        const randomCardIndex = Math.floor(Math.random() * data.cards.length)
        console.log(data.cards[randomCardIndex])
        console.log(data.cards[randomCardIndex].meaning_up)
        return data.cards[randomCardIndex]
    } catch (error) {
        console.log(error)
    }
}

async function fetchCocktail() {
    try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        if (!res.ok) {
            throw new Error('failed to fetch cocktail data')
        }
        const data = await res.json()
        console.log(data.drinks)
        return data.drinks
    } catch (error) {
        console.log(error)
    }
}
    function cocktailDisplay(cocktailData) {
        const cocktailContainer = document.querySelector('#cocktailContainer')
        cocktailContainer.innerHTML = ''

        cocktailData.forEach(cocktail => {
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
            
            const glass = document.createElement('p')
            glass.textContent = 'Glass: ' + cocktail.strGlass
            glass.classList.add('glass')
            cocktailDiv.append(glass)

            const instructions = document.createElement('p')
            instructions.textContent = 'Instructions: ' + cocktail.strInstructions
            instructions.classList.add('instructions')
            cocktailDiv.append(instructions)

            const ingredientsHeader = document.createElement("p")
            ingredientsHeader.textContent = "Ingredients: "
            ingredientsHeader.classList.add('ingredients-header')
            cocktailDiv.append(ingredientsHeader)

            const ingredientsList = document.createElement('ul')
            for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`]
            const measure = cocktail[`strMeasure${i}`]
            if (ingredient && measure) {
                const listItem = document.createElement('li')
                listItem.textContent = `${measure.trim()}: ${ingredient}`
                ingredientsList.classList.add('ingredients-list')
                ingredientsList.append(listItem)
            } else if (ingredient) {
                const listItem = document.createElement('li')
                ingredientsList.classList.add('ingredients-list')
                listItem.textContent = ingredient
                ingredientsList.append(listItem)
            }
        }
        cocktailDiv.append(ingredientsList)

        cocktailContainer.append(cocktailDiv)
    })

}

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

    const showCocktailButton = document.createElement('button')
    showCocktailButton.textContent = '...reveil your libation destiny!'
    showCocktailButton.addEventListener('click', async function() {
        const cocktails = await fetchCocktail()
        cocktailDisplay(cocktails)
        showCocktailButton.remove()
    })

    document.body.insertBefore(showCocktailButton, document.querySelector('#cocktailContainer'))
})







Overview:

Mystic Mixologist

"Unlock the spirits within; pull a card, reveal a drink, and let the magic begin!"

Crafting Cocktails with Tarot Inspiration. Imbibe the Mystical, Discover the Spirit of Libations, and Let Fate Guide Your Gastronomic Adventure.

The 'Mystic Mixologist' App utilises data fetched from the Tarot API to draw a random card and display it's description, and amend its image to a container upon button click/form submit. This then displays a button using JS that will reveal a paired cocktail to the tarot card, and displays its image and the recipe data to the DOM.

The cocktail data is fetched from the cocktail database API 'thecocktaildb', and is searched for based on the random card drawn, thanks to the variable object TarotCocktailMap. This is then displayed to the user.

Screenshots:

<img width="1920" alt="Screenshot 2024-04-18 at 3 22 03 pm" src="https://github.com/acidstag/mystic-mixologist/assets/159605098/5222e5a7-bd30-4bff-b636-684b6d5f0915">
<img width="1920" alt="Screenshot 2024-04-18 at 3 22 06 pm" src="https://github.com/acidstag/mystic-mixologist/assets/159605098/5326b47c-c237-4001-8b1b-eb265bfb736b">
<img width="1920" alt="Screenshot 2024-04-18 at 3 22 15 pm" src="https://github.com/acidstag/mystic-mixologist/assets/159605098/906cf979-0549-445e-b9fa-a7a64d6235e3">
External API's used:

Tarot API: https://tarotapi.dev/
Tarot Images: https://sacred-texts.com/tarot/index.htm
Cocktail Database API: https://www.thecocktaildb.com/api/json/v1/1/random.php

The Tarot API is used to provide the user with a random tarot card from the deck upon form submit. The image is then appended from Tarot Images data, using the name.short dataset from the drawn card, and then the description of the tarot card is displayed.

From there, the form submit creates a new button, offering the user a chance to reveal their cocktail recommendation. Once the suer clicks on the button, a search is run using the Cocktail Database API, based on the provided card/cocktai mappings.

This then displays the paired cocktail plus the recipe so the user can creat themselves.

Unsolved Problems:

Initially, I had planned to create a Tarot Based muisc/event recommendation app, but ran into issues with the available free API's provided. Lack of data / needing to pay for the data I needed. This meant I wasted a lot of time trying to make that work. Instead, I pivoted to this cocktail recomendation app. I spent a fair bit of time trying to debug issues with the cocktail mapping, and figuring out some CSS. I also ran into some issues with scope, and spent a bit of time debugging that as well. Overall, I'm okay with the finished product, but still could be alot more to do, as it is very basic. Overall, spent too much time with original idea and didn't have enough time to flesh this out.

Future Features:

- Adding button functionality so user can reset once the card / cocktail journey is complete
- Additionally, allowing users to save their favourite cocktails, whether liking them or providing a bookmark opportunity
- Improving CSS and design layout
- Adding card flip animation
- Adding geolocation data to recommend bars in local area

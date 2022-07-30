const searchBar = document.querySelector('#search-name')
const form = document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const descriptionBox = document.querySelector('.description');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchResult.innerHTML = '';
    descriptionBox.innerHTML = '';
    console.log(searchBar.value);
    renderResult();
})

async function renderResult() {
    const searchValue = searchBar.value;
    const fetchResult = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
    const data = await fetchResult.json();
    const { meals } = data;
    console.log(meals);
    meals.forEach(meal => {
        const imageDiv = document.createElement('div');
        searchResult.appendChild(imageDiv);
        imageDiv.classList.add('result-div');
        imageDiv.style.backgroundImage = `url(${meal.strMealThumb})`;
        const imageDivHover = document.createElement('div');
        imageDiv.appendChild(imageDivHover);
        //imageDivHover.classList.add('result-div-hover');
        imageDivHover.addEventListener('mousemove', () => {
            imageDivHover.classList.add('result-div-hover');
        })
        imageDiv.addEventListener('click', () => {
            descriptionBox.innerHTML = '';
            const h2 = document.createElement('h2');
            h2.innerText = meal.strMeal;
            h2.classList.add('food-name');
            descriptionBox.appendChild(h2);
            const img = document.createElement('img');
            img.setAttribute('src', `${meal.strMealThumb}`);
            img.classList.add('food-img')
            descriptionBox.appendChild(img);
            const countryDiv = document.createElement('div')
            countryDiv.classList.add('country');
            const p1 = document.createElement('p');
            p1.innerText = meal.strCategory;
            p1.classList.add('info');
            const p2 = document.createElement('p');
            p2.innerText = meal.strArea;
            p2.classList.add('info');
            countryDiv.appendChild(p1);
            countryDiv.appendChild(p2);
            descriptionBox.appendChild(countryDiv);
            const p3 = document.createElement('p');
            p3.innerText = meal.strInstructions;
            p3.classList.add('instructions');
            descriptionBox.appendChild(p3);
            const p4 = document.createElement('p');
            p4.innerText = 'Ingredients'
            p4.classList.add('ingredient');
            descriptionBox.appendChild(p4);
            const ingredientBox = document.createElement('div');
            ingredientBox.classList.add('ingredient-Box');
            descriptionBox.appendChild(ingredientBox);
            for (let i = 1; i <= 20; i++) {
                const strIngredient = `strIngredient${i}`;
                const strMeasure = `strMeasure${i}`;
                
                if(meal[strIngredient] != '') {
                    const ing = meal[strIngredient];
                    const measure = meal[strMeasure];
                    const p4 = document.createElement('p');
                    p4.classList.add('ingredient-Box-p');
                    p4.innerText = `${ing} - ${measure}`;
                    ingredientBox.appendChild(p4);
                }
            }

        })
    });
    
    // fetchResult
    //     .then((result) =>{ return result.json()})
    //     .then(data => console.log(data))
}


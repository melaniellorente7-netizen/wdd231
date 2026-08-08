const url = "./data/countries.json";
const cards = document.getElementById("countries-grid");

async function getCountryData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        const allCountries = Array.isArray(data) ? data : data.countries;
        
        // Seleccionar 5 aleatorios y mostrarlos
        const randomFive = getRandomCountries(allCountries, 5);
        displayCountries(randomFive);
    } catch (error) {
        console.error("Error al obtener los datos de los países:", error);
    }
}

function getRandomCountries(countriesList, count = 5) {
    const shuffled = [...countriesList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

const displayCountries = (countries) => {
    cards.innerHTML = "";

    if (countries.length === 0) {
        cards.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No countries found.</p>`;
        return;
    }

    countries.forEach((country) => {
        let card = document.createElement('section'); 
        let cardHeader = document.createElement('div');
        let countryName = document.createElement('h2');
        
        let cardBody = document.createElement('div');
        let infoContainer = document.createElement('div');
        
        let region = document.createElement('p');
        let language = document.createElement('p');
        let currency = document.createElement('p');
        
        let photo = document.createElement('img');
        let moreInfoBtn = document.createElement('button');

        card.classList.add('country-card');
        cardHeader.classList.add('card-header');
        cardBody.classList.add('card-body');
        infoContainer.classList.add('country-info');

        countryName.textContent = country.country;

        region.innerHTML = `<span class="info-icon" aria-hidden="true">🌍</span><strong>Region:</strong> ${country.region}`;
        language.innerHTML = `<span class="info-icon" aria-hidden="true">🗣️</span><strong>Language:</strong> ${country.language}`;
        currency.innerHTML = `<span class="info-icon" aria-hidden="true">💰</span><strong>Currency:</strong> <span class="currency-line">${country.currency}</span>`;

        photo.setAttribute('src', country.image);
        photo.setAttribute('alt', `Landscape of ${country.country}`);
        photo.setAttribute('loading', 'lazy');
        photo.classList.add('country-flag');

        moreInfoBtn.classList.add('btn-more-info');
        moreInfoBtn.setAttribute('data-id', country.id);
        moreInfoBtn.textContent = 'More Info';

        moreInfoBtn.addEventListener('click', () => {
            window.location.href = `guides.html?id=${country.id}`;
        });

       
        cardHeader.appendChild(countryName);

        infoContainer.appendChild(region);
        infoContainer.appendChild(language);
        infoContainer.appendChild(currency);
        infoContainer.appendChild(moreInfoBtn);

        cardBody.appendChild(photo);
        cardBody.appendChild(infoContainer);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        cards.appendChild(card);
    });
}

getCountryData();
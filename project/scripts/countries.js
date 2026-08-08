const url = "./data/countries.json";
const cards = document.getElementById("countries-grid");

/*Dialog*/ 
const dialog = document.getElementById('country-dialog');
const closeBtn = document.getElementById('close-dialog');
const modalCountryName = document.getElementById('modal-country-name');
const tipSeason = document.getElementById('tip-season');
const tipStyle = document.getElementById('tip-style');
const tipCultural = document.getElementById('tip-cultural');

/*Filters*/
const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');
const savedFilterBtn = document.getElementById('saved-filter-btn');
const savedCountSpan = document.getElementById('saved-count');


let allCountries = [];
let showOnlySaved = false;

async function getCountryData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        allCountries = Array.isArray(data) ? data : data.countries;
        
        populateRegionDropdown(allCountries);
        updateSavedCounter();
        applyFilters();
    } catch (error) {
        console.error("Error al obtener los datos de los países:", error);
    }
}

getCountryData();

function populateRegionDropdown(countries) {
    const regions = [...new Set(countries.map(c => c.region))];
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedRegion = regionFilter.value;
    const savedIds = getSavedCountryIds();

    const filtered = allCountries.filter(country => {
        const matchesText = country.country.toLowerCase().includes(searchTerm) || 
                            country.region.toLowerCase().includes(searchTerm);
        const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
        const matchesSaved = !showOnlySaved || savedIds.includes(country.id);

        return matchesText && matchesRegion && matchesSaved;
    });

    displayCountries(filtered);
}


const displayCountries = (countries) => {
    cards.innerHTML = "";
    const savedIds = getSavedCountryIds();

    if (countries.length === 0) {
        cards.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No countries found.</p>`;
        return;
    }

    countries.forEach((country) => {
        let card = document.createElement('section'); 
        let cardHeader = document.createElement('div');
        let countryName = document.createElement('h2');
        let starBtn = document.createElement('button');
        
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

        starBtn.classList.add('save-star-btn');
        starBtn.innerHTML = '★';
        const isSaved = savedIds.includes(country.id);
        if (isSaved) starBtn.classList.add('saved');

        starBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSaveCountry(country.id);
        });

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
            openCountryDetails(country);
        });

        cardHeader.appendChild(countryName);
        cardHeader.appendChild(starBtn); 
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

/*Local Storage - saved countries*/
function getSavedCountryIds() {
    return JSON.parse(localStorage.getItem('savedCountries')) || [];
}

function toggleSaveCountry(id) {
    let saved = getSavedCountryIds();
    if (saved.includes(id)) {
        saved = saved.filter(savedId => savedId !== id);
    } else {
        saved.push(id);
    }
    localStorage.setItem('savedCountries', JSON.stringify(saved));
    updateSavedCounter();
    applyFilters(); 
}

function updateSavedCounter() {
    const saved = getSavedCountryIds();
    savedCountSpan.textContent = saved.length;
}

searchInput.addEventListener('input', applyFilters);
regionFilter.addEventListener('change', applyFilters);

savedFilterBtn.addEventListener('click', () => {
    showOnlySaved = !showOnlySaved;
    savedFilterBtn.classList.toggle('active', showOnlySaved);
    applyFilters();
});

function openCountryDetails(country) {
    modalCountryName.textContent = country.country;
    
    if (country.travelTips) {
        tipSeason.textContent = country.travelTips.bestSeason;
        tipStyle.textContent = country.travelTips.travelStyle;
        tipCultural.textContent = country.travelTips.culturalTip;
    }

    dialog.showModal();
}

closeBtn.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
    );
    if (!isInDialog) dialog.close();
});

function getRandomCountries(countriesList, count = 5) {
    const shuffled = [...countriesList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
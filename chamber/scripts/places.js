import { places } from '../data/places.mjs'
const cards = document.querySelector('#cards');

function displayPlaces(placesList) {
  cards.innerHTML = '';
  placesList.forEach(place => {
    const card = document.createElement('section');
    card.classList.add('card');

    card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
            <img 
                src="${place.photo.src}" 
                alt="${place.photo.alt}" 
                width="${place.photo.width}" 
                height="${place.photo.height}"
                class="place-img"
                loading="lazy"
            >
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button" class="btn-learn-more">Learn More</button>
            `;

    cards.appendChild(card);
    

   

  });

}
displayPlaces(places);


const visitMessageElement = document.querySelector('#visit-message');
const msPerDay = 1000 * 60 * 60 * 24; 
const currentVisit = Date.now();
const lastVisit = localStorage.getItem('lastVisitDate');

let message = '';

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const timeDifference = currentVisit - parseInt(lastVisit, 10);
  const daysBetween = Math.floor(timeDifference / msPerDay);

  if (daysBetween < 1) {
    message = "Back so soon! Awesome!";
  } else {
    const dayWord = daysBetween === 1 ? "day" : "days";
    message = `You last visited ${daysBetween} ${dayWord} ago.`;
  }
}

if (visitMessageElement) {
  visitMessageElement.textContent = message;
}
localStorage.setItem('lastVisitDate', currentVisit);


const hamButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

if (hamButton && navBar) {
    hamButton.addEventListener('click', () => {
        hamButton.classList.toggle('show');
        navBar.classList.toggle('show');

        const isExpanded = hamButton.getAttribute('aria-expanded') === 'true';
        hamButton.setAttribute('aria-expanded', !isExpanded);
    });
}

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#cards");

if (gridbutton && listbutton && display) {
    gridbutton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");

        gridbutton.classList.add("active");
        listbutton.classList.remove("active");
    });

    listbutton.addEventListener("click", () => {
        display.classList.add("list");
        display.classList.remove("grid");

        listbutton.classList.add("active");
        gridbutton.classList.remove("active");
    });
}


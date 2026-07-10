const hamButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('show');
    navBar.classList.toggle('show');

    const isExpanded = hamButton.getAttribute('aria-expanded') === 'true';
    hamButton.setAttribute('aria-expanded', !isExpanded);
});




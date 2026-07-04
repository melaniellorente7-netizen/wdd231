const hamButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');

hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('show');
    navBar.classList.toggle('show');
    hamButton.setAttribute('aria-expanded', navBar.classList.contains('show'));
});




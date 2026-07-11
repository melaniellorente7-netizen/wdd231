const url = './data/members.json';
const cards = document.querySelector('#cards');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
    
}

getMemberData();

const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement('section');
        let cardHeader = document.createElement('div');
        let companyName = document.createElement('h2');
        let businessTagLine = document.createElement('p');
        let cardBody = document.createElement('div');
        let email = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('p');
        let photo = document.createElement('img');
        let contactInfo = document.createElement('div');

        companyName.textContent = `${member.companyName}`;
        cardHeader.classList.add('card-header');
        businessTagLine.classList.add('tagline');
        businessTagLine.textContent = `${member.otherInformation.businessType}`;
        cardBody.classList.add('card-body');
        contactInfo.classList.add('contact-info');
        email.classList.add('email');
        email.innerHTML = `<strong>Email:</strong> ${member.companyEmail}`;
        phone.classList.add('phone');
        phone.innerHTML = `<strong>Phone:</strong> ${member.companyPhoneNumber}`;
        url.classList.add('url');
        url.innerHTML = `<strong>URL:</strong> ${member.companyWebsiteUrl}`;
        

        photo.setAttribute('src',`images/${member.imageFileName}`);
        photo.setAttribute('alt', `Photo of ${member.companyName} Company`);
        photo.setAttribute('loading', 'lazy');
        photo.setAttribute('width','340');
        photo.setAttribute('height','440');

       cardHeader.appendChild(companyName);
       cardHeader.appendChild(businessTagLine);
       contactInfo.appendChild(email);
       contactInfo.appendChild(phone);
       contactInfo.appendChild(url);
       cardBody.appendChild(photo);
       cardBody.appendChild(contactInfo);
       card.appendChild(cardHeader);
       card.appendChild(cardBody);
       cards.appendChild(card);
    });
}
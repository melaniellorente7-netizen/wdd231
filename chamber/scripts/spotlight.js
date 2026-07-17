const url = './data/members.json';
const cards = document.querySelector('#cards');

async function getSpotlightData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const goldSilverMembers = data.members.filter(
            (member) => member.membershipLevel === 3 || member.membershipLevel === 2
        );

        
        const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random());


        const howMany = Math.min(shuffled.length, Math.random() < 0.5 ? 2 : 3);
        const spotlightMembers = shuffled.slice(0, howMany);

        displaySpotlights(spotlightMembers);
    } catch (error) {
        console.error("Error cargando los datos de spotlight:", error);
    }
}

getSpotlightData();


function getMembershipLabel(level) {
    if (level === 3) return 'Gold Member';
    if (level === 2) return 'Silver Member';
    return 'Member';
}

const displaySpotlights = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement('section');
        let cardHeader = document.createElement('div');
        let companyName = document.createElement('h2');
        let businessTagLine = document.createElement('p');
        let cardBody = document.createElement('div');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let urlElement = document.createElement('p');
        let membership = document.createElement('p');
        let photo = document.createElement('img');
        let contactInfo = document.createElement('div');

        companyName.textContent = `${member.companyName}`;
        cardHeader.classList.add('card-header');
        businessTagLine.classList.add('tagline');
        businessTagLine.textContent = `${member.otherInformation.businessType}`;
        cardBody.classList.add('card-body');
        contactInfo.classList.add('contact-info');

        address.classList.add('address');
        address.innerHTML = `<strong>Address:</strong> ${member.companyAddress}`;

        phone.classList.add('phone');
        const telHref = member.companyPhoneNumber.replace(/[^\d+]/g, '');
        phone.innerHTML = `<strong>Phone:</strong> <a href="tel:${telHref}">${member.companyPhoneNumber}</a>`;

        urlElement.classList.add('url');
        urlElement.innerHTML = `<strong>Website:</strong> <a href="${member.companyWebsiteUrl}" target="_blank" rel="noopener">${member.companyWebsiteUrl}</a>`;

        membership.classList.add('membership-level', `level-${member.membershipLevel}`);
        membership.textContent = getMembershipLabel(member.membershipLevel);

        photo.setAttribute('src', `images/${member.imageFileName}`);
        photo.setAttribute('alt', `Logo of ${member.companyName}`);
        photo.setAttribute('loading', 'lazy');
        photo.setAttribute('width', '340');
        photo.setAttribute('height', '440');

        cardHeader.appendChild(companyName);
        cardHeader.appendChild(businessTagLine);
        cardHeader.appendChild(membership);
        contactInfo.appendChild(address);
        contactInfo.appendChild(phone);
        contactInfo.appendChild(urlElement);
        cardBody.appendChild(photo);
        cardBody.appendChild(contactInfo);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cards.appendChild(card);
    });
}
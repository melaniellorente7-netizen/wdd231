const formData = new URLSearchParams(window.location.search);
const resultsElement = document.getElementById('results');

if (formData.toString() && resultsElement) {
    const fname = formData.get('fname') || 'N/A';
    const lname = formData.get('lname') || 'N/A';
    const email = formData.get('email') || 'N/A';
    const subject = formData.get('subject') || 'N/A';
    const country = formData.get('country') || 'Not specified';
    const message = formData.get('message') || 'N/A';
    const newsletter = formData.get('newsletter') === 'yes' ? 'Yes' : 'No';

    resultsElement.innerHTML = `
        <p><strong>First Name:</strong> ${fname}</p>
        <p><strong>Last Name:</strong> ${lname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reason:</strong> ${subject}</p>
        <p><strong>Country of Interest:</strong> ${country}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Newsletter Subscribed:</strong> ${newsletter}</p>
    `;
} else if (resultsElement) {
    resultsElement.innerHTML = `<p>No submission data found.</p>`;
}
document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const formData = new URLSearchParams(window.location.search);
    const resultsElement = document.getElementById("results");

    if (resultsElement && formData.has("first")) {
       
        function show(key) {
            return formData.get(key) || "Not provided";
        }
        let rawTimestamp = show("timestamp");
        let formattedDate = rawTimestamp;
        if (rawTimestamp !== "Not provided") {
            try {
                formattedDate = new Date(rawTimestamp).toLocaleString();
            } catch (e) {
                formattedDate = rawTimestamp;
            }
        }

        resultsElement.innerHTML = `
            <h2>Application Details</h2>
            <p><strong>First Name:</strong> ${show("first")}</p>
            <p><strong>Last Name:</strong> ${show("last")}</p>
            <p><strong>Email:</strong> ${show("email")}</p>
            <p><strong>Mobile Phone:</strong> ${show("phone")}</p>
            <p><strong>Business Name:</strong> ${show("organization-name")}</p>
            <p><strong>Date & Time Submitted:</strong> ${formattedDate}</p>
        `;
    } else if (resultsElement) {
        resultsElement.innerHTML = "<p>No application data found. Please complete the form on the Join page.</p>";
    }
});
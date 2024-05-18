document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const propertyForm = document.getElementById('propertyForm');
    const propertiesContainer = document.getElementById('propertiesContainer');
    const pagination = document.getElementById('pagination');
    let currentPage = 1;
    const propertiesPerPage = 5;

    // Sample data
    let properties = [
        { id: 1, place: 'City Center', area: 1200, bedrooms: 3, bathrooms: 2, nearby: 'Hospital, College', likes: 0 },
        // Add more properties as needed
    ];

    function displayProperties(page) {
        propertiesContainer.innerHTML = '';
        const startIndex = (page - 1) * propertiesPerPage;
        const endIndex = Math.min(startIndex + propertiesPerPage, properties.length);
        for (let i = startIndex; i < endIndex; i++) {
            const property = properties[i];
            const propertyDiv = document.createElement('div');
            propertyDiv.className = 'property';
            propertyDiv.innerHTML = `
                <p>Place: ${property.place}</p>
                <p>Area: ${property.area} sq ft</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Nearby: ${property.nearby}</p>
                <button class="interestButton" data-id="${property.id}">I'm Interested</button>
                <button class="likeButton" data-id="${property.id}">Like (<span>${property.likes}</span>)</button>
            `;
            propertiesContainer.appendChild(propertyDiv);
        }
        displayPagination();
    }

    function displayPagination() {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(properties.length / propertiesPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'pageButton';
            pageButton.innerText = i;
            if (i === currentPage) {
                pageButton.disabled = true;
            }
            pageButton.addEventListener('click', function() {
                currentPage = i;
                displayProperties(currentPage);
            });
            pagination.appendChild(pageButton);
        }
    }

    propertiesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('interestButton')) {
            const propertyId = event.target.dataset.id;
            // Check if user is logged in
            if (!localStorage.getItem('loggedIn')) {
                alert('You must be logged in to view seller details.');
                document.getElementById('login').style.display = 'block';
                return;
            }
            // Simulate fetching seller details and sending email
            alert(`Seller details for property ID ${propertyId} sent to your email.`);
            // Email sending logic goes here
        } else if (event.target.classList.contains('likeButton')) {
            const propertyId = event.target.dataset.id;
            const property = properties.find(p

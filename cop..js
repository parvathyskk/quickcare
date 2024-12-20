import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgC7eK1-jwDwXqHfmHb3MjPNnBlcjQWr8",
    authDomain: "scraplink-9ce04.firebaseapp.com",
    projectId: "scraplink-9ce04",
    storageBucket: "scraplink-9ce04.appspot.com",
    messagingSenderId: "406914882192",
    appId: "1:406914882192:web:3d429db720b3821decd615",
    measurementId: "G-G9M68432JZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const hospitalRef = ref(database, 'hospitalData');
onValue(hospitalRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const hospitalData = Object.values(data); // Convert object to array
        
        // Update hospital markers and cards
        updateMapMarkers(hospitalData);
        populateHospitalCards(hospitalData);
    } else {
        console.error('No hospital data found');
    }
});

// Initialize Mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoiZXN0aGVyY2F0ZXYiLCJhIjoiY2wyN2w3M256MDBqYjN0bW1uOG16ZzVqdiJ9.apozKCwK2RIwWPweckfjSg';
  
const map = new mapboxgl.Map({
    container: 'map', // ID of the map container
    style: 'mapbox://styles/mapbox/streets-v11', // Style of the map
    center: [0, 0], // Initial map center coordinates (longitude, latitude)
    zoom: 15 // Initial zoom level
});

const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving'
});

map.addControl(directions, 'top-left');

// Get user's current location and set it as the starting point
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const userLocation = [position.coords.longitude, position.coords.latitude];

            // Set the user's location as the map's center
            map.setCenter(userLocation);

            // Add a marker for the user's location
            new mapboxgl.Marker({ color: 'red' })
                .setLngLat(userLocation)
                .setPopup(new mapboxgl.Popup().setHTML('<h5>Your Location</h5>'))
                .addTo(map);

            // Set the starting point in directions to user's location
            directions.setOrigin(userLocation);
        },
        error => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location. Please enable location services.');
        }
    );
} else {
    alert('Geolocation is not supported by your browser.');
}


// Fetch hospital data and dynamically populate the app

function updateMapMarkers(hospitalData) {
    hospitalData.forEach(hospital => {
        new mapboxgl.Marker({ color: 'blue' })
            .setLngLat(hospital.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`
                <h5>${hospital.name}</h5>
                <p>${hospital.address}</p>
                <p>Resources: ${hospital.resources}</p>
                <p>Address: ${hospital.address}</p>
                <p>Phone no: ${hospital.phone} Email: ${hospital.email}git</p>
            `))
            .addTo(map);
    });
}

// Event listener for search functionality
const searchButton = document.getElementById('hospital-cards-container');
const searchBox = document.getElementById('hospital-cards-container');

searchButton.addEventListener('click', () => {
    const query = searchBox.value.toLowerCase();
    const filteredData = hospitalData.filter(hospital => 
        hospital.name.toLowerCase().includes(query) || 
        hospital.address.toLowerCase().includes(query)
    );

    const container = document.getElementById('hospital-cards-container');
    container.innerHTML = ''; // Clear previous content

    if (filteredData.length === 0) {
        container.innerHTML = '<p>No hospitals found matching your search.</p>';
    } else {
        filteredData.forEach(hospital => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${hospital.name}</h5>
                    <p class="card-text">${hospital.address}</p>
                    <p class="card-text"><small class="text-muted">Resources: ${hospital.resources}</small></p>
                </div>
            `;
            container.appendChild(card);
        });
    }
});

// Add hospital markers to the map
hospitalData.forEach(hospital => {
    new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(hospital.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
            <h5>${hospital.name}</h5>
            <p>${hospital.address}</p>
            <p><small>Resources: ${hospital.resources}</small></p>
        `))
        .addTo(map);
});

updateMapMarkers(hospitalData);

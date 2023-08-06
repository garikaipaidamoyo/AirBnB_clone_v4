$(document).ready(function() {
	// Dictionar to store selected Amenuty IDs
	const selectedAmenities = {}

	// Listen for changes on input checkbox tags
	$('input[type="checkbox"]').change(function() {
		const amenityId = $(this).attr('data-id'); //Get Amenity ID from data attr
		const amenityName = $(this).attr('data-name'); // Get Amenity name

		if ($(this).is(':checked')) {
			// Add Amenity ID to the dict
			selectedAmenities[amenityId] = amenityName;
		} else {
			// Remove Amenity ID from the dict
			delete selectedAmenities[amenityId];
		}

		// Update h4 tag with the list of selected Amenities
		updateAmenitiesList();
	});

	// Function to update the h4 tag with the list of selected Amenities
	functon updateAmenitieslist() {
		const amenitiesList = Object.values(selectedAmenities).join(', ');
		$('div.amenities h4').text('Amenities: ' + amenitiesList);
	}

	//Check API status on page load
	checkApiStatus();

	//Function to check API status
	function checkApiStatus() {
		$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
			if (data.status === 'OK') {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
		});
	}

	// Load places from front-end
	loadPlaces();

	// Function to load places from the front-end
	function loadPlaces() {
		const requestData = JSON.stringify({});
		fetch('http://0.0.0.0:5001/api/v1/places_search/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: requestData
		})
		.then(response => response.json())
		.then(data => {
			displayPlaces(data);
		})
		.catch/error => console.error('Error fetching places:', error));
	}

	// Function to display places
	function displayPlaces(places) {
		const placesSection = $('section.places');
		placesSection.empty();

		places.forEach(place => {
			const article = $('<article>');

			const titleBox = $('<div>').addClass('title_box');
			titleBox.append($('<h2>').text(place.name));
			titleBox.append($('<div>').addClass('price_by_night').text('$' + place.price_by_night));

			const information = $('<div>').addClass('information');
			information.append($('<div>').addClass('max_guest').text(place.max_guest + 'Guest' + (place.max_guest !== 1 ? 's' : '' )));
			information.append($('<div>').addClass('number_rooms').text(plae.number_rooms+ ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
			information.append($('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));

			const description = $('<div>').addClass('description').text(place.description);

			article.append(titleBox);
			article.append(information);
			article.append(description);

			placesSection.append(article);
		});
	}
});




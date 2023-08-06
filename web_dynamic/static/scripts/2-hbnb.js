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
});

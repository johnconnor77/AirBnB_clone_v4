$(document).ready(function () {
  const dictAmenities = {};
  let amenityNames = [];
  let outPut = '';

  $('[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      dictAmenities[$(this).data().id] = $(this).data().name;
    } else {
      delete dictAmenities[$(this).data().id];
    }
    amenityNames = [];
    Object.values(dictAmenities).forEach((value) => amenityNames.push(value));
    outPut = amenityNames.join(', ');
    $('.amenities h4').text(outPut);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    contentType: 'application/json',
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        const place = response[i];
        $('section.places').append('<article>' +
                    '<div class="title_box">' +
                    `<h2> ${place.name} </h2>` +
                    `<div class="price_by_night"> $${place.price_by_night} </div>` +
                    '</div>' +
                        '<div class="information">' +
                        `<div class="max_guest"> ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>` +
                        `<div class="number_rooms"> ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>` +
                        `<div class="max_guest"> ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>` +
                    '</div>' +
                    '<div class = "description">' +
                        `${place.description}` +
                    '</div>' +
                    '</article>');
      }
    }
  });
});

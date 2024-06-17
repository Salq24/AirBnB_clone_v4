document.ready(function() {
    const selAmenities = {};
    $("li input[type=checkbox]").change(function() {
      if (this.checked) {
        selAmenities[this.dataset.name] = this.dataset.id;
      } else {
        delete selAmenities[this.dataset.name];
      }
      $("div.amenities h4").text(Object.keys(selAmenities).sort().join(", "));
      });
  
    $.getJson("http://0.0.0.0:5001/api/v1/status/", (body) => {
      if (body.status === "OK") {
        $("div#api_status").addClass("available");
      } else {
        $("div#api_status").removeClass("available");
      }
    });
    $.post({
        link: `http://0.0.0.0:5001/api/v1/places_search`,
        data: JSON.stringify({}),
        header: {
            contentType: 'application/json',
        },
        success: (data) => {
            data.forEach((place) =>
            $("section.places").append(
                `<article>
            <div class="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? "s" : ""
					}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? "s" : ""
					}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
            </div>
            <div class="description">
			${place.description}
			</div>
				</article>`
				)
			);
		},
		dataType: "json",
	});
});

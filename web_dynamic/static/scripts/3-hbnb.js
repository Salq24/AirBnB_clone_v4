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
});

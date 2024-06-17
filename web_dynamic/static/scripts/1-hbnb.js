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
});

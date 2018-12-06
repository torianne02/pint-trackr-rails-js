// JSON Beer Constructor
function Beer(name, beer_type, ibu, abv, brewery_id, user_id) {
  this.name = name
  this.beer_type = beer_type
  this.ibu = ibu
  this.abv = abv
  this.brewery_id = brewery_id
  this.user_id = user_id
}

// Submit form using AJAX
$(function() {
  $('#new-beer-form').on("submit", function(e) {
    $.ajax({
      url: this.action,
      method: "POST",
      dataType: "json",
      data: $(this).serialize(),
      success: function(json) {
        alert("I made it here.");
        $.get(this.href).success(function(json) {
          var $ol = $("div.beers ol")
          $ol.html("") // empties OL

          json.forEach(function(beer) {
            $ol.append("<li>" + beer.name + "</li>");
          })
        })
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
      },
    });
    e.preventDefault();
  })
})

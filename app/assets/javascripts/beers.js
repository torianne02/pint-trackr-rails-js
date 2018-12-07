// JSON Beer Constructor
function Beer(name, beer_type, ibu, abv, brewery_id, user_id) {
  this.name = name
  this.beer_type = beer_type
  this.ibu = ibu
  this.abv = abv
  this.brewery_id = brewery_id
  this.user_id = user_id
}

$(function() {
  $('#new-beer-form').on("submit", function(e) {
    $.ajax({
      url: this.action,
      method: "POST",
      data: $(this).serialize(),
      success: function(response) {
        var $ol = $("div.beers ol")
        $ol.append(response);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
      },
    });
    e.preventDefault();
  })
})

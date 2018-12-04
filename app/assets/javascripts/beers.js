// JSON Beer Constructor
function Beer(name, beer_type, ibu, abv, brewery_id, user_id) {
  this.name = name
  this.beer_type = beer_type
  this.ibu = ibu
  this.abv = abv
  this.brewery_id = brewery_id
  this.user_id = user_id
}

// success function - creates new beer
function newBeer(json) {
  const beer = new Beer(json)
}

// Submit form using AJAX
$(function() {
  $('#new-beer-form').on("submit", function(e) {
    e.preventDefault();
    $.ajax({
       url: this.action,
       method: "POST",
       dataType: "json",
       data: $( this ).serialize(),
       success: function(response){
         newBeer(response);
       }
    })
  })
})

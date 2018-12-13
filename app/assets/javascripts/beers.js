// JSON Beer Constructor
function Beer(name, beer_type, ibu, abv, brewery_id, user_id) {
  this.name = name
  this.beer_type = beer_type
  this.ibu = ibu
  this.abv = abv
  this.brewery_id = brewery_id
  this.user_id = user_id
}

// clear form
const clearForm = () => {
  $("#beer_name").val("");
  $("#beer_brewery_attributes_name").val("");
  $("#beer_beer_type").val("");
  $("#beer_ibu").val("");
  $("#beer_abv").val("");
}

// next beer function
// function getBeer(json) {
//   const beer = new Beer(json)
//   const userBeers = beer.user.beers
//
// }

$(function() {
  // new beer request
  $('#new-beer-form').on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: "POST",
      data: $(this).serialize(),
      success: function(response) {
        clearForm();
        var $ol = $("div.beers ol")
        $ol.append(response);
      },
      error: function(response) {
        alert("Please fill out all criteria.");
      },
    });
  })

  // show beer request
  // $('#show_beer').on('click', 'a.next', function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     url: this.href,
  //     type: "GET",
  //     dataType: "json",
  //     success: function(response) {
  //       getBeer(response)
  //     },
  //     error: function(response) {
  //       alert("Oops! Something went wrong!")
  //     }
  //   })
  // })
})

// todo - add logic to go to next beer on show page
// todo - add prototype function

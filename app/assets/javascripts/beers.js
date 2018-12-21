// JSON Beer Constructor
function Beer(name, beer_type, ibu, abv, brewery_id, user_id) {
  this.name = name
  this.beer_type = beer_type
  this.ibu = ibu
  this.abv = abv
  this.brewery_id = brewery_id
  this.user_id = user_id
}

// Beer.prototype.info = function() {
//   return "IBU: " this.ibu + " ABV: " + this.abv
// }

// Beer.prototype.isHoppy = function() {
//   if(ibu > 40) {
//     true
//     // or return "This beer is Hoppy!"
//   }
// }

// clear form
const clearForm = () => {
  $("#beer_name").val("");
  $("#beer_brewery_attributes_name").val("");
  $("#beer_beer_type").val("");
  $("#beer_ibu").val("");
  $("#beer_abv").val("");
}

// next beer function
function getBeer(data) {
  const beer = data
  var userBeers = beer.user.beers

  // locate index of beer
  var findIndex = userBeers.map(function(e) {return e.id}).indexOf(beer.id)

  // beer info template
  const beerInfoTemplate = (`<h3>${beer.name}</h3>
    <p>Brewery: ${beer.brewery.name}</p>
    <p>Type of Beer: ${beer.beer_type}</p>
    <p>IBU: ${beer.ibu}</p>
    <p>ABV: ${beer.abv}</p>`)

  // clear show_beer contents
  $('div#show_beer').html("")

  // conditional statement for buttons and html
  if (findIndex === 0) {
    $('div#show_beer').html(`${beerInfoTemplate}
      <a href="/beers/${beer.id}/edit">Edit</a>
      <a href="/beers/${userBeers[findIndex+1].id}" class="next_beer">Next Beer</a>`)
  } else if (findIndex === userBeers.length - 1) {
    $('div#show_beer').html(`${beerInfoTemplate}
      <a href="/beers/${userBeers[findIndex-1].id}" class="prev_beer">Previous Beer</a>
      <a href="/beers/${beer.id}/edit">Edit</a>`)
  } else {
    $('div#show_beer').html(`${beerInfoTemplate}
      <a href="/beers/${userBeers[findIndex-1].id}" class="prev_beer">Previous Beer</a>
      <a href="/beers/${beer.id}/edit">Edit</a>
      <a href="/beers/${userBeers[findIndex+1].id}" class="next_beer">Next Beer</a>`)
  }
}

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
        const $ol = $("div.beers ol")
        $ol.append(response);
      },
      error: function(response) {
        alert("Please fill out all criteria.");
      },
    });
  })

  // show next beer request
  $('#show_beer').on('click', 'a.next_beer', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.href,
      data: $(this).serialize(),
      dataType: 'json',
      success: function(response) {
        getBeer(response)
      },
      error: function(response) {
        alert("Oops! Something went wrong!")
      }
    })
  })

  // show previous beer request
  $('#show_beer').on('click', 'a.prev_beer', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.href,
      dataType: 'json',
      success: function(response) {
        getBeer(response)
      },
      error: function(response) {
        alert("Oops! Something went wrong!")
      }
    })
  })
})

// todo - add prototype function
  // isHoppy returns true if ibu >= 40
  // combine beer abv and ibu as "beer info"

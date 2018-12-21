// JSON Beer Constructor
function Beer(beerData) {
  this.name = beerData.name
  this.beerType = beerData.beer_type
  this.ibu = beerData.ibu
  this.abv = beerData.abv
  this.brewery = beerData.brewery
  this.user = beerData.user
  this.id = beerData.id
}

Beer.prototype.pour = function() {
  $(document.body).append(`<p>Pouring a nice glass of ${this.name}</p>`)
}

Beer.prototype.beerInfoTemplate = function() {
  return (`<h3>${this.name}</h3>
    <p>Brewery: ${this.brewery.name}</p>
    <p>Type of Beer: ${this.beerType}</p>
    <p>IBU: ${this.ibu}</p>
    <p>ABV: ${this.abv}</p>`)
}

// Beer.prototype.info = function() {
//   return "<p>IBU: " this.ibu + "</p>" + "<p>ABV: " + this.abv + "</p>"
// }

// do i need to put function(beer) ??

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
  const beer = new Beer(data)
  var userBeers = beer.user.beers

  // locate index of beer
  var findIndex = userBeers.map(function(e) {return e.id}).indexOf(beer.id)

  // clear show_beer contents
  $('div#show_beer').html("")

  // conditional statement for buttons and html
  if (findIndex === 0) {
    $('div#show_beer').html(`${beer.beerInfoTemplate()}
      <a href="/beers/${beer.id}/edit">Edit</a>
      <a href="/beers/${userBeers[findIndex+1].id}" class="next_beer">Next Beer</a>`)
  } else if (findIndex === userBeers.length - 1) {
    $('div#show_beer').html(`${beer.beerInfoTemplate()}
      <a href="/beers/${userBeers[findIndex-1].id}" class="prev_beer">Previous Beer</a>
      <a href="/beers/${beer.id}/edit">Edit</a>`)
  } else {
    $('div#show_beer').html(`${beer.beerInfoTemplate()}
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

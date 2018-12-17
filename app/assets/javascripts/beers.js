// JSON Beer Constructor
function Beer(name, beer_type, ibu, abv, brewery_id, user_id) {
  this.name = name
  this.beer_type = beer_type
  this.ibu = ibu
  this.abv = abv
  this.brewery_id = brewery_id
  this.user_id = user_id
  this.idOfNext = 0
  this.idOfLast = 0
}

// clear form
const clearForm = () => {
  $("#beer_name").val("");
  $("#beer_brewery_attributes_name").val("");
  $("#beer_beer_type").val("");
  $("#beer_ibu").val("");
  $("#beer_abv").val("");
}

// prototype example function
Beer.prototype.successMessage = function() {
  alert(`${this.name} successfully created.`)
}

// next beer function
function getBeer(data) {
  const beer = data
  const userBeers = beer.user.beers

  // beer checks
  const lastBeerCheck = () => userBeers[userBeers.indexOf(findBeer[0]) - 1]
  const nextBeerCheck = () => userBeers[userBeers.indexOf(findBeer[0]) + 1]

  // set id functions
  const setIdOfNext = () => userBeers[userBeers.indexOf(findBeer[0]) + 1].id
  const setIdOfLast = () => userBeers[userBeers.indexOf(findBeer[0]) - 1].id

  // find beer
  const findBeer = userBeers.filter(userBeer => userBeer.id === beer.id)

  // set id's
  beer.idOfNext = nextBeerCheck() ? setIdOfNext() : 0
  beer.idOfLast = lastBeerCheck() ? setIdOfLast() : 0

  $('div#show_beer').html("")
  $('div#show_beer').html(`<h3>${beer.name}</h3>
    <p>Brewery: ${beer.brewery.name}</p>
    <p>Beer Type: ${beer.beer_type}</p>
    <p>IBU: ${beer.ibu}</p>
    <p>ABV: ${beer.abv}</p>
    <a href="/beers/${beer.idOfLast}" class="prev_beer">Previous Beer</a>
    <a href="/beers/${beer.id}/edit">Edit</a>
    <a href="/beers/${beer.idOfNext}" class="next_beer">Next Beer</a>`)
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

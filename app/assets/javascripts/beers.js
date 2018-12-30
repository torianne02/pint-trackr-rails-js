// JSON Beer Constructor
class Beer {
  constructor(beerData) {
    this.name = beerData.name
    this.beerType = beerData.beer_type
    this.ibu = beerData.ibu
    this.abv = beerData.abv
    this.brewery = beerData.brewery
    this.user = beerData.user
    this.id = beerData.id
  }
}

// html template for beer info
Beer.prototype.beerInfoTemplate = function() {
  return `<h3><a href="/beers/${this.id}", class="show-beer">${this.name}</a></h3>
    <p><a href="/breweries/${this.brewery.id}", class="show-brewery">${this.brewery.name}</a></p>
    <p>Type of Beer: ${this.beerType}</p>
    <p>IBU: ${this.ibu}</p>
    <p>ABV: ${this.abv}</p>`
}

// html template for brewery beer info
Beer.prototype.breweryBeerInfoTemplate = function () {
  return `<li>${this.name} | ${this.beerType}</li>`
}

// html template for beer list
Beer.prototype.beerListElementTemplate = function() {
  return `<li><h3><a href="/beers/${this.id}", class="show-beer">${this.name}</a></h3>
    <p><a href="/breweries/${this.brewery.id}", class="show-brewery">${this.brewery.name}</a></p>
    <p>Type of Beer: ${this.beerType}</p>
    <p>IBU: ${this.ibu}</p>
    <p>ABV: ${this.abv}</p></li>`
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
function getBeer(data) {
  const beer = new Beer(data)
  var userBeers = beer.user.beers

  // locate index of beer
  var findIndex = userBeers.map(function(e) {return e.id}).indexOf(beer.id)

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

// render list of a user's beers
function getUserBeers(data) {
  const userBeers = data
  var userBeersHTML = ``

  for (i = 0; i < userBeers.length; i++) {
    const beer = new Beer(userBeers[i])
    userBeersHTML += beer.beerListElementTemplate()
  }

  const $ol = $('div#show_user_beers ol')
  $ol.html(`${userBeersHTML}`)
}

// render list of a brewery's beers
function showMoreBreweryBeers(data) {
  const breweryBeers = data
  var breweryShowHTML = ``

  for (i = 0; i < breweryBeers.length; i++) {
    const beer = new Beer(breweryBeers[i])
    breweryShowHTML += beer.breweryBeerInfoTemplate()
  }

  $('div#show_brewery ul').html('');
  $('div#show_brewery ul').html(`${breweryShowHTML}`)
}

$(function() {
  // new beer request
  $('#add-beer-form').on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: "POST",
      data: $(this).serialize(),
      success: function(response) {
        clearForm();
        $("div#show_user_beers").append(response);
        // $ol.append(response);
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

  // show users beers on user show page request
  $('#show_user').on('click', 'a.show_user_beers', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.href,
      dataType: 'json',
      success: function(response) {
        getUserBeers(response)
      },
      error: function(response) {
        alert("Oops! Something went wrong!")
      }
    })
  })

  // show beer page
  $('#show_user_beers').on('click', 'a.show-beer', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.href,
      dataType: 'json',
      success: function(response) {
        $('div#show_user').html('')
        getBeer(response)
      },
      error: function(response) {
        alert("Oops! Something went wrong!")
      }
    })
  })

  // show brewery's beers on brewery show page request
  $('#show_brewery').on('click', 'button.show_more', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      dataType: 'json',
      success: function(response) {
        showMoreBreweryBeers(response)
      },
      error: function(response) {
        debugger
        alert("Oops! Something went wrong!")
       }
    })
  })

  // request to show form via add-beer button
  $('#show_user').on('click', 'button#add-beer', function(e) {
    e.preventDefault()
    $.ajax({
      url: '/add_beer_form',
      type: 'get',
      success: function(response) {
        $('#add-beer-form').html(response)
        $('button#add-beer').html('')
      }
    })
  })
})

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

// html template for beer list
Beer.prototype.beerListElementTemplate = function() {
  return `<li><h3><a href="/beers/${this.id}", class="show-beer">${this.name}</a></h3>
    <p><a href="/breweries/${this.brewery.id}", class="show-brewery">${this.brewery.name}</a></p>
    <p>Type of Beer: ${this.beerType}</p>
    <p>IBU: ${this.ibu}</p>
    <p>ABV: ${this.abv}</p></li>`
}

// html template for beer info
Beer.prototype.beerInfoTemplate = function() {
  return `<h3>${this.name}</h3>
    <p>${this.brewery.name}</p>
    <p>Type of Beer: ${this.beerType}</p>
    <p>IBU: ${this.ibu}</p>
    <p>ABV: ${this.abv}</p>`
}

// html template for brewery
Beer.prototype.breweryTemplate = function() {
  return `<h3>${this.brewery.name}</h3>
  <ul>
    <li>${this.brewery.beers[0].name}</li>
    <button class="show-more">Show More</button>
  </ul>`
}

// html template for brewery beer info
Beer.prototype.breweryBeerInfoTemplate = function () {
  return `<li>${this.name} | ${this.beerType}</li>`
}

// clear form
const clearForm = () => {
  $("#beer_name").val("");
  $("#beer_brewery_attributes_name").val("");
  $("#beer_beer_type").val("");
  $("#beer_ibu").val("");
  $("#beer_abv").val("");
}

// render list of a user's beers
function getUserBeers(data) {
  const userBeers = data
  var userBeersHTML = ``

  for (i = 0; i < userBeers.length; i++) {
    const beer = new Beer(userBeers[i])
    userBeersHTML += beer.beerListElementTemplate()
  }

  const $ol = $('div#show-user-beers ol')
  $ol.html(`${userBeersHTML}`)
  $('div#show-user-beers div#add-beer-form').html(`<button id="add-beer">Add Beer</button>`)
}

// next/prev beer function
function getBeer(data) {
  const beer = new Beer(data)
  var userBeers = beer.user.beers

  // locate index of beer
  var findIndex = userBeers.map(function(e) {return e.id}).indexOf(beer.id)

  $('div#show-beer').html("")

  // conditional statement for buttons and html
  if (findIndex === 0) {
    $('div#show-beer').html(`${beer.beerInfoTemplate()}
      <a href="/beers/${beer.id}/edit">Edit</a>
      <a href="/beers/${userBeers[findIndex+1].id}" class="next-beer">Next Beer</a>`)
  } else if (findIndex === userBeers.length - 1) {
    $('div#show-beer').html(`${beer.beerInfoTemplate()}
      <a href="/beers/${userBeers[findIndex-1].id}" class="prev-beer">Previous Beer</a>
      <a href="/beers/${beer.id}/edit">Edit</a>`)
  } else {
    $('div#show-beer').html(`${beer.beerInfoTemplate()}
      <a href="/beers/${userBeers[findIndex-1].id}" class="prev-beer">Previous Beer</a>
      <a href="/beers/${beer.id}/edit">Edit</a>
      <a href="/beers/${userBeers[findIndex+1].id}" class="next-beer">Next Beer</a>`)
  }
}

// render brewery show page
function getBrewery(data) {
  const breweryBeers = data
  const breweryShowHTML = ``

  const beer = new Beer(breweryBeers[0])
  const brewery = beer.brewery

  $('div#show-brewery').html("")
  $('div#show-brewery').html(`${beer.breweryTemplate()}`)
}

// render list of a brewery's beers
function showMoreBreweryBeers(data) {
  const breweryBeers = data
  var breweryListHTML = ``

  for (i = 0; i < breweryBeers.length; i++) {
    const beer = new Beer(breweryBeers[i])
    breweryListHTML += beer.breweryBeerInfoTemplate()
  }

  $('div#show-brewery ul').html('');
  $('div#show-brewery ul').html(`${breweryListHTML}`)
}

$(function() {
  // request to show form via add-beer button
  $('#add-beer-form').on('click', 'button#add-beer', function(e) {
    e.preventDefault()
    $.ajax({
      url: '/add_beer_form',
      type: 'GET',
      success: function(response) {
        $('#add-beer-form').html('')
        $('#add-beer-form').html(response)
      },
      error: function(response) {
        alert("Oops! Something went wrong!")
      }
    })
  })

  // new beer request
  $('#add-beer-form').on("submit", 'form#new_beer.new_beer', function(e) {
    e.preventDefault();
    $.ajax({
      url: this.action,
      type: "POST",
      data: $(this).serialize(),
      success: function(response) {
        clearForm()
        const $ol = $("div#show-user-beers ol")
        $ol.append(response);
      },
      error: function(response) {
        alert("Please fill out all criteria.");
      },
    });
  })

  // show list of users beers on user show page request
  $('#show-user').on('click', 'a.list-beers', function(e) {
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

  // render show beer page
  $('#show-user-beers').on('click', 'a.show-beer', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.href,
      dataType: 'json',
      success: function(response) {
        $('div#show-user').html('')
        getBeer(response)
      },
      error: function(response) {
        alert("Oops! Something went wrong!")
      }
    })
  })

  // show next beer request
  $('#show-beer').on('click', 'a.next-beer', function(e) {
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
  $('#show-beer').on('click', 'a.prev-beer', function(e) {
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

  // render show brewery page
  $('#show-user-beers').on('click', 'a.show-brewery', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.href,
      dataType: 'json',
      success: function(response) {
        $('div#show-user').html('')
        getBrewery(response)
      },
      error: function(response) {
        alert("Oops! Something went wrong!")
      }
    })
  })

  // show brewery's beers on user show page request
  $('#show-brewery').on('click', 'button.show-more', function(e) {
    e.preventDefault();
    debugger
    $.ajax({
      type: "GET",
      dataType: 'json',
      success: function(response) {
        debugger
        showMoreBreweryBeers(response)
      },
      error: function(response) {
        console.log(response)
        alert("Oops! Something went wrong!")
       }
    })
  })
})

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
  return `<li class="list-group-item"><h5><a href="/beers/${this.id}", class="show-beer", style='color: #000000;'>${this.name}</a></h5>
    <p><a href="/breweries/${this.brewery.id}", class="show-brewery", style='color: #000000;'>${this.brewery.name}</a></p>
    <p>Type of Beer: ${this.beerType}</p>
    <p>IBU: ${this.ibu}</p>
    <p>ABV: ${this.abv}%</p></li>`
}

// html template for beer info
Beer.prototype.beerInfoTemplate = function() {
  return `<h4>${this.name}</h4>
    <p>${this.brewery.name}</p>
    <p>Type of Beer: ${this.beerType}</p>
    <p>IBU: ${this.ibu}</p>
    <p>ABV: ${this.abv}%</p>`
}

// html template for brewery
Beer.prototype.breweryTemplate = function() {
  return `<h3>${this.brewery.name}</h3>
  <ul class="list-group">
    <li class="list-group-item">${this.brewery.beers[0].name} | ${this.brewery.beers[0].beer_type}</li>
    <a href="/breweries/${this.brewery.id}" id="show-more" class="btn btn-outline-secondary">Show More</a>
  </ul>`
}

// html template for brewery beer info
Beer.prototype.breweryBeerInfoTemplate = function () {
  return `<li class="list-group-item">${this.name} | ${this.beerType}</li>`
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
  let userBeersHTML = ``

  for (i = 0; i < userBeers.length; i++) {
    const beer = new Beer(userBeers[i])
    userBeersHTML += beer.beerListElementTemplate()
  }

  let $ul = $('div#show-user-beers ul')
  $ul.html(`${userBeersHTML}`)

  $('div#show-user-beers div#sort-button').html('<button type="button" class="btn btn-outline-secondary" id="sort-beer" href="/beers">Sort Beer</button>')
  $('div#show-user-beers div#add-beer-form').html(`<button type="button" class="btn btn-outline-secondary" id="add-beer">Add Beer</button>`)
}

// next/prev beer function
function getBeer(data) {
  const beer = new Beer(data)
  let userBeers = beer.user.beers

  // locate index of beer
  let findIndex = userBeers.map(function(e) {return e.id}).indexOf(beer.id)

  $('div#show-beer').html("")

  // conditional statement for buttons and html
  if (findIndex === 0) {
    $('div#show-beer').html(`${beer.beerInfoTemplate()}
      <a href="/beers/${beer.id}/edit" class="btn btn-outline-secondary">Edit</a>
      <a href="/beers/${userBeers[findIndex+1].id}" class="btn btn-outline-secondary" id="next-beer">Next Beer</a>`)
  } else if (findIndex === userBeers.length - 1) {
    $('div#show-beer').html(`${beer.beerInfoTemplate()}
      <a href="/beers/${userBeers[findIndex-1].id}" class="btn btn-outline-secondary" id="prev-beer">Previous Beer</a>
      <a href="/beers/${beer.id}/edit" class="btn btn-outline-secondary">Edit</a>`)
  } else {
    $('div#show-beer').html(`${beer.beerInfoTemplate()}
      <a href="/beers/${userBeers[findIndex-1].id}" class="btn btn-outline-secondary" id="prev-beer">Previous Beer</a>
      <a href="/beers/${beer.id}/edit" class="btn btn-outline-secondary">Edit</a>
      <a href="/beers/${userBeers[findIndex+1].id}" class="btn btn-outline-secondary" id="next-beer">Next Beer</a>`)
  }
}

// render brewery show page
function getBrewery(data) {
  const breweryBeers = data
  let breweryShowHTML = ``
  const beer = new Beer(breweryBeers[0])

  $('div#show-brewery').html("")
  $('div#show-brewery').html(`${beer.breweryTemplate()}`)
}

// render list of a brewery's beers
function showMoreBreweryBeers(data) {
  const breweryBeers = data
  let breweryListHTML = ``

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
        let $ul = $("div#show-user-beers ul")
        $ul.append(response);
      },
      error: function(response) {
        alert("Please fill out all criteria.");
      },
    });
  })

  // show list of users beers on user show page request
  $('#show-user').on('click', 'a#list-beers', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.href,
      dataType: 'json',
      success: function(response) {
        $('.list-beers-container').html('')
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
  $('#show-beer').on('click', 'a#next-beer', function(e) {
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
  $('#show-beer').on('click', 'a#prev-beer', function(e) {
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
  $('#show-brewery').on('click', 'a#show-more', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.href,
      dataType: 'json',
      success: function(response) {
        showMoreBreweryBeers(response)
      },
      error: function(response) {
        console.log(response)
        alert("Oops! Something went wrong!")
       }
    })
  })

  // sorts beers by alcohol percentage - task assigned during live coding
  $('#show-user').on('click', 'button#sort-beer', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: $(this).attr('href'),
      dataType: 'json',
      success: function(response) {
        const sortedBeers = response.sort(function(a, b) {
          if (b.abv != a.abv) {
            return b.abv - a.abv
          }
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0
        });
        getUserBeers(sortedBeers)
        $('#sort-button').html('')
      },
      error: function(response) {
        console.log(response)
        alert("Oops! Something went wrong!")
       }
    })
  })
})

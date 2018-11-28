// JSON Beer Constructor
function Beer(name, beer_type, ibu, abv, brewery_id, user_id) {
  this.name = name
  this.beer_type = beer_type
  this.ibu = ibu
  this.abv = abv
  this.brewery_id = brewery_id
  this.user_id = user_id
}

// successFunction - new beer
function newBeer(json) {
  const beer = new Beer(json)
  const newBeerTemp = beer.renderBeer()
  $('div#add_beer').html(newBeerTemp)
}

// compile new beer
Beer.prototype.renderBeer = function() {
  return Beer.templateNewBeer(this)
}

// Submit form using AJAX
$(function() {
  $('#new-beer-form').on("submit", function(e) {
    e.preventDefault();
    $.ajax({
       url: this.action,
       method: "POST",
       data: $( this ).serialize(),
       processData: false,
       success: function(response){
         newBeer(response)
       }
    })
    // let formData = new FormData({
    //   name: 'name',
    //   beer_type: 'beer_type',
    //   ibu: 'IBU',
    //   abv: 'ABV',
    //   brewery: {
    //     name: 'brewery_name',
    //     city: 'brewrery_city',
    //     state: 'brewery_state'
    //   }
    // })
    //
    // const url = 'http://localhost:3000/beers'
    // const token = document.getElementsByName("authenticity_token")[0].value
    //
    // fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${token}`
    //   }
    // })
    //   .then(res => res.json())
    //   .then(json => console.log(json));
  })
})

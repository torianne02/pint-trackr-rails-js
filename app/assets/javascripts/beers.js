// JSON Beer Constructor
function Beer(name, beer_type, ibu, abv, brewery_id, user_id) {
  this.name = name
  this.beer_type = beer_type
  this.ibu = ibu
  this.abv = abv
  this.brewery_id = brewery_id
  this.user_id = user_id
}

// Submit form using AJAX
$(function() {
  $('#new-beer-form').on("submit", function(e) {
    e.preventDefault();
    let formData = {
      name: 'name',
      beer_type: 'beer_type',
      ibu: 'IBU',
      abv: 'ABV',
      brewery: {
        name: 'brewery_name',
        city: 'brewrery_city',
        state: 'brewery_state'
      }
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData)
      headers: {
        Authorization: `token ${token}`
      }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  })
})

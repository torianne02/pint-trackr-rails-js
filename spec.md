# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project
- [x] Include at least one has_many relationship (User has_many (drinks many) Beers - - Brewery has_many (makes many) Beers)
- [x] Include at least one belongs_to relationship (Beer belongs_to (made by) Brewery - - Beer belongs_to (bought by) User)
- [x] Include at least one has_many through relationship (User has_many Breweries through (drinking) Beer - - Brewery has_many Users through (selling/creating) Beer)
- [x] The "through" part of the has_many through includes at least one user submittable attribute (Beer has 4 submittable attributes: name, beer_type, ibu, abv)
- [x] Include reasonable validations for simple model objects (User, Beer, and Brewery all have simple validations)
- [x] Include a class level ActiveRecord scope method (User.beers URL: /user/:id/beers)
- [x] Include signup (post '/users/new', to: 'users#create')
- [x] Include login (get '/signin', to: 'sessions#new')
- [x] Include logout (get '/logout', to: 'sessions#destroy')
- [x] Include third party signup/login (get '/auth/facebook/callback' => 'sessions#create_from_oath')
- [x] Include nested resource show or index (users/:id/beers)
- [x] Include nested resource "new" form (users/:id/beers/new)
- [x] Include form display of validation errors (all forms include errors)

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [x] Views use helper methods if appropriate(current_user used)
- [x] Views use partials if appropriate(render forms)

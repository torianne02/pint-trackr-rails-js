# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project
- [x] Include at least one has_many relationship (User has_many (drinks many) Beers - - Brewery has_many (makes many) Beers)
- [x] Include at least one belongs_to relationship (Beer belongs_to (made by) Brewery - - Beer belongs_to (bought by) User)
- [x] Include at least one has_many through relationship (User has_many Breweries through (drinking) Beer - - Brewery has_many Users through (selling/creating) Beer)
- [x] The "through" part of the has_many through includes at least one user submittable attribute (Beer has 4 submittable attributes: name, beer_type, ibu, abv)
- [x] Include reasonable validations for simple model objects (User, Beer, and Brewery all have simple validations)
- [ ] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes)
- [ ] Include signup (how e.g. Devise)
- [ ] Include login (how e.g. Devise)
- [ ] Include logout (how e.g. Devise)
- [ ] Include third party signup/login (how e.g. Devise/OmniAuth)
- [ ] Include nested resource show or index (URL e.g. users/2/recipes)
- [ ] Include nested resource "new" form (URL e.g. recipes/1/ingredients)
- [ ] Include form display of validation errors (form URL e.g. /recipes/new)

Confirm:
- [ ] The application is pretty DRY
- [ ] Limited logic in controllers
- [ ] Views use helper methods if appropriate
- [ ] Views use partials if appropriate

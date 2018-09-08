# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Users
User.create(username: 'torianne', email: 'torianne@gmail.com', password: 'password')
User.create(username: 'kevcraw', email: 'kevcraw@gmail.com', password: 'password1')
User.create(username: 'coachflu', email: 'coachflu@gmail.com', password: 'password2')
User.create(username: 'torrnado', email: 'torrnado@gmail.com', password: 'tornado1')

# Breweries
Brewery.create(name: 'Yeunger', location: 'Pennsylvania')
Brewery.create(name: 'Guinny', location: 'Ireland')
Brewery.create(name: 'Coos', location: 'Colorado')
Brewery.create(name: 'Trolley', location: 'California')

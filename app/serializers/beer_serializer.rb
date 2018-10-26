class BeerSerializer < ActiveModel::Serializer
  attributes :id, :name, :beer_type, :ibu, :abv

  belongs_to :brewery
  belongs_to :user
end

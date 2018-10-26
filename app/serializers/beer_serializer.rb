class BeerSerializer < ActiveModel::Serializer
  attributes :id, :name, :beer_type, :ibu, :abv
end

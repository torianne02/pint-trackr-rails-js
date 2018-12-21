class BrewerySerializer < ActiveModel::Serializer
  attributes :name, :beers

  has_many :beers
end

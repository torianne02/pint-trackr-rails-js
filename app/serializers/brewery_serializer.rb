class BrewerySerializer < ActiveModel::Serializer
  attributes :name

  has_many :beers
end

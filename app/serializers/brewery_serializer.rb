class BrewerySerializer < ActiveModel::Serializer
  attributes :name, :beers, :id

  has_many :beers
  has_many :users
end

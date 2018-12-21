class BrewerySerializer < ActiveModel::Serializer
  attributes :name, :beers

  has_many :beers
  has_many :users
end

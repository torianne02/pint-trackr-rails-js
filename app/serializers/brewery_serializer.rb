class BrewerySerializer < ActiveModel::Serializer
  attributes :name, :city, :state

  has_many :beers
end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :beers

  has_many :beers
  has_many :breweries
end

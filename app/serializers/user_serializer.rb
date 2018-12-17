class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :beers

  has_many :beers
end

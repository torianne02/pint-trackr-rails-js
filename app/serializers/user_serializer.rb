class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :beers
end

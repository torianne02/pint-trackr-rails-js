class BeerSerializer < ActiveModel::Serializer
  attributes :id, :name, :beer_type, :ibu, :abv, :brewery

  belongs_to :brewery
  belongs_to :user
end

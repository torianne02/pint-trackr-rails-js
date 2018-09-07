class Beer < ActiveRecord::Base
  belongs_to :user
  belongs_to :brewery

  validates :name, :beer_type, :ibu, :abv, :presence => true
end

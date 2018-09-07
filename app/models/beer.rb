class Beer < ActiveRecord::Base
  belongs_to :user
  belongs_to :brewery
  accepts_nested_attributes_for :brewery

  validates :name, :beer_type, :ibu, :abv, :presence => true
end

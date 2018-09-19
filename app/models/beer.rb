class Beer < ActiveRecord::Base
  belongs_to :user
  belongs_to :brewery
  accepts_nested_attributes_for :brewery
  # has_many :users -- changes for future versions

  validates :name, :beer_type, :ibu, :abv, :presence => true
  scope :highest_ibu, -> {order(ibu: :desc)}
end

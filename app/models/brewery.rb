class Brewery < ActiveRecord::Base
  has_many :beers
  has_many :users, through: :beers

  validates :name, :presence => true
end

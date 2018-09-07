class User < ActiveRecord::Base
  has_secure_password

  has_many :beers
  has_many :breweries, through: :beers

  validates :username, :email, :password, :presence => true
  validates :username, uniqueness: true
end

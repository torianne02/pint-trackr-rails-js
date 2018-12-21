class BreweriesController < ApplicationController
  def index
    @breweries = Brewery.all
    # @breweries.each do |brewery|
    #   @beers = brewery.beers
    # end
  end
end

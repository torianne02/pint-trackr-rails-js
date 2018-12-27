class BreweriesController < ApplicationController
  def show
    @brewery = Brewery.find(params[:id])
    @beers = @brewery.beers

    respond_to do |format|
      format.html
      format.json { render json: @beers }
    end
  end
end

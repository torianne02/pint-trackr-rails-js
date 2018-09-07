# show needs @beers = Beer.all
class BeersController < ApplicationController
  before_action :set_user
  before_action :set_beer, only: %i[show edit update destroy]

  private

  def set_user
    @user = User.find(session[:user_id])
  end

  def set_beer
    @beer = Beer.find(params[:id])
  end

  def beer_params
    params.require(:beer).permit(
      :name,
      :beer_type,
      :ibu,
      :ebv,
      :user_id,
      brewery_attributes: %i[name location id]
    )
  end
end

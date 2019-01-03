class AddAbvToBeers < ActiveRecord::Migration[5.2]
  def change
    add_column :beers, :abv, :float
  end
end

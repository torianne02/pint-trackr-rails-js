class RemoveAbvFromBeers < ActiveRecord::Migration[5.2]
  def change
    remove_column :beers, :abv, :string
  end
end

class CreateBeers < ActiveRecord::Migration[5.2]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :beer_type
      t.integer :ibu
      t.decimal :abv
    end
  end
end

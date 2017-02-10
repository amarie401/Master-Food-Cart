class CreateItemsTable < ActiveRecord::Migration[5.0]

  def up
    create_table :items do |t|
      t.string :food_name
      t.boolean :vegetarian
      t.references :foodcart, foreign_key: 'foodcarts.id'
    end
  end

  def down
    drop_table :items
  end

end

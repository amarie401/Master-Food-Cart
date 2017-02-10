class CreateFoodcartsTable < ActiveRecord::Migration[5.0]

  def up
    create_table :foodcarts do |t|
      t.string :name
      t.string :description
      t.string :image
    end
  end

  def down
    drop_table :foodcarts
  end

end

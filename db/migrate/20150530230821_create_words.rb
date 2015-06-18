class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
    	t.string :pos
    	t.string :content
    end
  end
end

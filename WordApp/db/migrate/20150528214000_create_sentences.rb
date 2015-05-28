class CreateSentences < ActiveRecord::Migration
  def change
    create_table :sentences do |t|
    	t.string :word1
    	t.string :word2
    	t.string :word3
    	t.string :word4
    	t.string :word5
      t.timestamps null: false
    end
  end
end

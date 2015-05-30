class CreateSentences < ActiveRecord::Migration
  def change
    create_table :sentences do |t|
      # t.belongs_to :user
    	t.string 'words', array: true, default: []
      t.timestamps null: false
    end
    add_index :sentences, :words, using: 'gin'
  end
end

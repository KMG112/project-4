class CreateSentences < ActiveRecord::Migration
  def change
    create_table :sentences do |t|
      t.belongs_to :user
      t.string 'words', array: true, default: []
      t.timestamps null: false
      # t.string :current_word
    end
    add_index :sentences, :words, using: 'gin'
  end
end

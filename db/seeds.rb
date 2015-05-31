# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)




# user = CreateAdminService.new.call
# puts 'CREATED ADMIN USER: ' + user.email

user = User.new
user.email = 'test@example.com'
user.password = '12345678'
user.password_confirmation = '12345678'
user.save!


Word.create("pos" => "noun","content" => "time")
Word.create("pos" => "noun","content" => "person")
Word.create("pos" => "noun","content" => "year")
Word.create("pos" => "noun","content" => "way")
Word.create("pos" => "noun","content" => "day")
Word.create("pos" => "noun","content" => "thing")
Word.create("pos" => "noun","content" => "man")
Word.create("pos" => "noun","content" => "world")
Word.create("pos" => "noun","content" => "life")
Word.create("pos" => "noun","content" => "hand")
Word.create("pos" => "noun","content" => "part")
Word.create("pos" => "noun","content" => "child")
Word.create("pos" => "noun","content" => "eye")
Word.create("pos" => "noun","content" => "woman")
Word.create("pos" => "noun","content" => "place")
Word.create("pos" => "noun","content" => "work")
Word.create("pos" => "noun","content" => "week")
Word.create("pos" => "noun","content" => "case")
Word.create("pos" => "noun","content" => "point")
Word.create("pos" => "noun","content" => "government")
Word.create("pos" => "noun","content" => "company")
Word.create("pos" => "noun","content" => "number")
Word.create("pos" => "noun","content" => "group")
Word.create("pos" => "noun","content" => "problem")
Word.create("pos" => "noun","content" => "fact")


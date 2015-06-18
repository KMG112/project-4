class Word < ActiveRecord::Base
	belongs_to :sentences

	
	def self.getWord(pos)
		words = Word.where(pos: pos)
		words.pluck(:content).shuffle[0] #randomly picks record based on content
	end

	 
end

class SentencesController < ApplicationController
  before_action :set_sentence, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  # GET /sentences
  # GET /sentences.json
  def index
    @sentences = Sentence.where(user_id: current_user.id)
  end

  # GET /sentences/1
  # GET /sentences/1.json
  def show
      
 
  end

  # GET /sentences/new
  def new
    @sentence = Sentence.new
      i=0
      words = []
      pos_array = ["noun","noun","adjective","others","verb","verb"]
      while i<5
        word = Word.getWord(pos_array[i])
        words << word
        i+= 1
      end

      respond_to do |format|
          format.html
          format.json {
              render :json => {'content' => words}
          }
      
      end
  end




  # POST /sentences
  # POST /sentences.json
  def create

    @sentence = Sentence.new(sentence_params)
    @sentence.words = params[:words]
    @sentence.user_id = current_user.id
    respond_to do |format|
      if @sentence.save
        format.html { redirect_to @sentence, notice: 'Sentence was successfully created.' }
        format.json { render :show, status: :created, location: @sentence } 
       
      else
        format.html { render :new }
        format.json { render json: @sentence.errors, status: :unprocessable_entity }
      end
    end
  end

  

  # DELETE /sentences/1
  # DELETE /sentences/1.json
  def destroy
    @sentence.destroy
    respond_to do |format|
      format.html { redirect_to sentences_url, notice: 'Sentence was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sentence
      @sentence = Sentence.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sentence_params
      params[:sentence]
    end
end

var ready;
ready = function(){
	var sentence_array =[];
	var pathname = window.location.pathname; // Returns path 
	
	var createDroppableObject = function(){
  	  	$('#sentence_parts').append("<div id=droppable class='col-md-2'></div></div><div id=puncDrop class='col-md-1'></div")
  		
  	}//createDroppableObject end
  	
  		// getting data from database
	var ajax = function(){
		$.ajax({
			    type: "GET",
			    url: "/sentences/new",
			    dataType: "json" 
		 }).done(function(data) {
			      for(var j=0; j<data.content.length; j++){	       
			      	 $('#box'+j).text(data.content[j]);
			      	};
			    })//ajax.done end
	}//ajax function end


	$('#new_sentence').on('submit', function(event){
		event.preventDefault();
        $.ajax({
		  type: "POST",
		  url: "/sentences",
		  data: {words: sentence_array},
		}).done(function (response) {
  			window.location = '/sentences'
		});
		
	});// new_sentence submit end


	// creating draggable objects with for statement
	// objects created will get value from the position they are in, 
	// in the active record array
	var createDrag = function(box){

		$('#words').remove();

		$('#words_holder').append('<div id="words"></div>')
			for(var i=0; i<10; i++){
				$('#words').append("<div id=box"+i+" class='col-md-2'>");
				
				
				$('#box'+i).draggable({
		  			revert: "invalid"
		  		});
		  		
		  		$('#box'+i).on('drag', function(){
		  			makeDroppable(this);
		  		});
		  	animateIncomingWordBoxes($('#box'+i))
		 	createSuffixDroppable($('#box'+i))
			}// for loop end
			
		ajax(); 
		 	
	}//createDrag ends


	var renamingDroppableObjects = function(currentBox){
		$(currentBox).removeAttr('id');
  		$(currentBox).attr('id', 'dropped');
	}


	var wordDropTextTransfer = function(droppableBox, wordBox){
		sentence_array.push($(wordBox).text());
  		var current_text = $(droppableBox).text()
  		$(droppableBox).text($(wordBox).text()+current_text);
	}
  
	// function to make only selected item dropped into droppable div    
	var makeDroppable = function(box){

    	$('#droppable').droppable({
    	
    		accept: box,

    		drop: function( event, ui ) {
    		animateDroppingWords();                		
            $(box).position({
            	  of: $('#droppable'),
                  my: "center"      	  
            	          });

            renamingDroppableObjects(this)
  			wordDropTextTransfer(this, box);
            $(this).off();   //turns off droppability 
            setTimeout(createDroppableObject, 600);
  			setTimeout(createDrag, 600, box);

          } //drop end

    	}); //.droppable end
    
  	} //make droppable end


  	$('#suffixes p').draggable({
    	revert: "invalid",
    	drag: function(){

    		$('#suffixes p').addClass("now");
    	}
    	});
 

  	// };
  	function createSuffixDroppable(box){
  		box.droppable({
  			accept: '#suffix',
  			drop: function(event, ui){
  				var current_text = $(this).text()
  				$(this).text(current_text+$(ui.draggable[0]).text())
  				$(ui.draggable[0]).text(" ")//makes suffix invisable to user
  				
  			}//end of drop:
  		});//end suffix droppable

	};// end of create suffixHolders


	function createPunctuationDrag(box){  	
	  	box.draggable({
	    	revert: "invalid",
	    	drag: function(){
	    	}
	    	});//end punctuation draggable
	  }// end create Punctuation Drag


  	function createPunctuationDroppable(box){
	  		var current_punc_drop = $('#sentence_parts #puncDrop');
	  		current_punc_drop.droppable({
	  		  		accept: box,
	  	 			drop: function(event, ui){	 	
	 				var current_text = $(this).text()
	 				sentence_array.push($(ui.draggable[0]).text())
	   				$(this).text(current_text+$(ui.draggable[0]).text())
	   				$(ui.draggable[0]).remove()//makes punctuation box invisable to user
	   				$('#puncDrop').attr('id', 'puncDropped')
	  				
	  		  		}//end of drop:
	  		});//end punctuation droppable
	  
	};// end of createPunctuationHolders

	for(var k=0; k<8; k++){
		createPunctuationDrag($('#punc'+k))

		$('#punc'+k).on('drag', function(){
		  	createPunctuationDroppable(this);
		  		});
	}//end createpunctuationDroppable for loop



	if(pathname==='/sentences/new'){ // only renders on new page
		createDroppableObject();// creates the bucket to drop word into
		ajax();// fetches data from rails controller
		createDrag(); // creates draggable words
	};

	function animateIncomingWordBoxes(box){
		var randRotation = Math.floor((Math.random()*500)+10);		
		TweenMax.from($(box), 1, {left: "900px", rotation:randRotation, scale:3});
	} // end animateIncomingWordBoxes

	animateDroppingWords = function(){
		TweenMax.staggerTo($("#words div"), .5, {y:1000}, 0.01)
	}// end animateDroppingWords
};

$(document).ready(ready);
$(document).on('page:load', ready);
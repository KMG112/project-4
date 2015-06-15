var ready;
ready = function(){
	var sentence_array =[];
	var pathname = window.location.pathname; // Returns path 
	var counter =0;
	var createDroppableObject = function(){
		
  	  	$('#sentence_parts').append("<div id=droppable class='col-md-2'></div><div id=puncDrop"+counter+" class='puncSelector col-md-1'></div")
  		counter ++
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
		$(body).append("<div class='biggah'>"+sentence_array.join(" ")+"</div>")
		event.preventDefault();
        $.ajax({
		  type: "POST",
		  url: "/sentences",
		  data: {words: sentence_array},
		}).done(function (response) {
			$('.major').remove();
			TweenMax.fromTo($('.biggah'), 1,{autoAlpha: 0, backgroundColor: '#87CEFF', width: '800px', height: '300px', x: '300px',y: '-500', boxShadow: '2px 4px 10px black, -3px -2px 7px black inset'}, {autoAlpha: .97, color: 'black', scale: 1.2, borderRadius: '10px', boxShadow: '10px 10px 40px black, -3px -2px 7px black inset'})
  			$('body').on('click', function(){window.location = '/sentences'});
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
    	}
    	});
 

  	// };
  	function createSuffixDroppable(box){
  		box.droppable({
  			accept: '#suffix',
  			drop: function(event, ui){
  				var current_text = $(this).text()
  				$(this).text(current_text+$(ui.draggable[0]).text())
  				$(ui.draggable[0]).remove()//makes suffix invisable to user
  				
  			}//end of drop:
  		});//end suffix droppable

	};// end of create suffixHolders


	for(var k=0; k<8; k++){
		createPunctuationDrag($('#punc'+k));
	}//end createpunctuationDroppable for loop

	function createPunctuationDrag(box){  	
	  	box.draggable({
	    	revert: "invalid",
	    	drag: function(){
	    		createPunctuationDroppable(box);
	    	}
	    	});//end punctuation draggable
	  }// end create Punctuation Drag


  	function createPunctuationDroppable(box){
	  		var current_punc_drops = $('#sentence_parts .puncSelector');
	 for(var p=0; p<current_punc_drops.length; p++){	
			var current_punc_drop = $('#puncDrop'+[p]);
			if(current_punc_drop){
				current_punc_drop.droppable({
						accept: box,
					    drop: function(event, ui){
						  	sentence_array.push($(ui.draggable[0]).text());
						  	$(this).text($(ui.draggable[0]).text());
						  	$(ui.draggable[0]).remove();//makes punctuation box invisable to user
						  	$(this).attr('id', 'puncDropped');				
						}//end of drop:
				});//end punctuation droppable	
			}//if ends
	  }//end punc for loop
	};// end of createPunctuationHolders



	if(pathname==='/sentences/new'){ // only renders on new page
		createDroppableObject();// creates the bucket to drop word into
		ajax();// fetches data from rails controller
		createDrag(); // creates draggable words
	};


	if(pathname==='/'){
		TweenMax.from($('#welcome h1'), 1, {rotation: 360})
		TweenMax.from($('#welcome'),1, {left: "900px", position: 'relative', ease:Bounce.easeOut, width: "200px"})
		setTimeout(TweenMax.to($('#welcome'),1,{scale: 8}), 1500)
		$('body').on('click', function(){
			TweenMax.to($('#welcome'), 2, {right: "9000px", position: 'relative', ease:Bounce.easeOut})
			setTimeout(function(){window.location = '/sentences'}, 500)
		});
	}
	function animateIncomingWordBoxes(box){
// 		$('.audio').html(
// "<embed src='"+'../public/SF.mp3'+"' hidden=true autostart=true loop=false>");
		var randRotation = Math.floor((Math.random()*500)+10);		
		TweenMax.from($(box), 1, {left: "900px", rotation:randRotation, scale:3});
	} // end animateIncomingWordBoxes

	animateDroppingWords = function(){
		TweenMax.staggerTo($("#words div"), .5, {y:1000}, 0.01)
	}// end animateDroppingWords
};

$(document).ready(ready);
$(document).on('page:load', ready);
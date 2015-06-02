var ready;
ready = function(){
	var sentence_array =[];
	var pathname = window.location.pathname; // Returns path 
	
	var createDroppableObject = function(){
  	  	$('#sentence_parts').append("<div id=droppable class='ui-widget-header'></div>")
  	
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
				  	console.log("sent success");
				  	console.log(response);
				});
		window.location = '/sentences/'
	});// new_sentence submit end


	// creating draggable objects with for statement
	// objects created will get value from the position they are in, 
	// in the active record array
	var createDrag = function(box){

		$('#words').remove();
		$('body').append('<div id="words"></div>')
			for(var i=0; i<5; i++){
				$('#words').append("<div id=box"+i+" class='ui-widget-header'></div>");
				
	
				$('#box'+i).draggable({
		  			revert: "invalid"
		  		});
		  		
		  		$('#box'+i).on('drag', function(){
		  			makeDroppable(this);
		  		});
		 	createSuffixDroppable($('#box'+i))
			}// for loop end
			
		ajax() 
		 	
	}//createDrag ends


	var renamingDroppableObjects = function(currentBox){
		$(currentBox).removeAttr('id');
  		$(currentBox).attr('id', 'dropped');
	}


	var wordTextTransfer = function(droppableBox, wordBox){
		sentence_array.push($(wordBox).text());
  		var current_text = $(droppableBox).text()
  		$(droppableBox).text($(wordBox).text()+current_text);
	}
  	
	// function to make only selected item dropped into droppable div    
	var makeDroppable = function(box){

    	$('#droppable').droppable({
    		accept: box,
    		drop: function( event, ui ) {
    	
            $( this ).addClass( "ui-state-highlight" );                 		
            $(box).position({
            	  of: $('#droppable'),
                  my: "center"      	  
            	          });
            renamingDroppableObjects(this)
  			wordTextTransfer(this, box);
            $(this).off();   //turns off droppability 
            createDroppableObject();	 	 	 
        	createDrag(box);
          } //drop end

    	}); //.droppable end
    
  		
  	} //make droppable end


  	$('#suffixes p').draggable({
    	revert: "invalid",
    	drag: function(){
    		// console.log(this)
    		$('#suffixes p').addClass("now");
    	}
    	});

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


	if(pathname==='/sentences/new'){ // only renders on new page
		createDroppableObject();// creates the bucket to drop word into
		ajax();// fetches data from rails controller
		createDrag(); // creates draggable words
	};
	
	

};

$(document).ready(ready);
$(document).on('page:load', ready);
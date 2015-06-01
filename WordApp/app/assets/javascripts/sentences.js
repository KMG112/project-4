
$(document).ready(function(){
	var sentence_array =[];
	var droppables = 0;
	var createDroppableObject = function(){
  	  	$('#sentence_parts').append("<div id=droppable class='ui-widget-header'></div>")
  	}//createDroppableObject end
  	createDroppableObject();


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
		 	
			}// for loop end
			$.ajax({
			    type: "GET",
			    url: "/sentences/new",
			    dataType: "json",
			    success: function(data) {			    	
			      for(var j=0; j<data.content.length; j++){	
			      	 $('#box'+j).text(data.content[j]);    
			      	 
			      	};
			    }//success end
			 
		 	});//ajax end
	}//createDrag ends
  	createDrag();
	// function to make only selected item dropped into droppable div    
	var makeDroppable = function(box){

    	$('#droppable').droppable({

    		drop: function( event, ui ) {
    			
            $( this ).addClass( "ui-state-highlight" );                 		
            $(box).position({
            	  of: $('#droppable'),
                  my: "center"      	  
            	          });
            $(this).removeAttr('id');
  			$(this).attr('id', 'dropped');
  			sentence_array.push($(box).text());
  			
  			$(this).text($(box).text());
            $(box).off();
            $( this ).off();
            droppables++;
            createDroppableObject();	 	 	 
        	createDrag(box);
          }


    	})
    
  		
  	} //make droppable end

  	// getting data from database
	$.ajax({
		    type: "GET",
		    url: "/sentences/new",
		    dataType: "json",
		    success: function(data) {
		      for(var j=0; j<data.content.length; j++){	       
		      	 $('#box'+j).text(data.content[j]);
		      	};
		    }
		 
	 });//ajax end

	$('#new_sentence_submit').on('submit', function(){
		console.log("yo")
		// $.post('/sentences', {sentence: sentence_array})
		        	$.ajax({
				  type: "POST",
				  url: "/sentences",
				  data: {words: sentence_array},
				  dataType: "json"
				}).done(function (response) {
				  	console.log("sent success");
				  	console.log(response);
				});
	});

});
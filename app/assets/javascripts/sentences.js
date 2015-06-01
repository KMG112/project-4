
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
			    url: "http://localhost:3000/sentences/1",
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
            droppables++
            if(droppables===5){
            	$.ajax({
				  type: "POST",
				  url: "http://localhost:3000/sentences/",
				  data: sentence_array,
				  success: function(){
				  	console.log("sent success");
				  },
				  dataType: "json"
				});
            }//end if in drop
            else{
            	            createDroppableObject();	 	 	 
            			    createDrag(box);
            }//end else in drop
          }


    	})
    
  
  	} //make droppable end

  	// getting data from database
	$.ajax({
		    type: "GET",
		    url: "http://localhost:3000/sentences/1",
		    dataType: "json",
		    success: function(data) {
		      for(var j=0; j<data.content.length; j++){	       
		      	 $('#box'+j).text(data.content[j]);
		      	};
		    }
		 
	 });//ajax end



});
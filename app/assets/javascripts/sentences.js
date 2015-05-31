 
$(document).ready(function(){

	var createDroppableObject = function(){
  	  	$('#sentence_parts').append("<div id=droppable class='ui-widget-header'></div>")
  	}//createDroppableObject end
  	createDroppableObject();


	// creating draggable objects with for statement
	// objects created will get value from the position they are in, 
	// in the active record array

	for(var i=0; i<5; i++){
		$('#words').append("<div id=box"+i+" class='ui-widget-header'></div>");
		

		$('#box'+i).draggable({
  			revert: "invalid"
  		});
  		
  		$('#box'+i).on('drag', function(){
  			makeDroppable(this);
  		});
 
	}// for loop end

  
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
            $(box).off();
            $( this ).off();
            createDroppableObject();	 	 
          }
    	})
    
  
  	} //make droppable end

  	// getting data from database
	 var ajax=	$.ajax({
		    type: "GET",
		    url: "http://localhost:3000/sentences/1",
		    dataType: "json",
		    success: function(data) {
		    	console.log(data);
		      for(var j=0; j<data.content.length; j++){	       
		      	 $('#box'+j).text(data.content[j]);
		      	};
		    }
		 
	 });//ajax end



});
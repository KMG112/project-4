$(document).ready(function(){

  
  	$('#box1,#box2,#box3,#box4,#box5').draggable({
  		revert: "invalid"
  	});
  	
  	$('#droppable1,#droppable2,#droppable3,#droppable4, #droppable5').droppable({
  		drop: function( event, ui ) {
  			console.log(this)
          $( this ).addClass( "ui-state-highlight" )
            .find( "p" )
              .html( "Dropped!" );

          $('#box1,#box2,#box3,#box4,#box5').position({
          		
          	  of: $('#droppable1,#droppable2,#droppable3,#droppable4, #droppable5'),
              my: "center"      	  
          	          })
          	 	 
        }
  	})
  





});
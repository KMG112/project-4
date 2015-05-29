$(document).ready(function(){


	$('#box').draggable({
		revert: "invalid"
	});
	
	$('#droppable').droppable({
		drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );

        $('#box').position({
        	of: $('#droppable'),
        	my: "center"

        })
      }

	})


});
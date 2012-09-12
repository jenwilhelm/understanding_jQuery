(function() {
	
	$(document).ready(function(e) {
		
		// Event to load content when left or right arrow keys are pressed
		$(document).keydown(function(e) {
			// Get current section
			var visibleSection = $('section:visible');
		
		    if (e.keyCode == 37) { 
				getPrevSection(visibleSection);		// left key pressed
		    	return false;
		    } else if (e.keyCode == 39) {
				getNextSection(visibleSection);		// right key pressed
				return false;
			}
		}); // end keydown
		
		// Event to load content when clicked in the TOC
		$('#toc ul').click(function(e) {
			e.preventDefault();
			var sectionToShow = e.target.name,
				visibleSection = $('section:visible');
			
			$(sectionToShow).animate({scrollTop: 80}, 50);
			$(visibleSection).hide(200, function() {
				$(sectionToShow).show(200);
			});
		}); // end click

	}); // end ready
	
	// Load the next section
	function getNextSection(section) {
		
		// Find next section
		var nextSectionIndex = $('section').index(section) + 1;
		
		// Make sure we're not at the end
		if(nextSectionIndex == $('section').length)
			nextSectionIndex = 0;
		
		// Hide current section
		$(section).hide(200, function() {
			// Slide in next section
			var nextSection = $('section')[nextSectionIndex];
			$('body').animate({scrollTop: 80}, 50);
			$(nextSection).show(300, function() { });
		});	
		
	}
	
	// Load the previous section
	function getPrevSection(section) {
		
		// Find previous section
		var prevSectionIndex = $('section').index(section) -1;
		
		// Make sure we're not at the beginning
		if (prevSectionIndex == -1)
			prevSectionIndex = $('section').length - 1;
			
			// Hide current section
			$(section).hide(200, function() {
				// Slide in next section
				var prevSection = $('section')[prevSectionIndex];
				$('body').animate({scrollTop: 80}, 50);
				$(prevSection).show(300, function() { });
			});
		
	}
	
})();
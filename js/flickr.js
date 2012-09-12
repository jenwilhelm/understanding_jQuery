(function() {

	$('document').ready(function() {

		// SEARCH FORM SUBMIT
		$('#photoSearchForm').submit(function(e) {		// this does the same thing as $('#photoSearchForm button').click();
			e.preventDefault();

			// Get the search term
			var searchTerm = $('#photoSearchForm input[name=term]').val();
			// console.log(searchTerm);

			// Check to see if search term is blank
			if (searchTerm == '' || searchTerm == null) {
				$('#photoSearchForm .error').text('Please enter a search term.').show(200);
			}

			// Search term is not blank - make the search request
			else {

				// http://www.flickr.com/services/feeds/docs/photos_public/
				// http://api.jquery.com/jQuery.ajax/
				$.ajax({
					url : 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
					type : 'GET',		// this is default
					dataType : 'jsonp',
					timeout : 10000,
					data : {
    					tags: searchTerm,
    					tagmode: 'any',
    					format: 'json'
  					},
  					success : function(response) {
  						console.log(response);
  						
  						// Clear any errors
						$('#photoSearchForm .error').text('').hide(200);

						// Add the search term to the DOM
						$('#searchResults h2 .searchTerm').text(searchTerm);

						// Show the search results
						$('#searchResults').show(200);

						// Clear any existing photos first
						$('#searchResults .photos').empty();

						// Loop through the response and append each image to the results
						$.each(response.items, function(i, item) {
							// Insert images via JavaScript
							$('<img/>').attr('src', item.media.m).appendTo('#searchResults .photos');

							// Insert images using templating
							//item.media = item.media.m;
							//$('#searchResults .photos').append(tmpl('flickr_search_results', item));
						});
  					},
  					error : function(error) {
						$('#photoSearchForm .error').text('An error has occured. Sorry!').show(200);
  					}
				});

			}
		});

	});

})();

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
  
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
      
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
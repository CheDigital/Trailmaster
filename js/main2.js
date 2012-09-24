// Declare a variable 'delicious' as the main array to store Delicious json data
var delicious = [];
// Declare a variable 'trailList' to store list of trails
var trailList = [];
// Counter for number of total steps in the trail
var totalSteps = 0;
// Counter to track the current step to be displayed
var currentStep = 1;
// Variable to track current trail
var currentTrail

var tags = [];

// Load Get Trails button functionality on document ready
$(document).ready(function() {
    // Load trailmaster for the specified user when the #get-trails form is submitted
    $('#get-trails').submit(function() {
        
    	// Add a header for Trails section
		$('#trails').html('<h2>Trails</h2><ul></ul>');

        // Reset #trails and #bookmark sections, as well as trailList and delicious arrays
		$('#trails ul').empty();
		$('#bookmark').empty();
		trailList = []
		delicious = []

		// declare username based on input
		var username = $('#username').val();
        
        // start a counter to use as unique ID for each bookmark
		var idCount = 0;

		// This cross-domain request requires that you use '?callback=?' because it is done using JSONP
		// Also added count=100 so that it can pull more links, 10 seems to be the default
        $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?' + '&count=100',
        function(json){
			$(json).each(function(index) {
                // this.u // url
                // this.d // description
                // this.n // extended notes
                // this.t // array of tags

                // increment ID counter
				idCount++;
				
				// create an array containing data for the individual bookmark
				var linksubarray = [idCount,this.u,this.d,this.n,this.t];

				// add the bookmark data array into the main delicious data array
				delicious.push(linksubarray); 

				// create a variable representing the tags the individual bookmark
				tags = this.t;

				// iterate through the array of tags, and add new ones into trailList
				for(i=0;i<tags.length;i++) {
					// Read in the tag array, one element at a time. If the tag name contains "trail:", 
					// and the tag does not already exist in our array, add it to the tag array.

					// If the tag is already in trailList, ignore it.
					if ($.inArray(tags[i], trailList) !== -1) {
					}

					// Other, check if the tag contains "trail:"
					else if (tags[i].match(/trail:/g)) {
						// If it does, add it to trailList
						trailList.push(tags[i]);
						// and append it in html to #trails ul
						$('<li></li>').html('<div class = "trailItem" id="' + tags[i] + '"> <a href="#" >'+ tags[i].slice(6) + '</a></div>') // slice out the "tags:" portion of each tag
						.appendTo('#trails ul');				
					}
					
				}

            });	

        });
        return false;
    });

});

// Perform this function when clicking a trail
$('.trailItem').live('click', function() {

	// Reset step counters
	currentStep = 1
	totalSteps = 0

	// Insert trail detail headers
	$('#trailDetail').html('<h2>Trail Detail and Navigation</h2><div>You are on step ' + currentStep + ' of this trail.<div id="navigation"></div><div id="stepDetail"></div>');

	$('#navigation').html('<div id="forward"><a href="#">Step Forward</a></div>');
	// Iterate through the 'delicious' array
	for(i=0;i<delicious.length;i++) {

		// Check if the bookmark is tagged as part of this trail
		if ($.inArray($(this).attr('id'), delicious[i][4]) !== -1) {
			currentTrail = $(this).attr('id')
			console.log(delicious[i][4]);
			// Increment the total steps for this trail
			totalSteps++;
			if ($.inArray('step:'+currentStep, delicious[i][4]) !== -1) {
				console.log(delicious[i][1])
				$('#stepDetail').html('<h2>Step Detail</h2><div><strong>Link:</strong> <a href="' + delicious[i][1] + '">' +delicious[i][2]+'</a></div><div><strong>URL:</strong> '+delicious[i][1]+'</div><div><strong>Notes:</strong> '+delicious[i][3]+'</div><div><strong>Tags:</strong> ' +delicious[i][4]+'</div><div><iframe src="' + delicious[i][1] + '" width="500" height="300"></iframe></div>');
			}
		}
	}	
	return false;
	
});		

$('#forward').live('click', function() {
	currentStep++;

	$('#trailDetail').html('<h2>Trail Detail and Navigation</h2><div>You are on step ' + currentStep + ' of this trail.<div id="navigation"></div><div id="stepDetail"></div>');

	if (currentStep == totalSteps) {
		$('#navigation').html('<span id="backward"><a href="#">Step Backward</a></span>');
	}
	else if (currentStep == 1) {
		$('#navigation').html('<span id="forward"><a href="#">Forward</a></span>');
	}
	else {
		$('#navigation').html('<span id="backward"><a href="#">Backward</a></span> | <span id="forward"><a href="#">Forward</a></span>');
	}
	

	// Iterate through the 'delicious' array
	for(i=0;i<delicious.length;i++) {

		console.log('new steps');
		console.log($(this).attr('id'));

		// Check if the bookmark is tagged as part of this trail
		if ($.inArray(currentTrail, delicious[i][4]) !== -1) {
			console.log(delicious[i][4]);
			if ($.inArray('step:'+currentStep, delicious[i][4]) !== -1) {
				console.log(delicious[i][1])
				$('#stepDetail').html('<h2>Step Detail</h2><div><strong>Link:</strong> <a href="' + delicious[i][1] + '">' +delicious[i][2]+'</a></div><div><strong>URL:</strong> '+delicious[i][1]+'</div><div><strong>Notes:</strong> '+delicious[i][3]+'</div><div><strong>Tags:</strong> ' +delicious[i][4]+'</div><div><iframe src="' + delicious[i][1] + '" width="500" height="300"></iframe></div>');
			}
		}
	}	

	return false;
});

$('#backward').live('click', function() {
	currentStep--;

	$('#trailDetail').html('<h2>Trail Detail and Navigation</h2><div>You are on step ' + currentStep + ' of this trail.<div id="navigation"></div><div id="stepDetail"></div>');

	if (currentStep == totalSteps) {
		$('#navigation').html('<span id="backward"><a href="#">Step Backward</a></span>');
	}
	else if (currentStep == 1) {
		$('#navigation').html('<span id="forward"><a href="#">Forward</a></span>');
	}
	else {
		$('#navigation').html('<span id="backward"><a href="#">Backward</a></span> | <span id="forward"><a href="#">Forward</a></span>');
	}
	

	// Iterate through the 'delicious' array
	for(i=0;i<delicious.length;i++) {

		console.log('new steps');
		console.log($(this).attr('id'));

		// Check if the bookmark is tagged as part of this trail
		if ($.inArray(currentTrail, delicious[i][4]) !== -1) {
			console.log(delicious[i][4]);
			if ($.inArray('step:'+currentStep, delicious[i][4]) !== -1) {
				console.log(delicious[i][1])
				$('#stepDetail').html('<h2>Step Detail</h2><div><strong>Link:</strong> <a href="' + delicious[i][1] + '">' +delicious[i][2]+'</a></div><div><strong>URL:</strong> '+delicious[i][1]+'</div><div><strong>Notes:</strong> '+delicious[i][3]+'</div><div><strong>Tags:</strong> ' +delicious[i][4]+'</div><div><iframe src="' + delicious[i][1] + '" width="500" height="300"></iframe></div>');
			}
		}
	}	

	return false;
});
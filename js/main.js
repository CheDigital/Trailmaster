$('a').click(function(){

    	alert("some link got clicked folks");
    
	});


$(document).ready(function() {

    // Load trailmaster for the specified user when the #load-trailmaster form is submitted
    $('#load-trailmaster').submit(function() {
        
        // If a new username is submitted, reset #trails and #trailmaster
        $('#trails').html('<h2>Trails</h2><ul></ul>')
		$('#trailmaster ul').empty();

		var username = $('#username').val();
        var tagarray = [];
		var linkarray = [];
		var count = 0;
		// This cross-domain request requires that you use '?callback=?' because it is done using JSONP
		// Also added count=100 so that it can pull more links, 10 seems to be the default
        $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?' + '&count=100',
        function(json){
			$(json).each(function(index) {
                // this.u // url
                // this.d // description
                // this.n // extended notes
                // this.t // array of tags
				count++;
				linkarray.push('[' + count + ', "' + this.u + '", "' + this.d + '", "' + this.n + '", "' + this.t + '"]'); 

				var tags = this.t;
				


				for(i=0;i<tags.length;i++)
				{
					//temparray = tags.slice(i);
					// Read in the tag array, one element at a time. If the tag name contains "trail:", 
					// and the tag does not already exist in our array, add it to the tag array.


					//console.log(tagarray);
					if ($.inArray(tags[i], tagarray) !== -1) { // if tag is already in array, ignore it.
						//console.log("tag " + tags[i] + " is already in array");
					} else if (tags[i].match(/trail:/g)) { // tag name contains "trail:"

							tagarray.push(tags[i]); // add it to our new array of "trail only" tags.
							
								$('<li></li>').html('<div class = "trailitem"> <a href="#" onclick = "rohan"> '+ tags[i].slice(6) + '</a></div>') // slice out the "tags:" portion of each tag
								.appendTo('#trails ul');		
								
							
						//	alert(tags[i]);
					}

					
				}

            });		
			
			console.log(linkarray + "\n");
			console.log("link array typeof is " + jQuery.type(linkarray) + "\n");
			console.log("############\n");
			console.log(tagarray + "\n");
			console.log("\n");
			
			$.each(tagarray, function() { // go through each tag in our array

				whichtag = this;
				
				$('#trailmasterhead').text(whichtag); // define the text for the header
			
				for (i=0;i<linkarray.length;i++) { // for each tag, we will look at each line in the link array. if it contains the tag in question, write it to a (eventually hidden) li.
													
					myid = linkarray[i][0];
					myurl = linkarray[i][1];
					mydescription = linkarray[i][2];
					mynotes = linkarray[i][3];
					mytags = linkarray[i][4];
					
					/* 
					READ ME::::::::::
					
					This part isn't working. it is parsing out element 0 of the array as "[" instead of the actual first value of the array (which should be the id).. and so on down the line. It is obviously a result of me not structuring the multi-dimensional array correctly. 
					
					Could help with answer here http://wpquestions.com/question/show/id/3355
					
					- RB */

					console.log("linkarray[i] is " + linkarray[i]);
					console.log("link array typeof is " + jQuery.type(linkarray[i]) + "\n");
					console.log("myid is " + myid);
					console.log("myurl is " + myurl);
					console.log("mytags is " + mytags);
					console.log("\n");
					if ($.inArray(whichtag, mytags) !== -1) { // thistag is in the array associated with this link. write to li.	
					
						console.log("the link " + url + " is tagged with " + thistag + "\n");
						
						$('<li></li>').html('<div id="' + myid + '"><strong>' + myurl + '</strong><br/>' + mydescription + '<br/><br/></div>')
						//.data('extended', this.n)
						//.data('tags', this.t)
						.appendTo('#trailmaster ul');	
					}									
				
				};
			
			});
				


			
			$('#trailmaster li').draggable({revert: true});
        });
        return false;
    });

});


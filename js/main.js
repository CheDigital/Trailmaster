$('a').live('click', function() {
   
	
	var currtrail = $(this).attr('id');
	
	//$("#trailmaster div:nth-child(" + currtrail + ")").hide();
	
	
	//alert("current trailname : " + currtrail );
	//	displaylinks(currtrail);
	//$('#trailmasterhead').text('Links for ' + currtrail+ ' trail');
	
	$("#trailmaster div:nth-child(" + currtrail + ")").show(); 
	//$("#trailmaster").find(1).show(); 
	
	
});			
			
$(document).ready(function() {

    // Load trailmaster for the specified user when the #load-trailmaster form is submitted
    $('#load-trailmaster').submit(function() {
        
        // If a new username is submitted, clear out both #trailmaster and #trails to reset
		$('#trailmaster ul').empty();
		$('#trails ul').empty();

		var username = $('#username').val();
        
		var tagarray = [];
		var linkarray = [];
		var count = 0;
		var tagcount = 0;
		var pathcount = 0;
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
				
				var linksubarray = [count,this.u,this.d,this.n,this.t];
				linkarray.push(linksubarray); 

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
							pathcount++;
							tagarray.push(tags[i]); // add it to our new array of "trail only" tags.
							var q = pathcount;
							//alert ("q is " + q);
							$('<li></li>').html('<div class = "trailitem"> <a href="#" id="' + q + '">'+ tags[i].slice(6) + '</a></div>') // slice out the "tags:" portion of each tag
							.appendTo('#trails ul');	
								
							tagcount++;
						//	alert(tags[i]);
					}

					
				}

            });		
			
			
			//console.log(linkarray + "\n");
			//console.log("link array typeof is " + jQuery.type(linkarray) + "\n");
			//console.log("############\n");
			//console.log(tagarray + "\n");
			//console.log("\n");
			var tagarraynum = 1;

			$.each(tagarray, function() { // go through each tag in our array
				var sortarray = [];
				var whichtag = this;
				//console.log("whichtag is " + whichtag);
				$('#trailmaster').append('<div id="' + tagarraynum + '" style="display:none;"><strong>Steps for the "' + whichtag.slice(6) + '" trail</strong><ul></ul></div>');
			
				for (i=0;i<linkarray.length;i++) { // for each tag, we will look at each line in the link array. if it contains the tag in question, write it to an li.

	
					var myid = linkarray[i][0];
					var myurl = linkarray[i][1];
					var mydescription = linkarray[i][2];
					var mynotes = linkarray[i][3];
					var mytags = linkarray[i][4];
					

					/*console.log("linkarray[i] is " + linkarray[i]);
					console.log("myid is " + myid);
					console.log("myurl is " + myurl);
					console.log("\n");
					*/
					//console.log("mytags is " + mytags);
					//console.log(jQuery.type(mytags));
					//var fooarray = mytags.split(',');
					//console.log(typeof fooarray);
					
					
					
					
					for (j=0;j<mytags.length;j++) {
						if (whichtag == mytags[j]) {
							//console.log("the link " + myurl + " is tagged with " + whichtag + "\n");
							

							for(k=0;k<mytags.length;k++){								
							
								//console.log("tags[i] is " + tags[i]);
								
								if (mytags[k].match(/step:/g)) { // tag name contains "step:"
									
									var stepsplit = mytags[k].split(':');
									var stepnum = stepsplit[1];
									
									var sortsubarray = [stepnum,myid,myurl,mydescription,mynotes];
									sortarray.push(sortsubarray);
									

									tagarraynum++;									
								}
								
							}
					
						}											
			
					}
				}

				sortarray.sort( function(a,b) {
				return a[0]-b[0];		
				});
					
				console.log(sortarray);		
				console.log("array length is " + sortarray.length);
				for (n=0;n<sortarray.length;n++) {
					var foostepnum = sortarray[n][0];
					var fooid = sortarray[n][1];
					var foourl = sortarray[n][2];
					var foodescription = sortarray[n][3];
					var foonotes = sortarray[n][4];							
					$('#trailmaster div:last-child ul').append('<div id="link' + fooid + '">Step ' + foostepnum + " -- <a href='" + foourl + "'>" + foourl + '</a><br/>' + foodescription +'<br/><br/></div>');
					//'<br/><br/>' + '<iframe src="' + myurl + '" style="width:800"></iframe><br/><br/></div>');
					//.data('extended', this.n)
					//.data('tags', this.t)	

				};

				
			});
			
							
        });
        return false;
    });

});

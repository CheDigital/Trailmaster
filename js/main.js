//making array objects global to the javascript file - rohan

var tagarray = [];
var linkarray = [];
var count = 0;

//var tempjson;


 $('a').live('click', function() {
		       
 			// call json interface again for each trail click. to be replaced by json copy from gettrail function to tempjson - Rohan


 			var currtrail = $(this).attr('id');
		    //   alert("current trailname : "+ currtrail );
			//	displaylinks(currtrail);
	         	
	        
	        if(currtrail.length == 0)	
	        {

	        	alert("this is a link");

	        }

	         $('#trailmasterhead').text('Links for ' + currtrail+ ' trail');
	         	
			 var username = $('#username').val();
                    // This cross-domain request requires that you use '?callback=?' because it is done using JSONP
                    $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?' + '&count=100',
                     function(json){
                        $(json).each(function(index) {
                            // this.u // url
                            // this.d // description
                            // this.n // extended notes
                            // this.t // array of tags
                           
                            var tags = this.t;
                            var tagsstr = tags.toString();	
                         //   alert(tagsstr);

                            if(tagsstr.match(currtrail)) {
								/* this bookmark contains the desired trail tag. now do a loop to determine which step tag it has.*/
								
								for(i=0;i<tags.length;i++){								
								
									console.log("tags[i] is " + tags[i]);
									var stepcount = 1;
									
									if (tags[i].match(/step:/g)) { // tag name contains "step:"
										
										
										
										var stepsplit = tags[i].split(':');
										var stepnum = stepsplit[1];
										console.log("stepnum is " + stepnum);
										console.log("stepcount is " + stepcount);
										
										
										while (stepnum == stepcount) { //  this is the next sequential step that we're looking to display.
											
											$('<li></li>').html('<a href="' + this.u + '">' + this.d + '</a>' + '<br>' + this.t + '<br>' + this.n + '--------------------------------------------------------------------------------------------------- <br>')
											.data('extended', this.n)
											.data('tags', this.t)
											.appendTo('#trailmaster ul');							
							
											delete json[i]; // remove this entry from the json
											stepcount++;
										}
											
										
									}
									
								}

								//$.delay(300);
                            }
							
						//   if($.inArray(currtrail,tags))
                        // {  	
                           
				//		}	

                        });


						$('#trailmaster li').draggable({revert: true});
                    });
                        
                 alert("Display complete for the  "+ $(this).attr('id')+"trail. Click on a another trail to see its links. ") ;  	
			  
	            $('#trailmaster ul').empty();
	            return false;


	});




$(document).ready(function() {

// document.ready attaches events to elements on DOM at the load of the page. for dynamic elements, we have to use .live or .on depending on jqeury version
		

    // Load trailmaster for the specified user when the #load-trailmaster form is submitted
    $('#load-trailmaster').submit(function() {
        
        // If a new username is submitted, reset #trails and #trailmaster
        $('#trails').html('<h2>Trails</h2><ul></ul>')
		$('#trailmaster ul').empty();

		var username = $('#username').val();
        
		// This cross-domain request requires that you use '?callback=?' because it is done using JSONP
		// Also added count=100 so that it can pull more links, 10 seems to be the default
        $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?' + '&count=100',
        function(json){
			
			var tempjson = $.extend(true,{},json);
		//	alert("json copied");
		//		alert(tempjson);
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
							
							$('<li></li>').html('<div class = "trailitem"> <a href="#" id= '+ tags[i].slice(6) +'>'+ tags[i].slice(6) + '</a></div>') // slice out the "tags:" portion of each tag
							.appendTo('#trails ul');		
								
							
						//	alert(tags[i].slice(6));
					}

					
				}

            });		
			
			//console.log(linkarray + "\n");
			//console.log("link array typeof is " + jQuery.type(linkarray) + "\n");
			//console.log("############\n");
			//console.log(tagarray + "\n");
			//console.log("\n");
			
			$.each(tagarray, function() { // go through each tag in our array

				whichtag = this;
				
				// $('#trailmasterhead').text(whichtag); // define the text for the header
			
				for (i=0;i<linkarray.length;i++) { // for each tag, we will look at each line in the link array. if it contains the tag in question, write it to a (eventually hidden) li.
													
					myid = linkarray[i][0];
					myurl = linkarray[i][1];
					mydescription = linkarray[i][2];
					mynotes = linkarray[i][3];
					mytags = linkarray[i][4];
					

					//console.log("linkarray[i] is " + linkarray[i]);
					//console.log("link array typeof is " + jQuery.type(linkarray[i]) + "\n");
					//console.log("myid is " + myid);
					//console.log("myurl is " + myurl);
					//console.log("mytags is " + mytags);
					//console.log("\n");
					/*
					if ($.inArray(whichtag, mytags) !== -1) { // thistag is in the array associated with this link. write to li.	
					
						//console.log("the link " + url + " is tagged with " + thistag + "\n");
						
						$('<li></li>').html('<div id="' + myid + '"><strong>' + myurl + '</strong><br/>' + mydescription + '<br/><br/></div>')
						//.data('extended', this.n)
						//.data('tags', this.t)
						//.appendTo('#trailmaster ul');	
					}*/									
				
					};
			

			});
				


			
			$('#trailmaster li').draggable({revert: true});
			//console.log(linkarray)
        });
        return false;
    });

});


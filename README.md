###Project title
Trailmaster

###Team member names
Ryan Baker  
Arthur Che  
Rohan Salantry

###Team member responsibilities
Ryan: wrote first major conversion from class demo, wrote first version of HTML/CSS, API call, and link array, then sorted link array  
Arthur: some basic CSS styling, set up GitHub and Delicious, wrote code for stepping in trails, added bookmark detail display  
Rohan: deciphered the API call, wrote first jQuery load and click functions, coded lots of initial functionality  
Generally, we worked through most of it together and each tried a few different approaches and algorithms.  

###Project description
Trailmaster is an implementation of #2 in the project suggestions. It allows you to browse a Delicious user's trails. There are 3 basic steps:  
1) Enter a Delicious username, and click Get Trails. This will bring up a list of trails from the account.  
2) Click one of the trails to view it.  
3) Trailmaster will display the first step in the trail. From there, you can step forward (and backward) to view other links in the trail. Trailmaster will show the bookmark title, URL, any extra notes, tags, and an iframe of the URL.  
  
At any point, you can click on a different trail, or enter a new username to pull.  

###Delicious username(s) you tested with
chedigital  
  
###Technologies used on the project
Delicious  
Javscript  
jQuery  
tiny bit of HTML5  
CSS  

###URL of the repository on github
https://github.com/CheDigital/Trailmaster  

###Live URL of where it's hosted
http://people.ischool.berkeley.edu/~che/iolab/trailmaster/  

###Browser support
Chrome, Safari, Firefox, IE (new versions)  

###Any bugs/quirks we should be aware of
We're using iframes to show a preview of the link, which can cause some issues. For example, in our social media trail, pretty much all of the sites block iframes, so the preview doesn't show up. Other than that, the iframes also seem to make it run a little slow.
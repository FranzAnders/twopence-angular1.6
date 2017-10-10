# Pickpocket Web App
Front-end of the Pickpocket webapp

# Built With
- SCSS
- HTML5
- jQuery
- Angular Foundation
- Foundation SCSS Framework (Partial Use)
- Angular 1.4.8
- Grunt
- Bower
- Node


# Machine Setup Dependencies 
- ruby (for gem mgmt)
- compass (1.0.3)
- compass-core (1.0.3)
- compass-import-once (1.0.5)
- ceaser-easing (0.7)
- sass (3.4.15)

#Ruby needs to be installed in your system in order to installs gems 

#Installing SASS 
- gem install sass or sudo gem install sass if you get an error for permissions (reference: http://sass-lang.com/install) 

#Installing Compass 
- gem install compass (reference: http://compass-style.org/install/)

#Installing Ceaser-Easing  
- gem install ceaser-easing (reference: https://github.com/jhardy/compass-ceaser-easing)


# Setup
- cd to root dir with terminal
- bower install
- npm install


# Developing (Front end)
- cd to root dir with terminal
- run grunt


# Getting CORS To Work 
- ws --rewrite '/api/* -> https://api.onepence.co/$1' --spa index.html

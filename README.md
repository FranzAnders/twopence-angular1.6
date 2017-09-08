# Humanaut Website
Website for Humanaut. 

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


# Setup
- cd to root dir with terminal
- bower install
- npm install

# Developing (Front end)
- cd to root dir with terminal
- run grunt

<!-- 
# Running the Server

First, make sure there is a file located at server/.env which contains the following
```
ADMIN_PASS=testing
DB_USER=nomva
DB_NAME=nomva
DB_PASS=n0mv@1415839218324915248521
UPLOAD_DIR=/var/www/html/uploads
```

Note, this DB_PASS word will change in production

second, run the server using the following command

`sudo env $(cat .env) nodemon server.js`

# Deploying the Client
1. `cd client`
2. `grunt publish`
3. `scp -r -i ~/Desktop/nomva.pem dist/* centos@52.33.157.27:/home/centos/www`
4. `ssh -i ~/Desktop/nomva.pem centos@52.33.157.27`
5. `sudo su -`
6. `yes | cp -R /home/centos/www/* /var/www/html`

# Deploying the CMS
1. `cd cms`
2. `grunt build`
3. `scp -r -i ~/Desktop/nomva.pem dist/* centos@52.33.157.27:/home/centos/cms`
4. `ssh -i ~/Desktop/nomva.pem centos@52.33.157.27`
5. `sudo su -`
6. `yes | cp -R /home/centos/cms/* /var/www/html/cms`

# Deploying the Server
1. `cd server`
2. `scp -r -i ~/Desktop/nomva.pem * centos@52.33.157.27:/home/centos/server`
4. `ssh -i ~/Desktop/nomva.pem centos@52.33.157.27`
5. `sudo su -`
6. `cd /home/centos/server/src`
7. `pm2 delete server`
8. `pm2 start server.js`
 -->
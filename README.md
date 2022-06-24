# TRON - metaverse room

[![License: UPL](https://img.shields.io/badge/license-UPL-green)](https://img.shields.io/badge/license-UPL-green) [![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=oracle-devrel_devo-tron-metaverse-room)](https://sonarcloud.io/dashboard?id=oracle-devrel_devo-tron-metaverse-room)

## Introduction
40 years ago the most iconic movie (IMHO it is a bit underated maybe because not a great sequel) was released. We put together this repo for you to learn how to create your own cyber metaverse grid room.

## Getting Started

### Create your free tier instance
YAS! Thanks to aframe.io you can run metaverse...for free. All you need is to create your account here https://www.oracle.com/uk/cloud/free/

### Connect to your instance
Using remote connection of your choice connect to your OCI instance. Here is a link on how to get started with OCI https://docs.oracle.com/en-us/iaas/Content/GSG/Reference/overviewworkflow.htm

For this tutorial all we need is following compute instance:
- OCPU : 1 
- RAM : 2Go
- Storage : 50Go 
- Arch: AMD64 
- OS : Oracle Linux 8

### Nginx Webserver setup

Check for packages updates before installing Nginx packages  
```
sudo dnf update && sudo dnf upgrade
```


Install nginx using the dnf command  
```
sudo dnf install nginx
```


We want to ensure that Ngix starts after each reboot  
```
sudo systemctl enable nginx
```

To make our webserver accessible from the outside, we’re going to allow access on port 80  
```
sudo firewall-cmd --zone=public --permanent --add-service=http
sudo firewall-cmd --reload
```

All should now be ready to access Nginx from a remote host. Open browser and navigate to `http://YOURHOSTNAME URL`

If you didn’t touch to /etc/nginx/nginx.conf configuration file. It contains a catch-all config. If it’s not the case, add the following to it :
```
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  _;
    root         /usr/share/nginx/html;
}
```

Now let’s append a similar server block for the example.com domain to the http block
```
server {
     server_name example.com;
     root /var/www/example.com/;
     access_log /var/log/nginx/example.com/access.log;
     error_log /var/log/nginx/example.com/error.log;
}
```

### Directories Setup

Let’s create the root directory for our domain
```
sudo mkdir -p /var/www/example.com/
```

Set the `httpd_sys_content_t` context on the root directory for SELinux.
```
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/example.com(/.*)?"
sudo restorecon -Rv /var/www/example.com/
```

These commands set the `httpd_sys_content_t` context on, the `/var/www/example.com/`

Note that you must install `policycoreutils-python-utils` package to run the restorecon commands.


We also need to create the log directory
```
sudo mkdir /var/log/nginx/example.com/
```

It’s time to restart nginx to apply our configurations
```
sudo systemctl restart nginx
```

### Verifying that everything works

In order to ensure that the example.com server bloc works as intended. Let’s add a dummy file to our `/var/www/example.com/folder`. 
`echo "Content for example.com" > /var/www/example.com/index.html`

Use a browser and connect to `http://example.com`. The web server shows the example content from the `/var/www/example.com/index.html` file.

Use a browser and connect to `IP_address_of_the_server`. The web server shows the example content from the `/usr/share/nginx/html/index.html` file.  

### Adding TLS to our Nginx server  

In order to add HTTPS capabilities to our server. We’re going to use Let’s Encrypt Certbot to make things easier.

For starters, we need to enable EPEL Repository (assuming you never did it before).  
```
sudo dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
```

After that, enable PowerTools with the following command.
```
sudo dnf config-manager --set-enabled PowerTools
```

As we’re using Nginx as a webserver, we’re going to download the according Cerbot version.
```
sudo dnf install certbot python3-certbot-nginx
```

To check if Certbot is correctly installed, run.
```
certbot --version
```

Request a new certificate from Let’s Encrypt and fill the requested information.
```
sudo certbot --nginx
```

Setup automatic renewal for the certificate(s).
```
sudo echo "0 0,12 * * * root python3 -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null
```

### Importing the Room Template to your server

First we need to install git on our instance in order to clone the repository.
```
sudo dnf install git
```

Let’s remove the dummy file in the /var/www/example.com/ folder.
```
cd /var/www/example.com/ && sudo rm index.html
```

Clone the our metaverse room from Github (make sure to keep the "." as we want to have the content of the repo in our folder).
```
sudo git clone https://github.com/oracle-devrel/devo-tron-metaverse-room.git .
```

Use a browser and connect to https://example.com to see your 3DPR loaded!

### Prerequisites
This guide assumes you already have a compute instance provisioned on your tenant and have a domain redirected to your instance. 

Replace example.com with your domain in this guide!

VPS Configuration for this tutorial :
- OCPU : 1 
- RAM : 2Go
- Storage : 50Go 
- Arch: AMD64 
- OS : Oracle Linux 8

## Notes/Issues
You can run multiple rooms on one FREE ACCOUNT!

## URLs
* Nothing at this time

## Contributing
This project is open source.  Please submit your contributions by forking this repository and submitting a pull request!  Oracle appreciates any contributions that are made by the open source community.

## License
Copyright (c) 2022 Oracle and/or its affiliates.

Licensed under the Universal Permissive License (UPL), Version 1.0.

See [LICENSE](LICENSE) for more details.

ORACLE AND ITS AFFILIATES DO NOT PROVIDE ANY WARRANTY WHATSOEVER, EXPRESS OR IMPLIED, FOR ANY SOFTWARE, MATERIAL OR CONTENT OF ANY KIND CONTAINED OR PRODUCED WITHIN THIS REPOSITORY, AND IN PARTICULAR SPECIFICALLY DISCLAIM ANY AND ALL IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE.  FURTHERMORE, ORACLE AND ITS AFFILIATES DO NOT REPRESENT THAT ANY CUSTOMARY SECURITY REVIEW HAS BEEN PERFORMED WITH RESPECT TO ANY SOFTWARE, MATERIAL OR CONTENT CONTAINED OR PRODUCED WITHIN THIS REPOSITORY. IN ADDITION, AND WITHOUT LIMITING THE FOREGOING, THIRD PARTIES MAY HAVE POSTED SOFTWARE, MATERIAL OR CONTENT TO THIS REPOSITORY WITHOUT ANY REVIEW. USE AT YOUR OWN RISK. 
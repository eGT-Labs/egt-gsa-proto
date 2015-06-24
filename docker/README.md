# README #

This is the README for the Operating System Containerization component of the GSA 18F challenge.

## Capabilities and Futures ##
eGlobaltech is using docker for containerization.  Currently we support basic containerization using a Dockerfile.  Future sprints may extend the docker functionality to full container integration with production operations on AWS, e.g. deploy the Docker versions of the service on EC2 instances using Cloudamatic with the full capabilities of monitoring, orchestration, etc.

## Operations ##
1. Place the Dockerfile in an empty directory of your choosing
2. **IMPORTANT** - if in development mode edit the Dockerfile to include your Github credentials in place of *someuser:somepass* in the line:
```git clone https://someuser:somepass@github.com/eGT-Labs/egt-gsa-proto.git```
2. Place the file supervisord.conf in the same directory.  Case is important.
3. Build your container image with the command:

	```docker build --tag catalyst/supervisord .```

4.	at the end you should see a container ID, like the '60d870c806d4' in the example below:

	```Step 20 : ADD supervisord.conf /etc/supervisord.conf
 ---> 45b3717cdfa2
Removing intermediate container e3ed23e94709
Step 21 : CMD supervisord -n
 ---> Running in 846356ae9111
 ---> 60d870c806d4
Removing intermediate container 846356ae9111
Successfully built 60d870c806d4```


4. Start the container with the command:

	```docker run -d -p 80:80 <your container ID here>```

5. Ensure that your docker host has port 80 open, and connect with a browser

    
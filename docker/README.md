# README #

This is the README for the Operating System Containerization component of the GSA 18F challenge.

## Capabilities and Futures ##
eGlobaltech is using [Docker](http://www.docker.com) for containerization.  Currently we support basic containerization using a Dockerfile.  Future sprints may extend the docker functionality to the proprietary [AWS Elastic Container Service](http://aws.amazon.com/ecs/), or Cloudamatic full container integration with production operations on AWS, e.g. deploy the Dockerized versions of the Catalyst service on EC2 instances using [Cloudamatic](http://www.cloudamatic.com) with the full capabilities of monitoring, orchestration, etc.

## Basic Operations ##
Basic operations are covered in the root [README.md](https://github.com/eGT-Labs/egt-gsa-proto/blob/master/README.md) file in the Docker Containerization section

## More Options ##
### Mapping Ports and Detached Operation ###
You can run Catalyst as a service in a docker container by:
  * Running in detached mode with the -d switch
  * Mapping the internal (9000) catalyst service port to a port on your Docker host

For example, the command below will start a container with the repository/tag of catalyst:20150626_1 .  The docker service will be accessible from port 80 of a docker host,  run continuously, and return you to your Docker host command prompt:

`docker run -d -p 80:9000 catalyst:20150626_1`

IMPORTANT NOTE:
The example assumes that:
  * You have previously created an image tagged as catalyst:20150626_1, per Basic Operations
  * Your Docker host will allow you to access the indicated port 80.  For example, if you're on AWS, make sure your security group allows access to port 80.
  * Nothing else is running on your Docker host port 80

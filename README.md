### URL 
https://egt-gsa-catalyst.egt-labs.com/

### Local Development

* Install command line tools:
  *  Node and npm
  *  bower: `npm install -g bower`
  *  gulp: `npm install -g gulp`
* Update dependencies
  *  `npm install`
  *  `bower install`
* Run development application locally: `gulp`
* Test code
  *  check code formatting with JSHint and JSCS  `gulp control` 
  *  protractor end-to-end one-time setup: `gulp e2e:update`
  *  protractor end-to-end tests: `gulp e2e`
* Deploy Application
  * build package: `gulp deploy`
  * contents will be located in the `dist` folder
  * Optionally set enviornment variables:
    * `NODE_ENV=production`
    * `PORT=12345`
    * `OPEN_FDA_API_KEY=YOUR_API_KEY`
      * This app is powered by the [Open FDA API](https://open.fda.gov/). While you can run without a key, it is recommended for production use to [acquire one](https://open.fda.gov/api/reference/#authentication).
  * run production package: `node dist/server/server.js`

### Docker Containerization
  *  Use git to pull [our repository](https://github.com/eGT-Labs/egt-gsa-proto) onto Docker host
  *  Path to repository root, e.g. egt-gsa-proto
  *  Build and run (don't forget the hard-to-see dot at the end of the docker build line below):
  	*  `docker build -t catalyst:YOUR_TAG_GOES_HERE .`
  	*  `docker run -P catalyst:YOUR_TAG_GOES_HERE`
  * `docker ps` to find the docker host port you're mapped to, e.g.:

    `0.0.0.0:49157->9000/tcp`

You can also map the internal (9000) port at will, for example to run the application so it can be accessed on host port 80 you'd run:

```docker run -p 80:9000 catalyst:YOUR_TAG_GOES_HERE```

More options and details are available in the [README.md](https://github.com/eGT-Labs/egt-gsa-proto/blob/master/docker/README.md) in the docker folder.

### [Minimal Viable Product (MVP) Challenge](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%234---Minimum-Viable-Product)
Our challenge was to develop and deploy a simple app using OpenFDA datasets to search, explore, & interact with data on drug labeling and adverse events. Core functionality was focused on faceted search and analytics on adverse events. Team eGT  developed the application using Scrum and the [US Digital Services Playbook](), enhancing the application over a number of iterations.

For more information and to view evidence, please see our [MVP Wiki](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%234---Minimum-Viable-Product).

### [Team](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%231---Team)
eGT assembled a multi-disciplinary, collaborative core DevOps team of experienced engineers, agilists, testers,  and architects, with members chosen for their experience designing web applications using automated testing frameworks, continuous integration and continuous deployment to build and deliver a prototype.

- **Product Manager:** Jennifer Hinton - @jhinton
- **Technical Architect:** Eric Hanson - @jehanson
- **Backend Web Developer**: Eric Hanson -@jehanson
- **Frontend Web Developer:** Mansi Pandurangi -@mpandurangi 
- **DevOps Engineer:** John Stange - @jstange
- **DevOps Engineer:** Jai Bapna - @jaibapna
- **DevOps Engineer/Automated Test Engineer:** Zach Rowe - @zr2d2
 
For more information about our team and to view our evidence please see our [Team Wiki](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%231---Team).

### [Technical Stack] (https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack) 
Team eGT chose to leverage over five modern, open source tools & frameworks as they offer maximum productivity in a prototyping effort of this nature. We implemented continuous integration automating the entire build, test and deployment process further enhancing our productivity and accelerating our solution’s maturity. All underlying platforms used to create and run the prototype are openly licensed and free of charge.

Below we highlight our tech stack on how we met the requirements for Attachment E: 

**Modern, Open Source Technologies**
-	[Node.js](https://github.com/joyent/node/blob/master/LICENSE) - Cross-platform runtime environment
-	[Angular.js](https://github.com/angular-app/angular-app/blob/master/LICENSE) - Front-end framework
-	[Bootstrap](https://github.com/twbs/bootstrap/blob/master/LICENSE) - Front-end framework
-	[Chef](https://github.com/chef/chef/blob/master/LICENSE) and [Cloudamatic](https://github.com/cloudamatic/cloudamatic/blob/master/LICENSE.md) for [Continuous Deployment & Configuration Management](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#continuous-deployment)
-	[Docker](https://github.com/docker/docker/blob/master/LICENSE) for [Operating-system-level virtualization](https://github.com/eGT-Labs/egt-gsa-proto/blob/master/docker/README.md)

**Other Technologies**
-	[Github](http://www.github.com) for [Source Control Repository](https://github.com/eGT-Labs/egt-gsa-proto/)
-	[Amazon Web Services](http://aws.amazon.com/) as our [Infrastructure as a Service Provider](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#infrastructure-as-a-service-provider)
-	[Jenkins](https://github.com/kohsuke/hudson/blob/master/LICENSE.txt) for [Continuous Integration  ](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#continuous-integration) with 	[Protractor](https://github.com/angular/protractor/blob/master/LICENSE) to enable [Automation of Unit Tests](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#testing) 
-	[Nagios](https://assets.nagios.com/licenses/nagios_open_software_license.txt) for [Continuous Monitoring](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#continuous-monitoring)
-	[OpenFDA's API](open.fda.gov) to consume APIs for Adverse Events, Recalls, and Drug Labeling

For more information and to view our evidence, please see our [Tech Stack wiki](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack).

### [Process & Tools](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%232---Processes-&-Tools)
Our lead, Jennifer Hinton, facilitated a kick-off meeting to gain alignment on the tech stack and creation of the environment with necessary permissions, collaboration tools, sprint schedules and ceremonies, and determined the MVP challenge based on suggestions from SMEs and the team. We also established our definition of done. 
 
The team followed a daily ceremony schedule, including the following:
-	Daily Stand Up - to coordinate efforts and remove blockers
-	Daily Grooming Session - to slice and prioritize new functionality and to discuss mock-up designs created by the Product Owner and value team
-	Sprint review & demo to view and provide suggestions to improve new functionality, provide updates about the infrastructure and testing roadmap, and to close out completed stories in GitHub 

For more information and to view our evidence on our Iterative, Agile Approach, please see our [Processes & Tools Wiki](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%232---Processes-&-Tools).

 

# Egt gsa proto [![Generated with](https://img.shields.io/badge/generated%20with-bangular-blue.svg?style=flat-square)](https://github.com/42Zavattas/generator-bangular)

### URL 
https://gsa-fda-proto.egt-labs.com/

### Instructions to run locally
###One time setup

* Install node and npm
* Install bower `npm install -g bower`
* Install gulp `npm install -g gulp`

###Each time project dependencies may have been changed

Always run this on build server, becasue we don't know which commit might have changed package.json or bower.json

* Update npm dependencies `npm install`
* Update bower dependenceis `bower install`

### Build tasks

* Run application locally `gulp`
* Build the production artifacts `gulp build` (Build artifacts located in `dist` folder)
    * The artifacts in the `dist` folder can either be run in place or copied to the production machine. The contents 
      of the folder can be run using the `npm start` command
* Launch client and server tests, using Karma and Mocha, both by default. `gulp test [--client || --server]`


### Minimal Viable Product (MVP) Challenge
Our challenge was to develop and deploy a simple app using OpenFDA datasets to search, explore, & interact with data on drug labeling and adverse events. Core functionality was focused on faceted search and analytics on adverse events. Team eGT was developed the application using Scrum, enhancing the application over a number of iterations.

For more information and to view evidence, see [MVP Wiki](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%234---MVP)

### Team
eGT assembled a multi-discplinary, collaborative DevOps team of experienced engineers, agilists, testers,  and architects, with members chosen for their experience designing web applications using automated testing frameworks, continuous integration and continuous deployment to build and deliver a prototype.

#####Product Owner: Jennifer Hinton - @jhinton
#####Technical Architect: Eric Hanson - @jehanson
#####Back End Web Developer: Eric Hanson -@jehanson
#####Front End Web Developer: Mansi Pandurangi -
#####Automated Test Engineer: Zach Rowe
#####DevOps Engineer: John Stange

For more information and to view evidence, see [Team](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%231---Team)

### [Technical Stack] (https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack) 
Team eGT chose to leverage over five modern, open source tools & frameworks as they offer maximum productivity in a prototyping effort of this nature. We implemented continuous integration automating the entire build, test and deployment process further enhancing our productivity and accelerating our solution’s maturity.  Below is a quick re-cap to evidence on how we meet the requirements for Attachment E: 
- [Node.js](https://nodejs.org) -  Cross-platform runtime environment
- [Angular.js](https://angularjs.org/) - Front-end framework
- [Bootstrap](https://github.com/twbs/bootstrap) - Front-end framework
- [Amazon Web Services](https://cloud.githubusercontent.com/assets/4334183/8358734/f2cc0d02-1b2f-11e5-9c30-134fc1b4db96.png) as our Infrastructure as a Service Provider
- [Jenkins](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#continuous-integration) for Continuous Integration
- [Nagios](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#continuous-monitoring) for Continuous Monitoring
- [Cloudamatic](https://github.com/eGT-Labs/egt-gsa-proto/blob/master/docs/Tech%20Stack/deploylog) for Automated Deployment & Configuration Management
- [Chef](https://www.chef.io/chef/) for Configuration Management
- [Docker]() for Operating-system-level virtualization. 
- [Protractor](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#testing) for Unit Testing
- [API]()
- [Github](www.github.com) for Source Control Repository

For more information and to view evidence see, [Tech Stack](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack)

### Process & Tools
 Our lead, Jennifer Hinton, facilitated a kick-off meeting to gain alignment on the tech stack and creation of the environment with necessary permissions, collaboration tools, sprint schedules and ceremonies, and determined the MVP challenge based on suggestions from SMEs and the team. We also established our definition of done. 
 
The team followed a daily ceremony schedule, including a DSU to coordinate efforts and remove blockers, a grooming session to slice and prioritize new functionality and to discuss mock-up designs created by the PO, and a sprint review/demo to view and provide suggestions to improve new functionality, provide updates about the infrastructure and testing roadmap, and to close out completed stories in GitHub. In addition to using GitHub for source control and our backlog, we utilized a set of collaboration tools, such as Google Drive, Slack, and JoinMe.

 Below is a quick recap to evidence on how we met requirements for Attachment E:
 - [Scrum](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%232---Processes-&-Tools) for our Iterative, Agile Approach
 - [MVP](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%232---Processes-&-Tools) for our Iterative, Agile Approach

 

### Our Agile Journey
-	Thursday June 18th, 2015 - [Sprint 0](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-0)
-	Friday June 19th, 2015 to Sunday June 21st, 2015 - [Sprint 1](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-1)
-	Monday, June 22th, 2015  - [Sprint 2](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-2)
-	Tuesday, June 23rd, 2015 - [Sprint 3](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-3)
-	Wednesday, June 24th, 2015 - [Sprint 4](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-4)
-	Thursday, June 25th, 2015 - [Sprint 5](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-5)
-	Friday, June 26th, 2015 - [Sprint 6](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-6)

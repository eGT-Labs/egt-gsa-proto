### URL 
https://egt-gsa-catalyst.egt-labs.com/

### Local Development

* Install command line tools:
  *  Node and npm
  *  bower: `npm install -g bower`
  *  gulp: `npm install -g gulp`
* Update depenencies
  *  `npm install`
  *  `bower install`
* Run development application locally: `gulp`
* Test code
  *  protractor end-to-end test setup: `gulp e2e:update`
  *  protractor end-to-end tests: `gulp e2e`
* Deploy Application
  * build package: `gulp deploy`
  * contents will be located in the `dist` folder
  * Set environment variables:
    * `NODE_ENV=production`
    * `PORT=12345`
    * `OPEN_FDA_API_KEY=YOUR_API_KEY`
  * run production package: `node dist/server/server.js`


### [Minimal Viable Product (MVP) Challenge](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%234---Minimum-Viable-Product)
Our challenge was to develop and deploy a simple app using OpenFDA datasets to search, explore, & interact with data on drug labeling and adverse events. Core functionality was focused on faceted search and analytics on adverse events. Team eGT  developed the application using Scrum, enhancing the application over a number of iterations.

For more information, see [MVP Wiki](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%234---Minimum-Viable-Product).

### [Team](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%231---Team)
eGT assembled a multi-disciplinary, collaborative DevOps team of experienced engineers, agilists, testers,  and architects, with members chosen for their experience designing web applications using automated testing frameworks, continuous integration and continuous deployment to build and deliver a prototype.

- **Product Owner:** Jennifer Hinton - @jhinton
- **Technical Architect:** Eric Hanson - @jehanson
- **Back End Web Developer**: Eric Hanson -@jehanson
- **Front End Web Developer:** Mansi Pandurangi -@mpandurangi 
- **Automated Test Engineer:** Zach Rowe - @zr2d2
- **DevOps Engineer:** John Stange - @jstange

For more information, see [Team](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%231---Team).

### [Technical Stack] (https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack) 
Team eGT chose to leverage over five modern, open source tools & frameworks as they offer maximum productivity in a prototyping effort of this nature. We implemented continuous integration automating the entire build, test and deployment process further enhancing our productivity and accelerating our solution’s maturity. All underlying platforms used to create and run the prototype are openly licensed and free of charge.


Below is a  re-cap to evidence on how we met the requirements for Attachment E: 
- [Node.js](https://nodejs.org) -  Cross-platform runtime environment 
- [Angular.js](https://angularjs.org/) - Front-end framework 
- [Bootstrap](https://github.com/twbs/bootstrap) - Front-end framework  
- [Chef](https://www.chef.io/chef/) for Configuration Management 
- [Cloudamatic](https://github.com/eGT-Labs/egt-gsa-proto/blob/master/docs/Tech%20Stack/deploylog) for Automated Deployment & Configuration Management 
- [Docker]() for Operating-system-level virtualization 
- [Github](www.github.com) for Source Control Repository
- [Amazon Web Services](https://cloud.githubusercontent.com/assets/4334183/8358734/f2cc0d02-1b2f-11e5-9c30-134fc1b4db96.png) as our Infrastructure as a Service Provider
- [Jenkins](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#continuous-integration) for Continuous Integration
- [Nagios](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#continuous-monitoring) for Continuous Monitoring
- [Protractor](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack#testing) for Unit Testing 
- [API]()

For more information, see [Tech Stack](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%233---Tech-Stack).

### [Process & Tools](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%232---Processes-&-Tools)
 Our lead, Jennifer Hinton, facilitated a kick-off meeting to gain alignment on the tech stack and creation of the environment with necessary permissions, collaboration tools, sprint schedules and ceremonies, and determined the MVP challenge based on suggestions from SMEs and the team. We also established our definition of done. 
 
The team followed a daily ceremony schedule, including a Daily Stand Up to coordinate efforts and remove blockers, a grooming session to slice and prioritize new functionality and to discuss mock-up designs created by the Product Owner, and a sprint review/demo to view and provide suggestions to improve new functionality, provide updates about the infrastructure and testing roadmap, and to close out completed stories in GitHub. In addition to using GitHub for source control and our backlog, we utilized a set of collaboration tools, such as Google Drive, Slack, and JoinMe.

 Below is a quick recap to evidence on how we met requirements for Attachment E:
 - [Scrum](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%232---Processes-&-Tools) for our Iterative, Agile Approach
 - [MVP](https://github.com/eGT-Labs/egt-gsa-proto/wiki/%232---Processes-&-Tools) for our Iterative, Agile Approach

 

#### Our Agile Journey

Below we highlight our sprints to demonstrate additional evidence for Attachment E on our Iterative, Agile Approach:
-	Thursday June 18th, 2015 - [Sprint 0](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-0)
-	Friday June 19th, 2015 to Sunday June 21st, 2015 - [Sprint 1](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-1)
-	Monday, June 22th, 2015  - [Sprint 2](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-2)
-	Tuesday, June 23rd, 2015 - [Sprint 3](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-3)
-	Wednesday, June 24th, 2015 - [Sprint 4](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-4)
-	Thursday, June 25th, 2015 - [Sprint 5](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-5)
-	Friday, June 26th, 2015 - [Sprint 6](https://github.com/eGT-Labs/egt-gsa-proto/wiki/Agile-Journey#sprint-6)

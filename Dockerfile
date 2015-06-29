# This dockerfile creates an instance of the eGlobalTech Catalyst application for GSA 18F
# IMPORTANT: during development replace someuser:somepass with a Github user:pass able to pull from repository
FROM centos:6

# Set up our environment
ENV OPEN_FDA_API_KEY=

# the Node server runs natively on port 9000. The host OS can map this to whichever port it wants.
EXPOSE 9000

# Make our apps directory
RUN mkdir /apps

# Make certain EPEL is active
RUN yum -y install epel-release

# Install dependencies
RUN yum -y install \
        nodejs \
        nodejs-devel \
        npm \
        git \
        bzip2 \
        wget \
        supervisor \
        tar

# Install Node Package Manager and node dependencies.  npm gets unhappy with multiple installs, so individual
RUN npm install npm -g -y
RUN npm install block-stream -g -y
RUN npm install fstream -g -y
RUN npm install fstream-ignore -g -y
RUN npm install fstream-npm -g -y
RUN npm install glob -g -y
RUN npm install npmconf -g -y
RUN npm install tar -g -y
RUN npm install bower -g -y
RUN npm install gulp -g -y
RUN npm install forever -g -y

# phantomjs is badly behaved from npm on docker, so install by hand first, then reference
RUN cd /usr/local/share && \
        wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-linux-x86_64.tar.bz2  && \
        tar xjf phantomjs-1.9.7-linux-x86_64.tar.bz2 && \
        ln -s /usr/local/share/phantomjs-1.9.7-linux-x86_64/bin/phantomjs /usr/local/share/phantomjs && \
        ln  -s /usr/local/share/phantomjs-1.9.7-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs && \
        ln -s /usr/local/share/phantomjs-1.9.7-linux-x86_64/bin/phantomjs /usr/bin/phantomjs

# Import application source code into the container (.dockerignore file is used to exclude non-source directories)
ADD . /apps/egt-gsa-proto

# Now let's install and build the application distribution
RUN cd /apps && \
        cd /apps/egt-gsa-proto/ && \
        npm install && \
        bower install --allow-root && \
        npm install -g grunt-cli && \
        gulp build

# Use supervisord to keep things running
ADD docker/supervisord.conf /etc/supervisord.conf
CMD ["supervisord","-n"]
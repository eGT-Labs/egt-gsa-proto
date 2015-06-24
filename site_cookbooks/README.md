This directory contains artifacts used by the Cloudamatic automation platform,
and is not a part of the core application.

In fda-proto.yaml, you will see the stack description that initiates the
end-to-end creation of the full application stack in Amazon Web Services. This
descriptor is invoked on a Cloudamatic master server with the *mu-deploy*
command.

You will find Chef cookbooks detailing the host-level configuration of 
the servers used by the application.

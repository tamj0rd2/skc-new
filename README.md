# Skull King Calculator

Another skull king calculator

- [dev](http://skc-frontend-dev.s3-website.eu-west-2.amazonaws.com/)
- [prod](http://skc-frontend-prod.s3-website.eu-west-2.amazonaws.com/)

Dev is the main environment for now until I have something good enough to
replace what's currently in prod.

## Getting started

To install the dependencies, run `make setup`

## Deployment

On pushes to main, the nextjs frontend is built and then distributed via a
public S3 bucket.

Pulumi is used to spin up the aws infrastructure. To use pulumi, the executable
needs to be installed using `brew install pulumi` or `make setup-ci`. Then `make deploy`
will build and deploy the application to dev.

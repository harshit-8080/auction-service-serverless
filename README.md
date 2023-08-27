## Steps to step your serverless application

- Create AWS account
- Get Your access and secret key
- Install aws-cli globally
- Configure your aws account with aws cli using aws configure
- Install serverless framework globally
- Setup the basic project
- sls deploye --verbose --> it automatically setup everything and deploy everything

## create your access token

```
curl --location --request POST 'https://dev-wjzgjco0zt7qxjyq.us.auth0.com/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=5DEw3jwyLQNGMUOgUbNCLmy0X7DyAgrf' \
--data-urlencode 'username=test-user@gmail.com' \
--data-urlencode 'password=Test@123' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'scope=openid'

```

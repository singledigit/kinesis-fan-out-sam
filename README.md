# Kinesis Fan-Out to DDB and S3

This application creates an Amazon Kinesis Data Stream two AWS Lambda Functions, a Amazon S3 bucket, and an Amazon DynamoDB table. The Lambda functions are connected to the KDS via the enhanced fan-out method. Records ingested in to the KDS are then written to the DynamoDB table and S3 bucket.

## Deploying through AWS Serverless Application Repository (SAR) (preferred)
This application can be deployed directly from the SAR.

https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:700336187521:applications~Kinesis-Enhanced-Fan-Out-to-DDB-S3

## Deployment through SAM
This application can be deployed using [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

* Package the application
```bash
sam package --template-file template.yaml --output-template-file out.yaml --s3-bucket [your-bucket-name]
```
* Deploy the Application
```bash
sam deploy --template-file out.yaml --capabilities CAPABILITY_IAM --stack-name [stack-name]
```
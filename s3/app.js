const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.lambdaHandler = async (event) => {

    let submits = []

    event.Records.forEach(item => {
        let payload = new Buffer(item.kinesis.data, 'base64').toString("ascii")
        let params = {
            Bucket: process.env.BUCKET,
            Key: `${item.eventID}.json`,
            Body: payload
        }
        submits.push(s3.putObject(params).promise());
    })

    try {
        await Promise.all(submits)
    } catch (error) {
        console.log(error);
        return {
            success: false,
            errorMessage: error.message
        }

    }

    return {
        success: true
    };
};
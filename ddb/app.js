const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event) => {

    let submits = []

    event.Records.forEach(item => {
        let payload = JSON.parse(new Buffer(item.kinesis.data, 'base64').toString("ascii"));
        let params = {
            TableName: process.env.TABLE,
            Item: {
                id: item.eventID,
                data: payload
            }
        }
        submits.push(db.put(params).promise());
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
import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  let auctions;
  const { status } = event.queryStringParameters;

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: "statusAndEndDate",
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeValues: {
      ":status": status,
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  };

  const results = await dynamodb.query(params).promise();
  auctions = results.Items;
  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = getAuctions;

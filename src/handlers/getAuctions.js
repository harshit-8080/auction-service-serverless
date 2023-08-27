import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  let auctions;

  const results = await dynamodb
    .scan({
      TableName: process.env.AUCTIONS_TABLE_NAME,
    })
    .promise();

  auctions = results.Items;
  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = getAuctions;

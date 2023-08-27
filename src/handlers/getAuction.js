import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
  let auctions;

  const id = event.pathParameters.id;

  console.log("================================================");
  console.log(id);
  console.log("================================================");

  const results = await dynamodb
    .get({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id },
    })
    .promise();

  console.log(results);

  auctions = results.Item;
  return {
    statusCode: 201,
    body: JSON.stringify(auctions),
  };
}

export const handler = getAuction;

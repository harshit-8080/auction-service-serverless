import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getAuctionById(id) {
  const results = await dynamodb
    .get({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id },
    })
    .promise();

  return results.Item;
}

async function getAuction(event, context) {
  const id = event.pathParameters.id;
  let auctions = await getAuctionById(id);

  console.log("line 20 ===> ", auctions);

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = getAuction;

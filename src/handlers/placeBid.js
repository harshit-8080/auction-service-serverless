import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  const id = event.pathParameters.id;
  const { amount } = JSON.parse(event.body);

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set highestBid.amount = :amount",
    ExpressionAttributeValues: {
      ":amount": amount,
    },
    ReturnValues: "ALL_NEW",
  };

  let updatedAuctions;
  const result = await dynamodb.update(params).promise();
  updatedAuctions = result.Attributes;

  return {
    statusCode: 201,
    body: JSON.stringify(updatedAuctions),
  };
}

export const handler = placeBid;

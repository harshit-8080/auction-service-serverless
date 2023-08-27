import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const { authorizer } = event.requestContext;

  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(startDate.getHours() + 1);

  const auction = {
    id: uuidv4(),
    title,
    status: "OPEN",
    createdAt: startDate.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0,
    },
    seller: authorizer.email,
  };

  await dynamodb
    .put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ auction }),
  };
}

export const handler = createAuction;

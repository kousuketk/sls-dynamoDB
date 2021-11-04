import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'AKIAQVZ7C4RS66VBEZYR',
  secretAccessKey: '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'
});
const dynamodb = new AWS.DynamoDB();

export const createTable: APIGatewayProxyHandler = async (_event, _context) => {
  const params: any = {
    TableName: 'SampleTable1',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };
  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.log(`Unable to add item: ${JSON.stringify(err)}`);
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: `Unable to add item: ${JSON.stringify(err)}`
          },
          null,
          2
        )
      };
    } else {
      console.log(`PutItem succeeded: ${JSON.stringify(data)}`);
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: `PutItem succeeded: ${JSON.stringify(data)}`
          },
          null,
          2
        )
      };
    }
  });
};

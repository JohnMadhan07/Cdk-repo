"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lambdas/getallreviewsbyreviewer.ts
var getallreviewsbyreviewer_exports = {};
__export(getallreviewsbyreviewer_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(getallreviewsbyreviewer_exports);
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var ddbDocClient = createDDbDocClient();
var headers1 = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*"
};
var handler = async (event, context) => {
  try {
    console.log("Event: ", event);
    const reviewerName = event?.pathParameters?.ReviewerName;
    if (!reviewerName) {
      return {
        statusCode: 404,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ Message: "Missing Reviewer name" })
      };
    }
    let commandInput = {
      TableName: process.env.TABLE_NAME
    };
    commandInput = {
      ...commandInput,
      IndexName: "reviewsIx",
      KeyConditionExpression: "ReviewerName = :r",
      ExpressionAttributeValues: {
        ":r": reviewerName
      }
    };
    const commandOutput = await ddbDocClient.send(
      new import_lib_dynamodb.QueryCommand(commandInput)
    );
    const body = {
      data: commandOutput.Items
    };
    return {
      statusCode: 200,
      headers: headers1,
      body: JSON.stringify(body)
    };
  } catch (error) {
    console.log(JSON.stringify(error));
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ error })
    };
  }
};
function createDDbDocClient() {
  const ddbClient = new import_client_dynamodb.DynamoDBClient({ region: process.env.REGION });
  const marshallOptions = {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true
  };
  const unmarshallOptions = {
    wrapNumbers: false
  };
  const translateConfig = { marshallOptions, unmarshallOptions };
  return import_lib_dynamodb.DynamoDBDocumentClient.from(ddbClient, translateConfig);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});

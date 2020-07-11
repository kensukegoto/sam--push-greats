// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context,callback) => {

  // サイト名
  const sitename = event.queryStringParameters && event.queryStringParameters.name ? event.queryStringParameters.name : "";

  const siteMap = new Map([
    ["webstaff",10]
  ]);

  const count = siteMap.get(sitename);

    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                great: count,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    callback(null,response);

};

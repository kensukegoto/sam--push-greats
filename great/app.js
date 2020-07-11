const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-1"});

let response;

exports.lambdaHandler = async (event, context,callback) => {

  let goods = [
    "webstaff","webstaff","kensukegoto","mokumoku"
  ];
  // サイト名
  const sitename = event.queryStringParameters && event.queryStringParameters.name ? event.queryStringParameters.name : "";

  let count = goods.filter( site => site === sitename).length;

  if(event.httpMethod === "POST") {
    
    let name = JSON.parse(event.body).sitename;
    goods.push(name);
    count = goods.filter( site => site === name).length;

    const params = {
      TableName: 'greats',
      Item:{
          "timestamp": new Date().getTime().toString(),
          "name": "kensukegoto"
      }
    };

    await new Promise(resolve => {
        docClient.put(params, (err,data) => {
          console.log(data);
            resolve(data);
        });
    })

  }

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

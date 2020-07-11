const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-1"});

let resStatus;
let resBody;

exports.lambdaHandler = async (event, context, callback) => {

  let sitename;
  let params;

  try {

    if(event.httpMethod === "GET"){
      sitename = event.queryStringParameters && event.queryStringParameters.name ? event.queryStringParameters.name.trim() : "";

      if(sitename === "") throw new Error('Sitename wasn\'t included.');

      // DBから対象サイトの件数取得
      params = {
        TableName: 'greats',
        IndexName: 'name-index',
        ExpressionAttributeNames:{'#n': 'name'},
        ExpressionAttributeValues:{':val': sitename},
        KeyConditionExpression: '#n = :val'
      };

      const count = await new Promise((resolve,reject) => {

        docClient.query(params, function(err, data){
          if(err) return reject(err);

          resolve(data.Items.length);
   
          // data.Items.forEach(function(site, index){
          //     console.log(site.name);
          // });

        });

      })

      console.log(count);
      resStatus = 200;
      resBody = {
        count
      }
    
    };

    if(event.httpMethod === "POST"){


      const postdata = JSON.parse(event.body);
      sitename = postdata && postdata.sitename ? postdata.sitename.trim() : "";

      if(sitename === "") throw new Error('Sitename wasn\'t included.');

      params = {
        TableName: 'greats',
        Item:{
          "timestamp": new Date().getTime().toString(),
          "name": sitename
        }
      };

      await new Promise((resolve,reject) => {
        docClient.put(params, (err,data) => {
          if(err) return reject(err);
            resStatus = 200;
            resBody = {
              message: "OK!"
            };
            resolve(data);
        });
      });

    }

  } catch(err) {
    console.log(err);

    resStatus = 400;
    resBody = {
      message: err.message
    }
  }


  const response = {
    statusCode : resStatus,
    body: JSON.stringify(resBody)
  }

  callback(null,response);

};

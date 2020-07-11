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

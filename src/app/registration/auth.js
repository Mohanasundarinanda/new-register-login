var request = require('request');
var tokenEndpoint = 'https://login.microsoftonline.com/e403cb99-0806-42e8-bf6f-35ed9586ce6f/oauth2/token'
var token = {}

exports.getAccessToken = function () {

    var requestParams = {
        grant_type: 'client_credentials',
        client_id: '6f8ac81a-e1d0-43ac-89e9-79364e5091e6',
        client_secret: 'Oh]FLQkF+XMRyJ6RC*W/d55ELmDt2y/o',
        resource: 'https://graph.microsoft.com'
    };

    // Make a request to the token issuing endpoint.
    request.post({ url: tokenEndpoint, form: requestParams }, function (err, response, body) {
        var parsedBody = JSON.parse(body);
        if (err) {
            console.log(err);
        } else if (parsedBody.error) {
            console.log(parsedBody.error);
        } else {
            // If successful, return the access token.
            console.log(parsedBody.access_token);
            return token.access_token = parsedBody.access_token;

        }
    });
};


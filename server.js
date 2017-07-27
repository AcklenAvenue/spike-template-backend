var hapi = require('hapi');
var req = require('request');
var server = new hapi.Server();
server.connection({
    port: process.env.PORT || 8000,
    routes: {cors: true}
});

server.register([], function(err){
	server.route([
    {
      method: 'GET',
      path: '/posts/{id}',
      config: {
        handler: function(request, reply){
          req({
            url:`https://jsonplaceholder.typicode.com/posts/${request.params.id}`,
            method: 'GET',
            json: true
          }, function(error, response, body){
            if(error)
              reply(error);
            reply(body);
          })
        }
      }
    }
  ]);
	server.start(function () {
	    console.log('Server running at:', server.info.uri);
	});
});
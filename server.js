var express = require("express");

// Create our app::
var app = express();
const PORT = process.env.PORT || 3000;

app.use(function(request, response, next){
	//This header doesnt exists locally, is only for Heroku::
	if (request.headers['x-forwarded-proto'] === 'https'){
		response.redirect("http://" + request.hostname + request.url);
	}else{
		next();
	}
});

app.use(express.static("public"));
//app.use('/static', express.static(path.join(__dirname, 'public')))


app.listen(PORT, function(){
  console.log("Express server is up on " + PORT + " port.");
});

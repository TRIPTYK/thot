var http = require('http');
var querystring = require('querystring');
var mongoose = require('mongoose');


function saveForm(data,response) {
  console.log("saveForm");
  mongoose.connect('mongodb://localhost/thotContacts');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console,'connection error:'));
  db.once('open', function (callback){
    console.log('db open')
  });
  var contactSchema = mongoose.Schema({
    firstName:String,
    name:String,
    company:String,
    function:String,
    phone:String,
    mail:String,
    isContactAgree:Boolean
  });
  data = querystring.parse(data.toString('utf-8'));
  var Contact = mongoose.model('contact',contactSchema);
  var contact = new Contact({firstName:data.firstName,name:data.name,company:data.company,function:data.function,phone:data.phone,mail:data.mail,isContactAgree:data.isContactAgree});
  contact.save(function(err,contact){
    if(err) throw err;
    response.end('Following data has been saved : '+JSON.stringify(contact));
    db.close();
  })

}
  var app = http.createServer(function(request, response) {
    if (request.method === "POST" && request.url === "/saveThotForm") {
      request.on("data", function(data) {
        saveForm(data,response);
      })
    } else {
      response.statusCode = 404;
      response.statusMessage = "Not Authorized"
      response.end();
    }
  });
  app.listen(5000);

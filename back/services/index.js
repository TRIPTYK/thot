var express = require('express'),
  hostname = process.env.HOSTNAME || 'localhost',
  querystring = require('querystring'),
  mongoose = require('mongoose'),
  port = parseInt(process.env.PORT, 10) || 7777,
  app = express();

var contactSchema = mongoose.Schema({
  firstName: String,
  name: String,
  company: String,
  function: String,
  phone: String,
  mail: String,
  isContactAgree: Boolean,
  timeStamp:String
});
var Contact = mongoose.model('contact', contactSchema);

function saveForm(data, response) {
    mongoose.connect('mongodb://localhost/thotContacts');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function(callback) {
      console.log('db open')
    });
    //{"firstName": "gilles","name": "Bertrand","company": "triptyk","function": "Director", "phone": "0032034944908","mail": "gilles@triptyk.eu","isContactAgree": "true"}
    //curl -H "Content-Type: application/json" -d 'firstName=gilles&name=Bertrand&company=triptyk&function=Director&phone=003203494490&mail=gilles@triptyk.eu&isContactAgree= true' http://localhost:4567/saveThotForm
    data = querystring.parse(data.toString('utf-8'));
    // console.log(data);

    var contact = new Contact({
      firstName: data.firstName,
      name: data.name,
      company: data.company,
      function: data.function,
      phone: data.phone,
      mail: data.mail,
      isContactAgree: data.isContactAgree,
      timeStamp : new Date().toString()
    });
    contact.save(function(err, contact) {
      if (err) throw err;
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport();
      var mailOptions = {
        from: 'Thot site <info@bizzdev.com>', // sender address
        to: ['gilles@triptyk.eu'], //to: ['gilles@triptyk.eu', 'smh@bizzdev.com'], // list of receivers
        subject: contact.firstName + ' ' + contact.name + 'has filled the thot form', // Subject line
        text: 'Contact is :' + JSON.stringify(contact), // plaintext body
        html: contact.firstName+' '+contact.name+': <br/> Company : '+contact.company +'<br /> Function :'+contact.function+'<br /> Phone :'+contact.phone +'<br /> mail : '+contact.mail// html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Message sent: ' + info.response);
        }
      });
      response.end('Following data has been saved : ' + JSON.stringify(contact));
      db.close();
    })

  }
  // accept POST request on the homepage
app.post('/saveThotForm', function(req, res) {
  req.on("data", function(data) {
    saveForm(data, res);
  })
})

var server = app.listen(port, function() {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

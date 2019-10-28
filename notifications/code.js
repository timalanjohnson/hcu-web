const http = require('http');
const accountSid = 'ACbc7159142830298986b6e4a2094defe7';
const authToken = 'e798e376a709ae1122b8c04ee61251f0';
const client = require('twilio')(accountSid,authToken);
var nodemailer = require('nodemailer');
const hostname = '127.0.0.1';
const port = 1500;

var messageBody = "none";

//populate message body
function SendNotifications(){
    var db = require('../codeBox/db');//db string needs to be changed dependant on environment
    var horseNames = "";
    var HandlerEmails = [];
    //query
    db.query("Select Name from tbl_horse", function(err, result, fields) {
        if (err) throw err;
        //convert results to messageBody string
        for (let index = 0; index < result.length; index++) {
          x = result[index].Name;
          horseNames +="\n"+x;
        }
        messageBody = "Horses currently in care: "+horseNames;
        sendWhatsapp(messageBody);  //uncomment after testing
        db.query("Select emailAddress from tbl_user", function(err, result, fields) {
          if (err) throw err;
          for (let index = 0; index < result.length; index++) {
            z = result[index].emailAddress;
            HandlerEmails.push(z);
            console.log(HandlerEmails[index]);
            sendEmail(HandlerEmails[index],messageBody);  //uncomment after testing
          }
        });
        
    });
}
//send Email
function sendEmail(HandlerEmail,messageBody){
    var transporter = nodemailer.createTransport({ //Configure mailing API and sending address
      service: 'gmail',
      auth: {
        user: 'cabbagepatch263@gmail.com', //email address
        pass: 'cabbagepatch' //password of account
      }
    });
    
    var mailOptions = { //Set mail options 
      from: 'cabbagepatch263@gmail.com',
      to: HandlerEmail, //variable populated from DB
      subject: 'Horse Care',
      text: messageBody //variable populated from DB
    };
    
    transporter.sendMail(mailOptions, function(error, info){ //process of sending the email
      if (error) {
        console.log(error); //error response output
      } else {
        console.log('Email sent: ' + info.response); //positve respose output
      }
    });
} 
//send Watsapp
function sendWhatsapp(messageBody){
    client.messages.create({
      from:'whatsapp:+14155238886',//twillio API number where messages are sent from
      to: 'whatsapp:+27614234387',//receiver address
      body: messageBody //message from DB
    }).then(message=> console.log("message sent"));
}
//start server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server is running\n');
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
//execute send function
SendNotifications();

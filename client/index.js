const FormData = require('form-data');
const fs = require('fs');
const config=require("./config");

const form = new FormData();

form.append('my_field', 'my value');
form.append('my_file', fs.createReadStream(config.dir));

form.submit(`${config.url}/api/upload`, function(err, res) {
  // res – response object (http.IncomingMessage)  //
  res.resume();
});
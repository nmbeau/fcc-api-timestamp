// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// date converstion function
let apiDateObject = (in_str) => {
  // convert input to int if all digits
  if (/^\d+$/.test(in_str)) {
    in_date = parseInt(in_str);
  } else {
    in_date = in_str;
  };
  
  let oDate = new Date(in_date);

  // test if in_date was valid else convert to unix/utc
  if (oDate == "Invalid Date") {
    return {
      error: "Invalid Date"
    };
  } else {
    let sUTC = oDate.toUTCString();
    return {
      unix: Date.parse(sUTC),
      utc: sUTC
    };
  };
}

// date API endpoint to accept param
app.get("/api/:date", (req, res) => {
  res.json(apiDateObject(req.params.date))
})

// return current time if no date passed
app.get("/api", (req, res) => {
  res.json(apiDateObject(Date.now()))
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

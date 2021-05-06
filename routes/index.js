const express = require('express');
const router = express.Router();
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'search_license_plate'
});
connection.connect(function(err) {
    if (err) {
  console.error('error connecting: ' + err.stack);
  return;
}

console.log('connected');
});

router.get('/', function(req, res, next) {
  res.render('index')
});
/* GET home page. */
router.get('/getData', function(req, res) {
  var baseJson = {
    errorCode: undefined,
    errorMessage: undefined,
    data: undefined
  }
  connection.query('SELECT * FROM license_plates', function (error, results, fields) {
    if (error) {
      baseJson.errorCode = +error
      baseJson.errorMessage = '403 Forbidden'
      baseJson.data = []
    } else {
      baseJson.errorCode = 200
      baseJson.errorMessage = 'OK'
      baseJson.data = results
    }
    res.send(baseJson);
  });

});

module.exports = router;

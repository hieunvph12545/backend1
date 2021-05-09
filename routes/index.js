const express = require('express');
const router = express.Router();
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'iku010420',
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
      console.log('err:'+error)
      baseJson.errorCode = +error
      baseJson.errorMessage = '403 Forbidden'
      baseJson.data = []
    } else {
      baseJson.errorCode = 200
      baseJson.errorMessage = 'OK'
      baseJson.data = results
    }
    res.send(baseJson)
  });

});
router.post('/search_license_plates',function (req,res) {
  const seril=req.body.codes;
  const codes=seril.slice(0,2)
  console.log(abc);
  connection.query('SELECT * FROM search_license_plate.license_plates_detail Where serial LIKE "'+seril+'" ', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    connection.query('SELECT * FROM search_license_plate.license_plates Where serial LIKE "'+codes+'" ', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
  });
})
module.exports = router;

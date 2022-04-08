const express = require('express')
const math = require('mathjs')
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
  
  
app.post('/post', function(req, res) {
  let m1 =   parseFloat(req.body.m1); //C2
  let m2 = parseFloat(req.body.m2); //C3
  let a1 = parseFloat(req.body.a1); //C4
  let a2 = parseFloat(req.body.a2); //C5
  let b1 = parseFloat(req.body.b1); //C6
  let b2 = parseFloat(req.body.b2); //C7
  let J1 = parseFloat(req.body.J1); //C8
  let J2 = parseFloat(req.body.J2); //C9
  let En = parseFloat(req.body.En); //C10
  let Et = parseFloat(req.body.Et); //C11
  let V20n = parseFloat(req.body.V20n); //C12
  let V20t = parseFloat(req.body.V20t); //C13
  let w10 = parseFloat(req.body.w10); //C14
  let w20 = parseFloat(req.body.w20); //C15
  let V10n = parseFloat(req.body.V10n); //C16
  let V10t = parseFloat(req.body.V10t); //C17  
 
    let A = [
    [m1, 0, 0, m2, 0, 0],
    [0, m1, 0, 0, m2, 0],
    [a1*m1, -b1*m1, J1, 0, 0, 0],
    [0, 0, 0, a2*m2, -b2*m2, J2],
    [-1, 0, a1, 1, 0, -a2],
    [0, -1, -b1, 0 ,1, b2]
    ];

    let B = [
    [m1, 0, 0, m2, 0 ,0],
    [0, m1, 0, 0, m2, 0],
    [a1*m1, -b1*m1, J1, 0, 0, 0],
    [0, 0, 0, a2*m2, -b2*m2, J2],
    [En, 0, -a1*En, -En, 0, a2*En],
    [0, Et, b1*Et, 0, -Et, -b2*Et]  
    ];

    let X = [
    V10n,V10t, w10, V20n, V20t, w20
    ];

    let invA = math.inv(A);
    let BX = math.multiply(B,X);
    let result = math. multiply(invA,BX);
    let response = `{"V1n":${result[0]},"V1t":${result[1]},"W1":${result[2]},"V2n":${result[3]}, "V2t":${result[4]},"W2":${result[5]}}`;
    console.log(response);
    res.end(response);
});  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
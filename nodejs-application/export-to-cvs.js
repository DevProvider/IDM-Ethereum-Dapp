var fs = require('fs');
var csv = require('fast-csv');

module.exports = {
  writecsv: function(username,password,address,privatekey){
    var ws = fs.createWriteStream('./csv/'+username+'.csv');
    csv.write([
      [username,password,address,privatekey]
      ],{headers:true}).pipe(ws);
  }
}
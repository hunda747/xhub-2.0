const db = require('../util/database');

module.exports = class Request {
 constructor(name, email, password){
  this.name = name;
  this.email = email;
  this.password = password;
 }

 save(){

 }

 static findByEmail(email){
  return db.execute('SELECT * FROM admin WHERE admin.email = ?', [email]);
 }
}
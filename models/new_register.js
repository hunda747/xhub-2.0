const db = require('../util/database');

module.exports = class Request {
 constructor(enterpreneur_fullName,email,phone_number,business_name,business_address,business_partener,description,business_description,business_solution,business_support,business_stage){
  this.enterpreneur_fullName = enterpreneur_fullName;
  this.email = email;
  this.phone_number = phone_number;
  this.business_name = business_name;
  this.business_address = business_address;
  this.business_partener= business_partener;
  this.description = description;
  this.business_description = business_description;
  this.business_solution = business_solution;
  this.business_support = business_support;
  this.business_stage = business_stage;
 }

 save(){
		try{
			db.execute('INSERT INTO (enterpreneur_fullName,email,phone_number,business_name,business_address,business_partener1,business_partener2,business_partener3,description,business_description,business_solution,business_support,business_stage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
			 [this.enterpreneur_fullName,
				this.email,
				this.phone_number,
				this.business_name,
				this.business_address,
				this.business_partener,
				'2p',
				'3p',
				this.description,
				this.business_description,
				this.business_solution ,
				this.business_support,
				this.business_stage,
				'new']);
		}catch(error){
			console.log('new registor: '+ error);
		}
 }

 static findByEmail(email){
  return db.execute('SELECT * FROM admin WHERE admin.email = ?', [email]);
 }

	static fetchAll(){
		return db.execute('SELECT * FROM new_registers');
	}

	static fetchNewRegistered(){
		return db.execute('SELECT * FROM new_registers WHERE status = ?', 'new');
	}

	static fetchInterview(){
		return db.execute('SELECT * FROM new_registers WHERE status = ?', 'Interview');
	}

	static fetchResult(){
		return db.execute('SELECT * FROM new_registers WHERE status = ?', 'reject');
	}

 static checkEmail(email){
	return db.execute('SELECT * FROM new_registers WHERE new_registers.email = ?', [email]);
 }

	static changeStatus(status, email){
		try{
			return db.execute('UPDATE new_registers SET status = ? WHERE (email = ?)', [status, email]);
		}catch(error){
			console.log('synsdlfjalfj: ' + error);
		}
	}
}
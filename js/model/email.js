function Email(email){
    
    this.email = email;

    this.setEmail = function(email){
    	this.email = email;
    }

    this.getEmail = function(){
    	return this.email;
    }

    this.validar = function(email) {
    	regex = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;

		if(regex.test(email)){
			return true;
		}else{
			return false;
		}		
	}
    
}

// strEmail = "luiz.alexandre@live.com"
// var email = new Email();
// if(email.validar(strEmail))
//     email.setEmail(strEmail);

// console.log(email.getEmail());
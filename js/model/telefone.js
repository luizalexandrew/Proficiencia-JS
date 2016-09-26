function Telefone(telefone){
    
    this.telefone = telefone;

    this.setTelefone = function(telefone){
    	this.telefone = telefone;
    }

    this.getTelefone = function(){
    	return telefone;
    }

    this.validar = function(telefone) {

		let regex = /^\(?[0-9]{2,3}\)? ?[0-9]{4,5}-?[0-9]{4}$/;

		if(regex.test(telefone)){
			return true;
		}else{
			return false;
		}	
	}
    
}

// var telefone = new Telefone("(64) 9246-1225");
// console.log(telefone.validar(telefone.getTelefone()));
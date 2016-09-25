function ValidadorSenha(nome){
   	   	
   	let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

	if(regex.test(nome)){
	    return true;
	}else{
	    return false;
   	}
}
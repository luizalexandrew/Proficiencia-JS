function ValidadorSenha(senha){
   	   	
   	let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

	if(regex.test(senha)){
	    return true;
	}else{
	    return false;
   	}
}
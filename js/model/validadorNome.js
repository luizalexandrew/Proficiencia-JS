function ValidarNome(nome){
	
    let regex = /^[a-zA-Z ]+$/;

    if(regex.test(nome)){
        return true;
    }else{
        return false;
    }   
}
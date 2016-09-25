function formularioLogin(email, senha) {

	let login = new Login();

	if (email !== "" && senha !== "") {
		login.validar(email, senha);
	}else{
		escreverMensagemErroLogin("Preencha os campos para fazer login.");
	}
}

function validarEmailCardLogin(email){
	let objEmail = new Email();

	campoEmail = document.querySelector("#cot-email");

	if (objEmail.validar(email)){
       	campoEmail.classList.remove("input-invalid");
	} else{
    	campoEmail.classList.add("input-invalid");
	}

}

function validarSenhaCardLogin(senha){

	campoEmail = document.querySelector("#cot-senha");

	if (ValidadorSenha(senha)){
       	campoEmail.classList.remove("input-invalid");
    } else{
    	campoEmail.classList.add("input-invalid");
	}
}

function escreverMensagemErroLogin(mensagem){
	document.getElementById("msg-login-invalido").innerHTML = mensagem;
}

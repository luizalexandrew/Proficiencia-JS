function formularioLogin(email, senha) {

	let login = new Login();

	login.validar(email, btoa(senha));

}

function validarEmailCardLogin(email){
	let objEmail = new Email();

	campoEmail = document.querySelector("#cot-email");

	if (objEmail.validar(email)){
       	marcarCampoValido(campoEmail);
       	liberarLogin();
    } else{
    	marcarCampoInvalido(campoEmail);
    	liberarLogin();
	}

}

function validarSenhaCardLogin(senha){

	campoSenha = document.querySelector("#cot-senha");

	if (ValidadorSenha(senha)){
       	marcarCampoValido(campoSenha);
       	liberarLogin();
    } else{
    	marcarCampoInvalido(campoSenha);
    	liberarLogin();
	}
}

function escreverMensagemErroLogin(mensagem){
	document.getElementById("msg-login-invalido").innerHTML = mensagem;
}

function marcarCampoValido(campo){
	campo.classList.remove("input-invalid");
	campo.setAttribute('data-valid', true);
}

function marcarCampoInvalido(campo){
	campo.classList.add("input-invalid");
	campo.setAttribute('data-valid', false);
}

function liberarLogin(){

	let campoEmail = document.getElementById("cot-email").getAttribute("data-valid")  === "true";
	let campoSenha = document.getElementById("cot-senha").getAttribute("data-valid")  === "true";

	if(campoEmail && campoSenha ){
		document.getElementById("btn-logar").disabled = false;
	}else{
		document.getElementById("btn-logar").disabled = true;
	}
}
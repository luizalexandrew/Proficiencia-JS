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

function marcarCampoInvalido(campo){
	campo.classList.add("input-invalid");
	campo.setAttribute('data-valid', false);
}

function marcarCampoValido(campo){
	campo.classList.remove("input-invalid");
	campo.setAttribute('data-valid', true);
}

function liberarLogin(){

	let campoEmail = document.getElementById("cot-email").getAttribute("data-valid")  === "true";
	let campoSenha = document.getElementById("cot-senha").getAttribute("data-valid")  === "true";

	console.log(campoEmail);

	if(campoEmail && campoSenha ){
		document.getElementById("btn-logar").disabled = false;
	}else{
		document.getElementById("btn-logar").disabled = true;
	}
}
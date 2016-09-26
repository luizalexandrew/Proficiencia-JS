// nome, cpf, email, telefone, dataNascimento, senha

function validarNomeCardRegister(nome) {

	campoNome = document.querySelector("#cot-nome");

	if(ValidarNome(nome)){
		marcarCampoInvalido(campoNome);
		liberarRegistro();
	}else{
		marcarCampoValido(campoNome);
	}
}

function validarEmailCardRegister(email) {

	let objEmail = new Email();

	campoEmail = document.querySelector("#cot-email");

	if (objEmail.validar(email)){
		marcarCampoInvalido(campoEmail);
		liberarRegistro();
	}else{
		marcarCampoValido(campoEmail);
	}
}

function validarSenhaCardRegister(senha) {

	campoSenha = document.querySelector("#cot-senha");

	if(ValidadorSenha(senha)){
		marcarCampoInvalido(campoSenha);
		liberarRegistro();
	}else{
		marcarCampoValido(campoSenha);
	}
}

function validarReSenhaCardRegister(resenha) {
	campoSenha = document.querySelector("#pass");
	campoReSenha = document.querySelector("#cot-resenha");

	if(ValidadorSenha(resenha) && resenha === campoSenha.value){
		marcarCampoInvalido(campoReSenha);
		liberarRegistro();
	}else{
		marcarCampoValido(campoReSenha);
	}
}

function validarCPFCardRegister(cpf) {

	campoCPF = document.querySelector("#cot-cpf");

	var objCPF = new CPF(cpf);

	if(objCPF.validar(cpf)){
		marcarCampoInvalido(campoCPF);
		liberarRegistro();
	}else{
		marcarCampoValido(campoCPF);
	}
}


function validarTelefoneCardRegister(telefone) {

	campoTelefone = document.querySelector("#cot-telefone");

	var objTelefone = new Telefone();

	if(objTelefone.validar(telefone)){
		marcarCampoInvalido(campoTelefone);
		liberarRegistro();
	}else{
		marcarCampoValido(campoTelefone);
	}
}

function validarDataNascimentoCardRegister(dataNascimento) {

	var regex = /((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;

	campoDataNascimento = document.querySelector("#cot-nascimento");

	if(regex.test(dataNascimento)){		
		marcarCampoInvalido(campoDataNascimento);
		liberarRegistro();
	}else{
		marcarCampoValido(campoDataNascimento);
	}

}


function marcarCampoInvalido(campo){
	campo.classList.remove("input-invalid");
	campo.setAttribute('data-valid', true);
}

function marcarCampoValido(campo){
	campo.classList.add("input-invalid");
	campo.setAttribute('data-valid', false);
}

function liberarRegistro(){

	let campoNome = document.getElementById("cot-nome").getAttribute("data-valid");
	let campoEmail = document.getElementById("cot-email").getAttribute("data-valid");
	let campoSenha = document.getElementById("cot-senha").getAttribute("data-valid");
	let campoReSenha = document.getElementById("cot-resenha").getAttribute("data-valid");
	let campoCPF = document.getElementById("cot-cpf").getAttribute("data-valid");
	let campoTelefone = document.getElementById("cot-telefone").getAttribute("data-valid");
	let campoDataNascimento = document.getElementById("cot-nascimento").getAttribute("data-valid");

	if(campoNome && campoEmail && campoSenha && campoReSenha && campoCPF && campoTelefone && campoDataNascimento){
		let btnRegistar = document.querySelector("#btn-logar").disabled = false;
	}
}
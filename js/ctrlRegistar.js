// nome, cpf, email, telefone, dataNascimento, senha

function validarNomeCardRegister(nome) {

	campoNome = document.querySelector("#cot-nome");

	if(ValidarNome(nome)){
		marcarCampoValido(campoNome);			
		liberarRegistro();
	}else{
		marcarCampoInvalido(campoNome);
		liberarRegistro();
	}
}

function validarEmailCardRegister(email) {

	let objEmail = new Email();

	campoEmail = document.querySelector("#cot-email");

	if (objEmail.validar(email)){
		marcarCampoValido(campoEmail);			
		liberarRegistro();
	}else{
		marcarCampoInvalido(campoEmail);
		liberarRegistro();
	}
}

function validarSenhaCardRegister(senha) {

	campoSenha = document.querySelector("#cot-senha");

	if(ValidadorSenha(senha)){
		marcarCampoValido(campoSenha);			
		liberarRegistro();
	}else{
		marcarCampoInvalido(campoSenha);
		liberarRegistro();
	}
}

function validarReSenhaCardRegister(resenha) {
	campoSenha = document.querySelector("#pass");
	campoReSenha = document.querySelector("#cot-resenha");

	if(ValidadorSenha(resenha) && resenha == campoSenha.value){
		marcarCampoValido(campoReSenha);			
		liberarRegistro();
	}else{
		marcarCampoInvalido(campoReSenha);
		liberarRegistro();
	}
}

function validarCPFCardRegister(cpf) {

	campoCPF = document.querySelector("#cot-cpf");

	var objCPF = new CPF(cpf);

	if(objCPF.validar(cpf)){
		marcarCampoValido(campoCPF);			
		liberarRegistro();
	}else{
		marcarCampoInvalido(campoCPF);
		liberarRegistro();
	}
}


function validarTelefoneCardRegister(telefone) {

	campoTelefone = document.querySelector("#cot-telefone");

	var objTelefone = new Telefone();

	if(objTelefone.validar(telefone)){
		marcarCampoValido(campoTelefone);			
		liberarRegistro();
	}else{
		marcarCampoInvalido(campoTelefone);
		liberarRegistro();
	}
}

function validarDataNascimentoCardRegister(dataNascimento) {

	var regex = /((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;

	campoDataNascimento = document.querySelector("#cot-nascimento");

	if(regex.test(dataNascimento)){
		marcarCampoValido(campoDataNascimento);			
		liberarRegistro();
	}else{
		marcarCampoInvalido(campoDataNascimento);
		liberarRegistro();
	}

}

function marcarCampoValido(campo){
	campo.classList.remove("input-invalid");
	campo.setAttribute('data-valid', true);
}

function marcarCampoInvalido(campo){
	campo.classList.add("input-invalid");	
	campo.setAttribute('data-valid', false);
}

function liberarRegistro(){

	let campoNome = document.getElementById("cot-nome").getAttribute("data-valid") === "true";
	let campoEmail = document.getElementById("cot-email").getAttribute("data-valid") === "true";
	let campoSenha = document.getElementById("cot-senha").getAttribute("data-valid") === "true";
	let campoReSenha = document.getElementById("cot-resenha").getAttribute("data-valid") === "true";
	let campoCPF = document.getElementById("cot-cpf").getAttribute("data-valid") === "true";
	let campoTelefone = document.getElementById("cot-telefone").getAttribute("data-valid") === "true";
	let campoDataNascimento = document.getElementById("cot-nascimento").getAttribute("data-valid") === "true";

	if(campoNome && campoEmail && campoSenha && campoReSenha && campoCPF && campoTelefone && campoDataNascimento ){
		document.querySelector("#btn-logar").disabled = false;
	}else{
		document.querySelector("#btn-logar").disabled = true;
	}
}

function formularioRegistar(nome, email, senha, cpf, telefone, dataNascimento){
	
	var objEmail = new Email(email);
	var objTelefone = new Telefone(telefone);
	var objCPF = new CPF(cpf);

	var conexao = new ConnectionFactory();
	var pessoaDAO = new PessoaDAO(conexao);


	if(validarDadosNovoUsuario(nome, objEmail, senha, objCPF, objTelefone)){

		var luiz = new Pessoa(null, nome, objCPF, objEmail, objTelefone, dataNascimento, btoa(senha));

		pessoaDAO.adicionar(luiz);

		fazerLogin(luiz.getEmail(), btoa(senha));

	}
}

function fazerLogin(email, senha){

	let login = new Login();
	login.validar(email, senha);	

}

function validarDadosNovoUsuario(nome, email, senha, cpf, telefone){

	if(ValidarNome(nome) && email.validar(email.getEmail()) && ValidadorSenha(senha) && telefone.validar(telefone.getTelefone()) && cpf.validar(cpf.getCPF())){
		return true;
	}else{
		return false;
	}

}
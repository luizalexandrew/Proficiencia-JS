let body = document.querySelector("body");

body.addEventListener("load", recuperarUsuario());

function recuperarUsuario() {
	
    let cookieToken = lerCookie("auth");

    if(cookieToken){
    	if(usuarioPaginaCorretaSenaoRedirecionaParaCorreta(cookieToken)){
    		recuperarUsuarioPorToken(cookieToken);
    	}    	
	}else{
		deslogar();
	}
};

function usuarioPaginaCorretaSenaoRedirecionaParaCorreta(cookieToken){

	let idade = getIdadeUsuarioDoCookie(cookieToken);

	if(window.location.pathname === "/administracao/maiorIdade.html"){
		if (idade >= 18) {
			return true;
		}else{
			window.location.pathname = "/administracao/menorIdade.html";
		}
	}

	if(window.location.pathname === "/administracao/menorIdade.html"){
		if (idade < 18) {
			return true;
		}else{
			window.location.pathname = "/administracao/maiorIdade.html";
		}
	}
}

function getIdadeUsuarioDoCookie(cookieAuth){

    if(cookieAuth){
        let cookieSplit = atob(cookieAuth).split("|");
        return calcularIdadeUsuario(cookieSplit[1]);
    }
    return null;
}

function calcularIdadeUsuario(dataNascimento){
    let aniversario = new Date(dataNascimento);
    return ~~((Date.now() - aniversario) / (31557600000));
}

function recuperarUsuarioPorToken(token){

	let conexao = new ConnectionFactory();
    let pessoaDAO = new PessoaDAO(conexao);

	let promiseValidarToken = new Promise(function(success, fail){
        pessoaDAO.getUserPerToten(token, success, fail);
    });

    promiseValidarToken.then(function(fromSuccess){

        MontarDadosUsuariosNaPagina(fromSuccess);

    }).catch(function(fromFail){

      	console.log(fromFail);
      	deslogar();
    });
}

function deslogar() {
	apagarCookie("auth");
	window.location.pathname = "/";
}

function MontarDadosUsuariosNaPagina(pessoa){
	
	adicionarEventLisnerBotaoDeslogar();
	criarCardDadosUsuario(pessoa);

}

function adicionarEventLisnerBotaoDeslogar(){
	document.querySelector("#btn-deslogar").addEventListener("click", function(){
	    deslogar();
	});
}

function criarCardDadosUsuario(pessoa){

  	let divMain = document.getElementById("dadosUsuario");
  	divMain.setAttribute("class", "mdl-card mdl-shadow--2dp card-login cardDadosUsuario");

  	divMain.appendChild(criarParagrafoComNomeEValor("Nome", pessoa.getNome()));
  	divMain.appendChild(criarParagrafoComNomeEValor("Email", pessoa.email.getEmail()));
  	divMain.appendChild(criarParagrafoComNomeEValor("CPF", pessoa.cpf.getCPF()));
  	divMain.appendChild(criarParagrafoComNomeEValor("Telefone", pessoa.telefone.getTelefone()));
  	divMain.appendChild(criarParagrafoComNomeEValor("Data de nascimento", convertDate(pessoa.getDataNascimento())));

  	let botaoEditar = criarBotao("bntCardEditar", "Editar", criarCardEditarDados);
  	
  	divMain.appendChild(botaoEditar);



}

function limparDadosUsuario(){

	let dadosUsuario = document.querySelectorAll(".dadosUsuario")

	for (let i = dadosUsuario.length-1; i >= 0; i--){
		//remover elemento utilizando removeChild()
		dadosUsuario[i].parentNode.removeChild(dadosUsuario[i]); 
	}

	//outra forma de remover um elemento
	document.getElementById("bntCardEditar").remove();

}

function criarBotao(id, nome, funcao){
	let bnt = document.createElement("BUTTON");
	bnt.setAttribute("id", id);
  	bnt.setAttribute("class", "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect");
  	let txtbnt = document.createTextNode(nome);
  	bnt.appendChild(txtbnt);

  	bnt.addEventListener("click", funcao);
  	return bnt;
}

function criarParagrafoComNomeEValor(nome, valor){
	let paragrafo = document.createElement("P");
	paragrafo.setAttribute("class","dadosUsuario");
  	let textNode = document.createTextNode(nome + " : " + valor); 
  	paragrafo.appendChild(textNode);
  	return paragrafo;
}

function convertDate(dataDeEntrada) {
  function tranformaDoisDigitos(numero) {
  	return (numero < 10) ? '0' + numero : numero; 
  }
  let data = new Date(dataDeEntrada);
  return [tranformaDoisDigitos(data.getDate()+1), tranformaDoisDigitos(data.getMonth()+1), data.getFullYear()].join('/');
}

function criarCardEditarDados(){
	
	limparDadosUsuario();

	var formulario = document.createElement("FORM");

	formulario.setAttribute("id", "formEditarDadosUsuario");
	formulario.setAttribute("onsubmit", "atualizarDadosUsuario()");

	let btnSubmit = criarBtnSubmit("Enviar");

	formulario.appendChild(btnSubmit);

	document.getElementById("dadosUsuario").appendChild(formulario);
}

function criarBtnSubmit(nome){

	var btnSubmit = document.createElement("INPUT");
  	btnSubmit.setAttribute("value", nome);
	btnSubmit.setAttribute("type", "submit");
	btnSubmit.setAttribute("class", "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect");
	return btnSubmit;

}

function atualizarDadosUsuario(){





}
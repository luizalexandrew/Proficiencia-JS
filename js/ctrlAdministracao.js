var body = document.querySelector("body");
var usuarioRecuperado;

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

    	usuarioRecuperado = fromSuccess;
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


  	// let bntOpenModal = document.createElement("BUTTON");
  	// bntOpenModal.setAttribute("id", "show-dialog");
  	// bntOpenModal.setAttribute("type", "button");
  	// bntOpenModal.setAttribute("class", "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect");
  	
   //  let textBtn = document.createTextNode("Editar");
   //  bntOpenModal.appendChild(textBtn);


  	let botaoExcluirConta = criarBotao("bntCardExcluirConta", "Excluir Conta", excluirUsuario);

  	// divMain.appendChild(bntOpenModal);
  	divMain.appendChild(botaoExcluirConta);
}

function limparDadosUsuario(){

	let dadosUsuario = document.querySelectorAll(".dadosUsuario")

	for (let i = dadosUsuario.length-1; i >= 0; i--){
		//remover elemento utilizando removeChild()
		dadosUsuario[i].parentNode.removeChild(dadosUsuario[i]); 
	}

	//outra forma de remover um elemento
	// document.getElementById("btn-alterar").remove();
    document.getElementById("bntCardExcluirConta").remove();

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



function atualizarDadosUsuario(nome, telefone){


    let conexao = new ConnectionFactory();
    let pessoaDAO = new PessoaDAO(conexao);
    pessoaDAO.atualizarNomeETelefone(usuarioRecuperado.getID(), nome, telefone);


    let btnCancelarEdicao = document.getElementById("btnCancelarEdicao");
    btnCancelarEdicao.click();

    usuarioRecuperado.setNome(nome);
    usuarioRecuperado.telefone.setTelefone(telefone);
    limparDadosUsuario();
    criarCardDadosUsuario(usuarioRecuperado);




}

function excluirUsuario(){
	let conexao = new ConnectionFactory();
    let pessoaDAO = new PessoaDAO(conexao);

    pessoaDAO.remover(usuarioRecuperado);
    deslogar();
}

function validarTelefoneCardRegister(telefone) {

  campoTelefone = document.querySelector("#cot-telefone");

  let objTelefone = new Telefone();

  if(objTelefone.validar(telefone)){
    marcarCampoValido(campoTelefone);     
    liberarRegistro();
  }else{
    marcarCampoInvalido(campoTelefone);
    liberarRegistro();
  }
}

function validarNomeCardAlterarDados(nome) {

  campoNome = document.querySelector("#cot-nome");

  if(ValidarNome(nome)){
    marcarCampoValido(campoNome);     
    liberarRegistro();
  }else{
    marcarCampoInvalido(campoNome);
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
  let campoTelefone = document.getElementById("cot-telefone").getAttribute("data-valid") === "true";
  
  if(campoNome && campoTelefone){
    document.querySelector("#btn-alterar").disabled = false;
  }else{
    document.querySelector("#btn-alterar").disabled = true;
  }
}


(function(){
	setTimeout(function(){ 
        let dialog = document.querySelector('dialog');
        let showDialogButton = document.querySelector('#show-dialog');
        if (! dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
        }
        showDialogButton.addEventListener('click', function() {
          dialog.showModal();
        });
        dialog.querySelector('.close').addEventListener('click', function() {
          dialog.close();
        });
    }, 500);
})();
var body = document.querySelector("body");

body.addEventListener("load", recuperarUsuarioPorCookie());

function recuperarUsuarioPorCookie() {
	
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

}

function adicionarEventLisnerBotaoDeslogar(){
	document.querySelector("#btn-deslogar").addEventListener("click", function(){
	    deslogar();
	});
}

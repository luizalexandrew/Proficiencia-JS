var body = document.querySelector("body");

body.addEventListener("load", recuperarTokenUsuario());

function recuperarTokenUsuario() {

	let conexao = new ConnectionFactory();
    let pessoaDAO = new PessoaDAO(conexao);
    let cookieToken = lerCookie("auth");

    if(cookieToken){

        let promiseValidarToken = new Promise(function(success, fail){
            pessoaDAO.getUserPerToten(cookieToken, success, fail);
        });

        promiseValidarToken.then(function(fromSuccess){
            // document.getElementById("msg-login-invalido").innerHTML = "";

            // let authLogin = btoa(Math.random() + "|" + fromSuccess.dataNascimento);    
            // let conexao = new ConnectionFactory();
            // let saveToken = new PessoaDAO(conexao);
            // saveToken.setToten(fromSuccess.id, authLogin);

            // escreverCookie("auth", authLogin, 7);

            // let login =  new Login();
            // login.redirecionarUsuarioPorDataNascimento(fromSuccess.dataNascimento);
            console.log(fromSuccess);

        }).catch(function(fromFail){

        	deslogar();

        });    

	}else{
		deslogar();
	}

    

};


function deslogar() {
	apagarCookie("auth");
	window.location.pathname = "/";
}


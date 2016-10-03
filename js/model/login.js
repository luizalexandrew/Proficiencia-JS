function Login(){

    this.validar = function(email, senha){
        var conexao = new ConnectionFactory();
        var pessoaDAO = new PessoaDAO(conexao);

        var promiseRecuperarTodasPessoas = new Promise(function(success, fail){
            pessoaDAO.recuperarUsuarioEmailSenha(email, senha, success, fail);
        });

        promiseRecuperarTodasPessoas.then(function(fromSuccess){

            var authLogin = btoa(Math.random());
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000*60;


            document.cookie = "auth=" + authLogin + ";";    




            //var nome = document.getElementById("msg-login-invalido").innerHTML = "";

            //TO DO: redirecionar posteriormente;

            console.log(JSON.stringify(fromSuccess));
            console.log(authLogin);

        }).catch(function(fromFail){
            var nome = document.getElementById("msg-login-invalido");
            nome.innerHTML = fromFail;
        })
    }

}

// --------------Login Sucess------------------------

// var login = new Login();
// login.validar("luiz.alexandre@live.com", "Windows");

// --------------Login Fail---------------------------

// var login = new Login();
// login.validar("luiz.alexandre@live.com", "Linux");
function Login(){

    this.validar = function(email, senha){
        var conexao = new ConnectionFactory();
        var pessoaDAO = new PessoaDAO(conexao);

        var promiseRecuperarTodasPessoas = new Promise(function(success, fail){
            pessoaDAO.recuperarUsuarioEmailSenha(email, senha, success, fail);
        });

        promiseRecuperarTodasPessoas.then(function(fromSuccess){

            //TO DO: redirecionar posteriormente;
            console.log(fromSuccess);

        }).catch(function(fromFail){

            console.log(fromFail);
        })
    }   
}

// --------------Login Sucess------------------------

// var login = new Login();
// login.validar("luiz.alexandre@live.com", "Windows");

// --------------Login Fail---------------------------

// var login = new Login();
// login.validar("luiz.alexandre@live.com", "Linux");
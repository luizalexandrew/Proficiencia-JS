function Login(){

    this.validar = function(email, senha){
        let conexao = new ConnectionFactory();
        let pessoaDAO = new PessoaDAO(conexao);

        let promiseValidarUsuario = new Promise(function(success, fail){
            pessoaDAO.recuperarUsuarioEmailSenha(email, senha, success, fail);
        });

        promiseValidarUsuario.then(function(fromSuccess){
            document.getElementById("msg-login-invalido").innerHTML = "";

            let authLogin = btoa(Math.random() + "|" + fromSuccess.dataNascimento);    
            let conexao = new ConnectionFactory();
            let saveToken = new PessoaDAO(conexao);
            saveToken.setToten(fromSuccess.id, authLogin);

            escreverCookie("auth", authLogin, 7);

           
            setTimeout(function(){
                let login =  new Login();
                login.redirecionarUsuarioPorDataNascimento(fromSuccess.dataNascimento);
            }, 100);

        }).catch(function(fromFail){
            let nome = document.getElementById("msg-login-invalido");
            nome.innerHTML = fromFail;
        });
    }

    this.isUsuarioLogado = function(){

        let cookieAuth = lerCookie("auth");

        if(cookieAuth){
            let dataNascimento = this.getDataNascimentoDoCookie(cookieAuth);
            this.redirecionarUsuarioPorDataNascimento(dataNascimento);
        }
        
    }

    this.redirecionarUsuarioPorDataNascimento = function(dataNascimento){
        
        let data = new Date(dataNascimento);
        console.log(data);
        console.log(window.location.pathname);

        if(this.calcularIdadeUsuario(dataNascimento) >= 18){
            window.location = "../../administracao/maiorIdade.html";
        }else if(this.calcularIdadeUsuario(dataNascimento) < 18){
            window.location = "../../administracao/menorIdade.html";
        }else if (window.location.pathname != "/") {
            window.location = "/";
        }
    }

    this.getDataNascimentoDoCookie = function(cookieAuth){

        if(cookieAuth){
            let cookieSplit = atob(cookieAuth).split("|");
            return cookieSplit[1];
        }
        return null;
    }

    this.calcularIdadeUsuario = function(dataNascimento){
        let aniversario = new Date(dataNascimento);
        return ~~((Date.now() - aniversario) / (31557600000));
    }

}

(function(){
    let login = new Login();
    login.isUsuarioLogado();
})();
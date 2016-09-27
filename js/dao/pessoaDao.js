function PessoaDAO(conexao){
    
    this.connection = conexao.getConnection();  

    this.adicionar = function(pessoa){

        this.connection.transaction(function (transacao) {
            transacao.executeSql('INSERT INTO pessoas (nome, cpf, email, telefone,dataNascimento, senha) VALUES (?, ?, ?, ?, ?, ?)', 
            [pessoa.getNome(), pessoa.getCPF(), pessoa.getEmail(), 
            pessoa.getTelefone(), pessoa.getDataNascimento(),
            pessoa.getSenha()]);
        });
        console.log("Usuario Adicionado");
    }

    this.recuperarTodas = function(resolve, reject){

        this.connection.transaction(function (transacao) {
            var resultado = transacao.executeSql('SELECT * FROM pessoas', [],function (tx, results) {
                var resultados = [];
                var len = results.rows.length, i;
                for (i = 0; i < len; i++) {
                    
                    var pessoa ={
                        id: results.rows.item(i).id,
                        nome: results.rows.item(i).nome,
                        cpf: results.rows.item(i).cpf,
                        email: results.rows.item(i).email,
                        telefone: results.rows.item(i).telefone,
                        dataNascimento: results.rows.item(i).dataNascimento
                    };
                    resultados.push(pessoa);
                }
                resolve(resultados);
            });
            
        });
        
    }


    this.atualizar = function(pessoa){

        this.connection.transaction(function (transacao) {
            transacao.executeSql('UPDATE pessoas SET nome=?, cpf=?, email=?, telefone=?, dataNascimento=?, senha=? WHERE id=?', 
            [pessoa.getNome(), pessoa.getCPF(), pessoa.getEmail(), pessoa.getTelefone(), pessoa.getDataNascimento(), pessoa.getSenha(), pessoa.getID()]);
        });

        console.log(pessoa.getID() + " Atualizado");

    }

    this.remover = function(pessoa){

        this.connection.transaction(function (transacao) {
            transacao.executeSql('DELETE FROM pessoas WHERE id=?', 
            [pessoa.getID()]);
        });

        console.log(pessoa.getID() + " Removido");
    }  

    this.recuperarUsuarioEmailSenha = function(email, senha, success, fail){
        

        this.connection.transaction(function (transacao) {
            var resultado = transacao.executeSql('SELECT * FROM pessoas WHERE email=? AND senha=?', [email, senha],function (tx, results) {
              

                try{
                    var email = new Email(results.rows[0].email);
                    var telefone = new Telefone(results.rows[0].telefone);
                    var cpf = new CPF(results.rows[0].cpf);
                    var pessoa = new Pessoa(results.rows[0].id, results.rows[0].nome, cpf, email, telefone, results.rows[0].dataNascimento, null);

                    success(pessoa);
                }catch(erro){
                    fail("E-mail ou senha incorretas.");
                }
            });
            
        });
        
    }

    
}

// ---------------Criar novo usuario --------------

// var conexao = new ConnectionFactory();
// var pessoaDAO = new PessoaDAO(conexao);

// var email = new Email("tiobill@live.com");
// var telefone = new Telefone("(64)8321-3213");
// var cpf = new CPF("054.157.511-22");

// var luiz = new Pessoa(null, "Tio Bil", cpf, email, telefone, "04/10/1993", "Microsoft");

// console.log(luiz);

// pessoaDAO.adicionar(luiz);


// --------------Buscar todos Usuários-------------

// var conexao = new ConnectionFactory();
// var pessoaDAO = new PessoaDAO(conexao);

// var promiseRecuperarTodasPessoas = new Promise(function(success, fail){
//     pessoaDAO.recuperarTodas(success, fail);
// });

// promiseRecuperarTodasPessoas.then(function(fromSuccess){
//     console.log(fromSuccess);

// }).catch(function(fromReject){
//     console.log(fromReject);
// })


// --------------Remover Usuario------------------

// var conexao = new ConnectionFactory();
// var pessoaDAO = new PessoaDAO(conexao);

// var promiseRecuperarTodasPessoas = new Promise(function(success, fail){
//     pessoaDAO.recuperarTodas(success, fail);
// });

// promiseRecuperarTodasPessoas.then(function(fromSuccess){
//     var id = 2;
//     var email = new Email(fromSuccess[id].email);
//     var telefone = new Telefone(fromSuccess[id].telefone);
//     var cpf = new CPF(fromSuccess[id].cpf);

//     var luiz = new Pessoa(fromSuccess[id].id, fromSuccess[id].nome, cpf, email, telefone, fromSuccess[id].dataNascimento, null);

//     console.log(luiz);
//     pessoaDAO.remover(luiz);

// }).catch(function(fromReject){
//     console.log(fromReject);
// })

// --------------Atualizar pessoa------------------


// var conexao = new ConnectionFactory();
// var pessoaDAO = new PessoaDAO(conexao);

// var email = new Email("luizalexandrew@outlook.com");
// var telefone = new Telefone("(64)9246-9999");
// var cpf = new CPF("054.157.511-22");

// var pessoa = new Pessoa(8, "Kindle Fire", cpf, email, telefone, "04/10/1993", "Linux");
// console.log(pessoa);
// pessoaDAO.atualizar(pessoa);

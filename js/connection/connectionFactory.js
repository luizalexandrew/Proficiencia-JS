function ConnectionFactory() {

	this.connection = openDatabase("Aplicacao", "1.0", "Teste Web SQL Database", 200000);

	this.connection.transaction(function (transacao) {
	  	transacao.executeSql('CREATE TABLE IF NOT EXISTS pessoas (id INTEGER PRIMARY KEY ASC, nome, cpf, email, telefone,dataNascimento, senha)');
	});

	this.getConnection = function(){
		if(this.connection){
		    return this.connection;
		}else{
			console.log("Falha ao criar Banco de Dados");
			return null;
		}		
	}

}

// ConnectionFactory();
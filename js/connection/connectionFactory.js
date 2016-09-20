function ConnectionFactory() {

	this.connection = openDatabase("Aplicacao", "1.0", "Teste Web SQL Database", 200000);

	getConnection = function(){
		if(this.connection){
		    return this.connection;
		}else{
			console.log("Falha ao criar Banco de Dados");
			return null;
		}		
	}

}

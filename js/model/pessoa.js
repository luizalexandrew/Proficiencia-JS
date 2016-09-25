function Pessoa(id, nome, cpf, email, telefone, dataNascimento, senha){
    
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;
    this.senha = senha;

    this.setID = function(id){
        this.id = id;
    }

    this.getID = function(){
        return this.id;
    }

    this.setNome = function(nome){
        this.nome = nome;
    }

    this.getNome = function(){
        return this.nome;
    }

    this.setCPF = function(cpf){
        this.cpf = cpf;
    }

    this.getCPF = function(){
        return this.cpf.getCPF();
    }

    this.setEmail = function(email){
        this.email = email;
    }

    this.getEmail = function(){
        return this.email.getEmail();
    }

    this.setTelefone = function(telefone){
        this.telefone = telefone;
    }

    this.getTelefone = function(){
        return this.telefone.getTelefone();
    }

    this.setDataNascimento = function(dataNascimento){
        this.dataNascimento = dataNascimento;
    }

    this.getDataNascimento = function(){
        return this.dataNascimento;
    }

    this.setSenha = function(senha){
        this.senha = senha;
    }

    this.getSenha = function(){
        return this.senha;
    }


    this.validarNome = function(nome){
        let regex = /^[a-zA-Z ]+$/;

        if(regex.test(nome)){
            return true;
        }else{
            return false;
        }   
    }   
}

// var email = new Email("luiz.alexandre@live.com");
// var telefone = new Telefone("(64)9246-1227");
// var cpf = new CPF("054.157.511-22");

// var luiz = new Pessoa("Luiz Alexandre", cpf, email, telefone, "04/10/1993", "Windows");


// console.log(luiz);
// console.log(luiz.getNome());
// console.log(luiz.getCPF());
// console.log(luiz.getEmail());
// console.log(luiz.getTelefone());
// console.log(luiz.getDataNascimento());
// console.log(luiz.getSenha());

// console.log(JSON.stringify(luiz));



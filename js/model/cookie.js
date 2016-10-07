function escreverCookie(nome, valor, dias){

	var expiracao = "";

	if(dias){
		var data = new Date();
		data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
		expiracao = ";expires =" + data.toGMTString();
	}

	if(valor != "" && valor != null && valor != "null"){

		document.cookie = nome + "=" + valor + expiracao + "; path = /";
	}

}

function lerCookie(nome){
	var procuraNome = nome + "=";
	var cookies = document.cookie.split(";");

	for(var i=0; i< cookies.length; i++){
		var c = cookies[i];
		while(c.charAt(0) == ' '){
			c = c.substring(1, c.length);
		}
		if(c.indexOf(procuraNome) == 0){
			return c.substring(procuraNome.length, c.length);
		}
		return null;
	}

}

function apagarCookie(nome){
	escreverCookie(nome, " ", -1);
}


// escreverCookie("auth", "vamos la", 4);
// console.log(lerCookie("auth"));
// apagarCookie("auth");
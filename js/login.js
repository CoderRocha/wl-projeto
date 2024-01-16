//uma função simples de login com usuário e senha, bem básico

function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username && password) {

        // aqui simula uma requisição AJAX para um servidor node.js
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert("Login bem-sucedido!");
                } else {
                    alert("Nome de usuário ou senha incorretos!");
                }
            }
        };

        var data = JSON.stringify({ username: username, password: password });
        xhr.send(data);
    } else {
        alert("Preencha todos os campos corretamente!");
    }
}
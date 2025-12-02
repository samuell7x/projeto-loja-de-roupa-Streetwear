<?php
include_once("conexao.php");

$nome = $_POST['nome'];
$descricao = $_POST['descricao'];
$preco = $_POST['preco'];
$imagem = $_POST['imagem'];

$sql = "INSERT INTO produtos (nome, descricao, preco, imagem)
        VALUES ('$nome', '$descricao', '$preco', '$imagem')";

$mensagem = "";
$sucesso = false;

if ($conn->query($sql) === TRUE) {
    $mensagem = "Produto cadastrado com sucesso!";
    $sucesso = true;
} else {
    $mensagem = "Erro ao cadastrar: " . $conn->error;
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Resultado</title>

<style>
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;

        background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                    url('assets/img/r77.png') no-repeat center center fixed;
        background-size: cover;

        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: white;
    }

    .box {
        background: rgba(0,0,0,0.65);
        padding: 30px;
        width: 400px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 0 15px rgba(255,255,255,0.2);
    }

    .box h1 {
        font-size: 26px;
        margin-bottom: 20px;
        letter-spacing: 1px;
    }

    .btn {
        display: inline-block;
        margin-top: 15px;
        padding: 12px 20px;
        font-size: 16px;
        background: #6e6e6e;
        color: white;
        border: none;
        border-radius: 6px;
        text-decoration: none;
        transition: 0.3s;
        font-weight: bold;
        width: 80%;
    }

    .btn:hover {
        background: #8c8c8c;
    }
</style>
</head>

<body>

<div class="box">
    <h1><?= $mensagem ?></h1>

    <a class="btn" href="cadastrar.html">Cadastrar outro produto</a>
    <a class="btn" href="home.html">Voltar ao início</a> <!-- BOTÃO NOVO -->
</div>

</body>
</html>

<?php
include_once("conexao.php");

$nome = $_POST['nome'];
$descricao = $_POST['descricao'];
$preco = $_POST['preco'];
$imagem = $_POST['imagem'];

$sql = "INSERT INTO produtos (nome, descricao, preco, imagem, )
        VALUES ('$nome', '$descricao', '$preco', '$imagem')";

if ($conn->query($sql) === TRUE) {
    echo "Produto cadastrado com sucesso!";
} else {
    echo "Erro: " . $conn->error;
}

$conn->close();
?>

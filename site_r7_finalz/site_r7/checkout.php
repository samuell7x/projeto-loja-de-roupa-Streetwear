<?php

$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$itens = isset($_POST['itens']) ? trim($_POST['itens']) : '';
$total = isset($_POST['total']) ? trim($_POST['total']) : '';


if (empty($nome) || empty($email) || empty($itens) || empty($total)) {
    die("Erro: Todos os campos são obrigatórios.");
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=loja_r7;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $sql = $pdo->prepare("INSERT INTO pedidos (nome, email, itens, total) VALUES (?, ?, ?, ?)");
    $sql->execute([$nome, $email, $itens, $total]);

} catch (PDOException $e) {
    die("Erro ao salvar o pedido: " . $e->getMessage());
}

 
$fone = "5583989169992";


$msg = " NOVO PEDIDO R7 VzN\n";
$msg .= "-------------------------\n";
$msg .= " Nome: $nome\n";
$msg .= " Email: $email\n";
$msg .= "-------------------------\n";
$msg .= "$itens\n";
$msg .= "-------------------------\n";
$msg .= " Total: R$$total";

// Codifica para URL
$msg_url = rawurlencode($msg);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Confirmação do Pedido</title>
<style>
body { font-family: Arial, sans-serif; background:#f4f4f4; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; }
.container { background:#fff; padding:20px; border-radius:8px; max-width:500px; width:100%; box-shadow:0 0 10px rgba(0,0,0,0.1); text-align:center; }
h1 { color:#333; }
pre { background:#f0f0f0; padding:10px; border-radius:5px; text-align:left; white-space: pre-wrap; word-wrap: break-word; }
.btn-whatsapp { display:inline-block; margin-top:20px; padding:12px 20px; background:#25D366; color:#fff; font-weight:bold; border:none; border-radius:5px; text-decoration:none; font-size:16px; }
.btn-whatsapp:hover { background:#1ebe57; }
</style>
</head>
<body>
<div class="container">
    <h1>Pedido Confirmado!</h1>
    <p>Confira os dados do seu pedido antes de enviar pelo WhatsApp Web:</p>
    <pre>
Nome: <?= htmlspecialchars($nome) ?>
Email: <?= htmlspecialchars($email) ?>

Itens:
<?= htmlspecialchars($itens) ?>

Total: R$<?= htmlspecialchars($total) ?>
    </pre>
    <a class="btn-whatsapp" href="https://api.whatsapp.com/send?phone=<?= $fone ?>&text=<?= $msg_url ?>" target="_blank">
        Enviar no WhatsApp Web
    </a>
</div>
</body>
</html>

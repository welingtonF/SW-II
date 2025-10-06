<?php
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "login";

// Cria conexão
$conn = new mysqli($host, $usuario, $senha, $banco);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>

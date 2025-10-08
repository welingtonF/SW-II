<?php
include("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $senha = $_POST["senha"];

    // Prepara a consulta para buscar o usuário pelo email
    $sql = "SELECT senha FROM dados WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $stmt->bind_result($senha_hash);
    
    if ($stmt->fetch()) {
        // Verifica se a senha digitada confere com a senha criptografada armazenada
        if (password_verify($senha, $senha_hash)) {
            echo "Login realizado com sucesso!";
        } else {
            echo "Senha incorreta!";
        }
    } else {
        echo "Usuário não encontrado!";
    }

    $stmt->close();
    $conn->close();
}
?>

<?php
// Inclui o arquivo de conexão com o banco de dados
include("conexao.php");

// Verifica se o formulário foi enviado via método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Recebe os dados enviados pelo formulário
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $cpf = $_POST["cpf"];

    // Criptografa a senha antes de armazenar no banco de dados
    $senha = password_hash($_POST["senha"], PASSWORD_DEFAULT);

    // Prepara a instrução SQL para inserir os dados na tabela "dados"
    $sql = "INSERT INTO dados (nome, email, telefone, cpf, senha) VALUES (?, ?, ?, ?, ?)";

    // Prepara o statement para execução segura, evitando SQL Injection
    $stmt = $conn->prepare($sql);

    // Associa os parâmetros aos valores recebidos
    $stmt->bind_param("sssss", $nome, $email, $telefone, $cpf, $senha);

    // Executa o comando SQL
    if ($stmt->execute()) {
        // Se a execução for bem-sucedida, exibe mensagem de sucesso
        echo "Cadastro realizado com sucesso!";
    } else {
        // Em caso de erro, exibe a mensagem de erro
        echo "Erro ao cadastrar: " . $stmt->error;
    }

    // Fecha o statement e a conexão com o banco de dados
    $stmt->close();
    $conn->close();
}
?>

<?php
require_once("../conexion.php");
header('Content-Type: application/json');

try {
    $conexion = conectarDB();

    $idEleccion = $_POST['idEleccion'];
    $idPartido = $_POST['idPartido'];
    $idLocalidad = $_POST['idLocalidad'];
    $idCandidato = $_POST['idCandidato'];

    $stmt = $conexion->prepare("INSERT INTO voto (idEleccion, idPartido, idLocalidad, idCandidato) VALUES (?, ?, ?, ?)");
    $stmt->bindValue(1, $idEleccion, PDO::PARAM_INT);
    $stmt->bindValue(2, $idPartido, PDO::PARAM_INT);
    $stmt->bindValue(3, $idLocalidad, PDO::PARAM_INT);
    $stmt->bindValue(4, $idCandidato, PDO::PARAM_INT);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Voto registrado correctamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al registrar el voto", "idLocalidad" => $idLocalidad]);
    }

} catch (PDOException $e) {
    // Captura errores de la base de datos y los devuelve como JSON
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
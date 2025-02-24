<?php
require_once("../conexion.php");
header('Content-Type: application/json');

try {
    $conexion = conectarDB();

    $idEleccion = $_POST['idEleccion'];
    $idPartido = $_POST['idPartido'];
    $idLocalidad = $_POST['idLocalidad'];



    if ($idLocalidad === "0") {
        $stmt = $conexion->prepare("INSERT INTO voto (idEleccion, idPartido) VALUES (?, ?)");
        $stmt->bindValue(1, $idEleccion, PDO::PARAM_INT);
        $stmt->bindValue(2, $idPartido, PDO::PARAM_INT);
    } else {
        $stmt = $conexion->prepare("INSERT INTO voto (idEleccion, idPartido, idLocalidad) VALUES (?, ?, ?)");
        $stmt->bindValue(1, $idEleccion, PDO::PARAM_INT);
        $stmt->bindValue(2, $idPartido, PDO::PARAM_INT);
        $stmt->bindValue(3, $idLocalidad, PDO::PARAM_INT);
    }

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
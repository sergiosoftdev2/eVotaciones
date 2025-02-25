-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2025 a las 10:14:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bbdd_sgl_elecciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partido`
--

CREATE TABLE `partido` (
  `idPartido` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `siglas` varchar(10) NOT NULL,
  `logo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `partido`
--

INSERT INTO `partido` (`idPartido`, `nombre`, `siglas`, `logo`) VALUES
(2, 'Partido Popular', 'PP', 'https://upload.wikimedia.org/wikipedia/commons/6/62/Logo_PP_2019.png'),
(4, 'Unidas Podemos', 'UP', 'https://s03.s3c.es/imag/_v0/770x420/9/4/a/Unidos-Podemos.png'),
(5, 'Ciudadanos Malos', 'Cs', 'https://www.ciudadanos-cs.org/var/public/sections/page-imagen-del-partido/logo-mosca-cs.jpg?__v=594_2'),
(6, 'Esquerra Republicana de Catalunya a', 'ERC', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/ERC_logotipo_compacto.svg/2048px-ERC_logotipo_compacto.svg.png'),
(7, 'Junts', 'JxCat', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Logo_partit_Junts_per_Catalunya.png/800px-Logo_partit_Junts_per_Catalunya.png'),
(8, 'Partido Nacionalista Vasco', 'PNV', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Logo_EAJ-PNV_%282012%29.png'),
(10, 'Coalición Canaria', 'CC', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Coalici%C3%B3n_Canaria.svg/640px-Coalici%C3%B3n_Canaria.svg.png'),
(12, 'Se acabo la fiesta', 'SALF', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE5_HLYyFzyQqo8SPH5kuPWwP-9G_j0dzg_Ex1fi3dbz9qY6oB0lkGKNNy9TPt5SiiK_8&usqp=CAU'),
(13, 'BILDU', 'Bildu Bild', 'https://upload.wikimedia.org/wikipedia/commons/0/06/Logo_Eh_Bildu_2023.png'),
(14, 'Partido Socialista Obrero Español', 'PSOE', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Logotipo_del_PSOE.svg/800px-Logotipo_del_PSOE.svg.png'),
(17, 'Plvs Ultra | Felipe II', 'PLVS', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Cruz_de_San_Andr%C3%A9s_Aspa_de_Borgo%C3%B1a.png/220px-Cruz_de_San_Andr%C3%A9s_Aspa_de_Borgo%C3%B1a.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `partido`
--
ALTER TABLE `partido`
  ADD PRIMARY KEY (`idPartido`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `siglas` (`siglas`),
  ADD UNIQUE KEY `nombre_2` (`nombre`),
  ADD UNIQUE KEY `siglas_2` (`siglas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `partido`
--
ALTER TABLE `partido`
  MODIFY `idPartido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

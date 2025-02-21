CREATE TABLE `candidato` (
  `idCandidato` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idPartido` int(11) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  `numeroCandidato` enum('1','2','3') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `candidato`
--

INSERT INTO `candidato` (`idCandidato`, `idUsuario`, `idPartido`, `idLocalidad`, `numeroCandidato`) VALUES
(2, 52, 4, 16, '1'),
(11, 53, 6, 17, '2'),
(12, 61, 5, 1, '2'),
(14, 50, 17, 13, '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `censo`
--

CREATE TABLE `censo` (
  `idCenso` int(11) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `idLocalidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `censo`
--

INSERT INTO `censo` (`idCenso`, `dni`, `nombre`, `apellido`, `email`, `fechaNacimiento`, `idLocalidad`) VALUES
(1, '12345678A', 'Carlos', 'Gómez', 'carlos.gomez@example.com', '1990-05-15', 5),
(5, '32165498E', 'Yolanda', 'Ruiz', 'alejandro.ruiz@example.com', '1988-12-01', 1),
(69, '78805988Y', 'Manolo', 'Lama', 'manolo@gmail.com', '1977-06-17', 12),
(73, '67798544P', 'Juan', 'Cuesta', 'juancuesta@gmail.com', '1973-02-25', 18),
(74, '67790999Ñ', 'Fermin', 'Trujillq', 'fermin@gmail.com', '1966-08-30', 48),
(76, '56607899P', 'Pedro', 'Sanchez', 'felipe@gmail.com', '1992-02-12', 21),
(77, '11111111A', 'Administrador', 'Administrador', 'admin@admin.com', '1999-12-17', 15),
(78, '89976543R', 'Manolo', 'Escobar', 'manoloescobar@gmail.com', '1988-06-25', 16),
(79, '47856255P', 'Alejandro', 'Carmona', 'alejhandro@papa.com', '1999-12-17', 46),
(95, '11111154C', 'María', 'García', 'maria.garcia@example.com', '1990-05-15', 5),
(96, '22222222B', 'Juan', 'Pérez', 'juan.perez@example.com', '1988-12-01', 1),
(97, '33333333C', 'Ana', 'López', 'ana.lopez@example.com', '1977-06-17', 12),
(98, '44444444D', 'Carlos', 'Sánchez', 'carlos.sanchez@example.com', '1973-02-25', 18),
(99, '55555555E', 'Sofía', 'Rodríguez', 'sofia.rodriguez@example.com', '1966-08-30', 48),
(100, '66666666F', 'Miguel', 'Díaz', 'miguel.diaz@example.com', '1992-02-12', 21),
(101, '77777777G', 'Elena', 'Fernández', 'elena.fernandez@example.com', '1999-12-17', 15),
(102, '88888888H', 'Pedro', 'Gómez', 'pedro.gomez@example.com', '1988-06-25', 16),
(103, '99999999I', 'Isabel', 'Martínez', 'isabel.martinez@example.com', '1999-12-17', 46),
(104, '10101010J', 'David', 'Ruiz', 'david.ruiz@example.com', '1985-03-20', 10),
(105, '12121212K', 'Lucía', 'García', 'lucia.garcia@example.com', '1995-07-15', 5),
(106, '13131313L', 'Javier', 'Pérez', 'javier.perez@example.com', '1980-11-02', 15),
(107, '14141414M', 'Carmen', 'López', 'carmen.lopez@example.com', '1970-04-08', 8),
(108, '15151515N', 'Raúl', 'Sánchez', 'raul.sanchez@example.com', '1998-09-19', 33),
(109, '16161616O', 'Marta', 'Rodríguez', 'marta.rodriguez@example.com', '1962-01-26', 2),
(110, '85371902T', 'Laura', 'García', 'laura.garcia@example.com', '1995-03-10', 7),
(111, '39746128S', 'Pablo', 'Martínez', 'pablo.martinez@example.com', '1982-07-22', 11),
(112, '51829347Q', 'Carla', 'Fernández', 'carla.fernandez@example.com', '1979-11-05', 25),
(113, '96403581P', 'Mario', 'González', 'mario.gonzalez@example.com', '1991-04-18', 18),
(114, '27518469O', 'Alicia', 'Sánchez', 'alicia.sanchez@example.com', '1987-09-01', 9),
(115, '63925708N', 'Javier', 'Rodríguez', 'javier.rodriguez@example.com', '1974-06-12', 3),
(116, '14036829M', 'Elena', 'Díaz', 'elena.diaz@example.com', '1998-12-28', 15),
(117, '78159240L', 'Sergio', 'Pérez', 'sergio.perez@example.com', '1983-08-15', 22),
(118, '41260358K', 'Isabel', 'Gómez', 'isabel.gomez@example.com', '1976-02-09', 1),
(119, '85371902J', 'David', 'López', 'david.lopez@example.com', '1993-05-25', 12),
(120, '39746128I', 'Raquel', 'Suárez', 'raquel.suarez@example.com', '1980-10-30', 20),
(121, '51829347H', 'Álvaro', 'Ruiz', 'alvaro.ruiz@example.com', '1996-07-03', 8),
(122, '96403581G', 'Marta', 'García', 'marta.garcia@example.com', '1971-03-17', 5),
(123, '27518469F', 'Adrián', 'Martínez', 'adrian.martinez@example.com', '1989-11-21', 19),
(124, '63925708E', 'Paula', 'Fernández', 'paula.fernandez@example.com', '1978-08-07', 14),
(125, '14036829D', 'Daniel', 'González', 'daniel.gonzalez@example.com', '1992-04-14', 2),
(126, '78159240C', 'Sofía', 'Sánchez', 'sofia.sanchez@example.com', '1997-12-01', 17),
(127, '41260358B', 'Alejandro', 'Rodríguez', 'alejandro.rodriguez@example.com', '1984-09-08', 21),
(128, '85371902A', 'Carmen', 'Díaz', 'carmen.diaz@example.com', '1975-05-19', 10),
(129, '39746128Z', 'Jorge', 'Pérez', 'jorge.perez@example.com', '1990-06-26', 6),
(130, '20000200P', 'Menor', 'De Edad', 'menor@gmail.com', '2014-06-19', 18),
(131, '67804321I', 'Manolo', 'Pies de Plata', 'manolopies@gmail.com', '1992-02-02', 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunidadautonoma`
--

CREATE TABLE `comunidadautonoma` (
  `idComunidad` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comunidadautonoma`
--

INSERT INTO `comunidadautonoma` (`idComunidad`, `nombre`) VALUES
(1, 'Andalucía'),
(2, 'Aragón'),
(3, 'Asturias'),
(5, 'Canarias'),
(6, 'Cantabria'),
(7, 'Castilla y León'),
(8, 'Castilla-La Mancha'),
(9, 'Cataluña'),
(17, 'Comunidad Valenciana'),
(10, 'Extremadura'),
(11, 'Galicia'),
(4, 'Islas Baleares'),
(15, 'La Rioja'),
(12, 'Madrid'),
(13, 'Murcia'),
(14, 'Navarra'),
(16, 'País Vasco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eleccion`
--

CREATE TABLE `eleccion` (
  `idEleccion` int(11) NOT NULL,
  `tipo` enum('autonomica','general') NOT NULL,
  `estado` enum('abierta','cerrada','finalizada') NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eleccion`
--

INSERT INTO `eleccion` (`idEleccion`, `tipo`, `estado`, `fechaInicio`, `fechaFin`) VALUES
(7, 'general', 'finalizada', '2025-02-21', '2025-02-22'),
(8, 'autonomica', 'finalizada', '2025-02-21', '2025-02-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE `localidad` (
  `idLocalidad` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `idComunidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`idLocalidad`, `nombre`, `idComunidad`) VALUES
(1, 'Sevilla', 1),
(2, 'Málaga', 1),
(3, 'Granada', 1),
(4, 'Zaragoza', 2),
(5, 'Huesca', 2),
(6, 'Teruel', 2),
(7, 'Oviedo', 3),
(8, 'Gijón', 3),
(9, 'Avilés', 3),
(10, 'Palma', 4),
(11, 'Ibiza', 4),
(12, 'Menorca', 4),
(13, 'Las Palmas de Gran Canaria', 5),
(14, 'Santa Cruz de Tenerife', 5),
(15, 'La Laguna', 5),
(16, 'Santander', 6),
(17, 'Torrelavega', 6),
(18, 'Castro Urdiales', 6),
(19, 'Valladolid', 7),
(20, 'Burgos', 7),
(21, 'Salamanca', 7),
(22, 'Toledo', 8),
(23, 'Albacete', 8),
(24, 'Ciudad Real', 8),
(25, 'Barcelona', 9),
(26, 'Tarragona', 9),
(27, 'Girona', 9),
(28, 'Badajoz', 10),
(29, 'Cáceres', 10),
(30, 'Mérida', 10),
(31, 'A Coruña', 11),
(32, 'Vigo', 11),
(33, 'Santiago de Compostela', 11),
(34, 'Madrid', 12),
(35, 'Alcalá de Henares', 12),
(36, 'Getafe', 12),
(37, 'Murcia', 13),
(38, 'Cartagena', 13),
(39, 'Lorca', 13),
(40, 'Pamplona', 14),
(41, 'Tudela', 14),
(42, 'Estella', 14),
(43, 'Logroño', 15),
(44, 'Calahorra', 15),
(45, 'Arnedo', 15),
(46, 'Bilbao', 16),
(47, 'San Sebastián', 16),
(48, 'Vitoria', 16),
(49, 'Valencia', 17),
(50, 'Alicante', 17),
(51, 'Castellón de la Plana', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partido`
--

CREATE TABLE `partido` (
  `idPartido` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `siglas` varchar(10) NOT NULL,
  `logo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `partido`
--

INSERT INTO `partido` (`idPartido`, `nombre`, `siglas`, `logo`) VALUES
(2, 'Partido Popular', 'PP', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5g6NSHLbtq3ZIZTWT4f-pRICd0zaVAoDEg&s'),
(4, 'Unidas Podemos', 'UP', 'https://s10.s3c.es/imag/_v0/770x420/9/4/a/700x420_Unidos-Podemos.png'),
(5, 'Ciudadanos Malos', 'Cs', 'https://graffica.info/wp-content/uploads/2017/01/Hablamos-con-The-Bold-Strategic-Design-Studio-sobre-el-nuevo-logo-de-Ciudadanos.jpg'),
(6, 'Esquerra Republicana de Catalunya a', 'ERC', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/ERC_logotipo_compacto.svg/2048px-ERC_logotipo_compacto.svg.png'),
(7, 'Junts', 'JxCat', 'https://upload.wikimedia.org/wikipedia/commons/3/32/Logo_partit_Junts_per_Catalunya.png'),
(8, 'Partido Nacionalista Vasco', 'PNV', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Logo_EAJ-PNV_%282012%29.png'),
(10, 'Coalición Canaria', 'CC', 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Coalici%C3%B3n_Canaria.svg'),
(12, 'Se acabo la fiesta', 'SALF', 'https://upload.wikimedia.org/wikipedia/en/f/f4/Se_Acab%C3%B3_La_Fiesta.png'),
(13, 'BILDU', 'Bildu Bild', 'https://upload.wikimedia.org/wikipedia/commons/0/06/Logo_Eh_Bildu_2023.png'),
(14, 'Partido Socialista Obrero Español', 'PSOE', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Logotipo_del_PSOE.svg/800px-Logotipo_del_PSOE.svg.png'),
(16, 'Abascal Prime', 'ABAS', 'https://www.elnacional.cat/uploads/s1/39/92/03/67/santiago-abascal-giorgia-meloni-twitter-abascal.png'),
(17, 'Plvs Ultra | Felipe II', 'PLVS', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VlS2qV8YEB11IofhOWRGHJR6yHpEuS2C5Q&s'),
(18, 'Make Europe Great Again', 'MEGA', 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2024-04/240407-donald-trump-vl-932a-309069.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado`
--

CREATE TABLE `resultado` (
  `idResultado` int(11) NOT NULL,
  `idEleccion` int(11) NOT NULL,
  `idPartido` int(11) NOT NULL,
  `votosObtenidos` int(11) DEFAULT 0,
  `escañosObtenidos` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `idCenso` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('administrador','censista','votante','candidato') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `idCenso`, `password`, `rol`) VALUES
(44, 1, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'censista'),
(50, 5, '$2y$10$OEeHTZ7Ar1UqkhtpjSpNr.NFTSCHIuk9NaY3bCazJgSRChwinJhAS', 'votante'),
(51, 69, '$2y$10$32/eLGu5GxpWhDpAvBIa8eCd6SCjZ9WDZo5vqvG.u3mWwq4ezVk3W', 'votante'),
(52, 73, '$2y$10$8mWsTeOX0teVNtLpdHruyehYKXlZf9viOEZAmxCw1p0ilMFmzLJ/G', 'votante'),
(53, 74, '$2y$10$a5JtgfgnxWDNt6iaZl3W5egV0CuNOEeAiWhmFUyydYg3/4EijOXI2', 'votante'),
(54, 77, '$2y$10$wXAlsKQVyP9R6UHiCImGDuz9aFkZYplODeBsUc0mc8Ley9P1DJs8C', 'administrador'),
(60, 76, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(61, 78, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(62, 79, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(63, 95, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(64, 96, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(65, 97, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(66, 98, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(67, 99, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(68, 100, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(69, 101, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(70, 102, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(71, 103, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(72, 104, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(73, 105, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(74, 106, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(75, 107, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(76, 108, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante'),
(98, 109, '$2y$10$o2inoN7xVuQTmAVD9y5Lc.VfD.cfPVMEcqRvuvy8KPQ8tUCoijiUK', 'votante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto`
--

CREATE TABLE `voto` (
  `idVoto` int(11) NOT NULL,
  `idEleccion` int(11) NOT NULL,
  `idPartido` int(11) NOT NULL,
  `idLocalidad` int(11) NOT NULL,
  `fechaHora` timestamp NOT NULL DEFAULT current_timestamp(),
  `idCandidato` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `voto`
--

INSERT INTO `voto` (`idVoto`, `idEleccion`, `idPartido`, `idLocalidad`, `fechaHora`, `idCandidato`) VALUES
(6, 7, 16, 0, '2025-02-21 16:49:46', NULL),
(7, 7, 12, 0, '2025-02-21 17:44:37', NULL),
(8, 7, 12, 0, '2025-02-21 17:49:12', NULL),
(9, 7, 14, 0, '2025-02-21 17:51:03', NULL),
(10, 7, 4, 0, '2025-02-21 17:51:32', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votousuarioeleccion`
--

CREATE TABLE `votousuarioeleccion` (
  `idUsuario` int(11) NOT NULL,
  `idEleccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `votousuarioeleccion`
--

INSERT INTO `votousuarioeleccion` (`idUsuario`, `idEleccion`) VALUES
(44, 7),
(51, 7),
(52, 7),
(53, 7),
(54, 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `candidato`
--
ALTER TABLE `candidato`
  ADD PRIMARY KEY (`idCandidato`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idPartido` (`idPartido`),
  ADD KEY `idLocalidad` (`idLocalidad`);

--
-- Indices de la tabla `censo`
--
ALTER TABLE `censo`
  ADD PRIMARY KEY (`idCenso`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD KEY `idLocalidad` (`idLocalidad`);

--
-- Indices de la tabla `comunidadautonoma`
--
ALTER TABLE `comunidadautonoma`
  ADD PRIMARY KEY (`idComunidad`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `eleccion`
--
ALTER TABLE `eleccion`
  ADD PRIMARY KEY (`idEleccion`),
  ADD UNIQUE KEY `tipo` (`tipo`,`fechaInicio`,`fechaFin`);

--
-- Indices de la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD PRIMARY KEY (`idLocalidad`),
  ADD KEY `idComunidad` (`idComunidad`);

--
-- Indices de la tabla `partido`
--
ALTER TABLE `partido`
  ADD PRIMARY KEY (`idPartido`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `siglas` (`siglas`);

--
-- Indices de la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD PRIMARY KEY (`idResultado`),
  ADD KEY `idEleccion` (`idEleccion`),
  ADD KEY `idPartido` (`idPartido`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idCenso` (`idCenso`);

--
-- Indices de la tabla `voto`
--
ALTER TABLE `voto`
  ADD PRIMARY KEY (`idVoto`),
  ADD KEY `idPartido` (`idPartido`),
  ADD KEY `idLocalidad` (`idLocalidad`),
  ADD KEY `idEleccion` (`idEleccion`),
  ADD KEY `fk_idCandidato` (`idCandidato`);

--
-- Indices de la tabla `votousuarioeleccion`
--
ALTER TABLE `votousuarioeleccion`
  ADD PRIMARY KEY (`idUsuario`,`idEleccion`),
  ADD KEY `idEleccion` (`idEleccion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `candidato`
--
ALTER TABLE `candidato`
  MODIFY `idCandidato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `censo`
--
ALTER TABLE `censo`
  MODIFY `idCenso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT de la tabla `comunidadautonoma`
--
ALTER TABLE `comunidadautonoma`
  MODIFY `idComunidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `eleccion`
--
ALTER TABLE `eleccion`
  MODIFY `idEleccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `localidad`
--
ALTER TABLE `localidad`
  MODIFY `idLocalidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `partido`
--
ALTER TABLE `partido`
  MODIFY `idPartido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `resultado`
--
ALTER TABLE `resultado`
  MODIFY `idResultado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `voto`
--
ALTER TABLE `voto`
  MODIFY `idVoto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

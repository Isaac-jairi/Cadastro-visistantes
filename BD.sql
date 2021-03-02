CREATE DATABASE `controle_avisos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `avisos_gerais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aviso` varchar(1000) DEFAULT NULL,
  `apresentado` tinyint DEFAULT '0',
  `avisador` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `carta_mudanca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `procedencia` varchar(255) DEFAULT NULL,
  `nomearquivo` varchar(255) NOT NULL,
  `tamanhoarquivo` int NOT NULL,
  `tipoarquivo` varchar(255) NOT NULL,
  `apresentado` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `visitantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `procedencia` varchar(45) DEFAULT NULL,
  `apresentado` tinyint DEFAULT '0',
  `convidante` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `controle_avisos`.`pedido_oracao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nomePedinte` VARCHAR(100) NULL,
  `nomeFavorecido` VARCHAR(100) NULL,
  `apresentado` TINYINT NULL DEFAULT '0',
  `observacoes` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`))DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

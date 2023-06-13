-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema muungano
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema muungano
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `muungano` DEFAULT CHARACTER SET utf8 ;
USE `a7203dffa9c096f5` ;

-- -----------------------------------------------------
-- Table `muungano`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a7203dffa9c096f5`.`usuarios` (
  `id_usuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `peso` DECIMAL NOT NULL,
  `km_2meses` DOUBLE NOT NULL,
  `km_x_semana` DOUBLE NOT NULL,
  `mejor_dist_2meses` DOUBLE NOT NULL,
  `tiempo_dist_2meses` DOUBLE NOT NULL,
  `corriste_4meses` TINYINT NOT NULL,
  `dist_si_4meses` DOUBLE NOT NULL,
  `tiempo_si_4meses` VARCHAR(45) NOT NULL,
  `fecha_si_4meses` DATE NOT NULL,
  `dias_entreno` VARCHAR(45) NOT NULL,
  `ej_extra` TINYINT NOT NULL,
  `ej_extras` VARCHAR(255) NOT NULL,
  `dias_ej_extra` VARCHAR(45) NOT NULL,
  `meta_fut_dist` DOUBLE NOT NULL,
  `meta_fut_tmpo` VARCHAR(45) NOT NULL,
  `meta_fut_fecha` DATE NOT NULL,
  `smart_w` TINYINT NOT NULL,
  `marca_sw` VARCHAR(45) NOT NULL,
  `comentario_ad` VARCHAR(45) NOT NULL,
  `timestamps` DATETIME NULL,
  PRIMARY KEY (`id_usuarios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `muungano`.`contactos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a7203dffa9c096f5`.`contactos` (
  `id_contactos` INT NOT NULL AUTO_INCREMENT,
  `id_usuarios` INT NOT NULL,
  `nombre_completo` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_contactos`),
  INDEX `id_usuarios_idx` (`id_usuarios` ASC) VISIBLE,
  CONSTRAINT `id_usuarios`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `a7203dffa9c096f5`.`usuarios` (`id_usuarios`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `muungano`.`estados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a7203dffa9c096f5`.`estados` (
  `id_estados` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_estados`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `muungano`.`paises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a7203dffa9c096f5`.`paises` (
  `id_paises` INT NOT NULL AUTO_INCREMENT,
  `id_estados` INT NULL,
  `pais` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_paises`),
  INDEX `id_estados_idx` (`id_estados` ASC) VISIBLE,
  CONSTRAINT `id_estados`
    FOREIGN KEY (`id_estados`)
    REFERENCES `a7203dffa9c096f5`.`estados` (`id_estados`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `muungano`.`direcciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a7203dffa9c096f5`.`direcciones` (
  `id_direcciones` INT NOT NULL AUTO_INCREMENT,
  `id_usuarios` INT NOT NULL,
  `id_paises` INT NOT NULL,
  `c_postatl` INT NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_direcciones`),
  INDEX `id_usuarios_idx` (`id_usuarios` ASC) VISIBLE,
  INDEX `id_estados_idx` (`id_paises` ASC) VISIBLE,
  CONSTRAINT `id_usuarios_2`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `a7203dffa9c096f5`.`usuarios` (`id_usuarios`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `id_estados_2estados`
    FOREIGN KEY (`id_paises`)
    REFERENCES `a7203dffa9c096f5`.`paises` (`id_paises`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `a7203dffa9c096f5`.`estados`
(`estado`)
VALUES
('Tamaulipas');

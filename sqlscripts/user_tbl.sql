CREATE DATABASE IF NOT EXISTS sg_learner_db;
USE sg_learner_db;

CREATE TABLE `tbl_User` (
	`userID` INT NOT NULL AUTO_INCREMENT,
	`age` INT NOT NULL,
	`dateJoined` DATETIME DEFAULT NULL,
	`firstName` VARCHAR(25) NOT NULL,
	`lastName` VARCHAR(25) NOT NULL,
	`email` VARCHAR(25) NOT NULL,
	`education` VARCHAR(100) NOT NULL,
	`username` VARCHAR(255) UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT NULL,
    `birthDate` DATETIME DEFAULT NULL,
    `gender` VARCHAR(1) NOT NULL,
    
	PRIMARY KEY (`userID`)
);

INSERT INTO tbl_User VALUES (NULL,27,NULL,'John','Doe','JohnDoe@gmail.com','Bachelor degree of Electronic and Electrical Engineering','JohnDoe','passJD',null,'M');
INSERT INTO tbl_User VALUES (NULL,28,NULL,'Tom','Tan','TomTan@gmail.com','Bachelor degree of Computer Science','TomTan','passTT',null,'M');
INSERT INTO tbl_User VALUES (NULL,25,NULL,'Jimmy','Neutron','JimmyNeutron@gmail.com','Bachelor degree of Chemical Engineering','JimmyNeutron','passJN',null,'M');
INSERT INTO tbl_User VALUES (NULL,26,NULL,'Dipper','Pines','DipperPines@gmail.com','Bachelor degree of Business Management','DipperPines','passDP',null,'M');
INSERT INTO tbl_User VALUES (NULL,30,NULL,'Candace','Flynn','CandaceFlynn@gmail.com','Bachelor degree of Pyschology','CandaceFlynn','passCF',null,'F');

SELECT * FROM tbl_user;

ALTER TABLE tbl_User
ADD `birthDate` DATETIME NULL,
ADD `gender` VARCHAR(1) NULL;
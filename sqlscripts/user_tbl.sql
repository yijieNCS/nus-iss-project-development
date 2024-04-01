CREATE DATABASE IF NOT EXISTS sg_learner_db;
USE sg_learner_db;

CREATE TABLE `tbl_User` (
	`userID` INT NOT NULL AUTO_INCREMENT,
	`age` INT NOT NULL,
	`dateJoined` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`firstName` VARCHAR(25) NOT NULL,
	`lastName` VARCHAR(25) NOT NULL,
	`email` VARCHAR(25) NOT NULL,
	`education` VARCHAR(100) NOT NULL,
	`username` VARCHAR(255) UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT NULL,
    `birthDate` DATETIME DEFAULT NULL,
    `gender` VARCHAR(1) NOT NULL,
    `admin` VARCHAR(1) NOT NULL,
	PRIMARY KEY (`userID`)
);

INSERT INTO tbl_User VALUES (NULL,31,NULL,'John','Doe','JohnDoe@gmail.com','Bachelor degree of Electronic and Electrical Engineering','JohnDoe','passJD','1995-05-15 00:00:00','M','N');
INSERT INTO tbl_User VALUES (NULL,25,NULL,'Tom','Tan','TomTan@gmail.com','Bachelor degree of Computer Science','TomTan','passTT','1999-05-15 00:00:00','M','N');
INSERT INTO tbl_User VALUES (NULL,26,NULL,'Jimmy','Neutron','JimmyNeutron@gmail.com','Bachelor degree of Chemical Engineering','JimmyNeutron','passJN','1998-05-15 00:00:00','M','N');
INSERT INTO tbl_User VALUES (NULL,27,NULL,'Dipper','Pines','DipperPines@gmail.com','Bachelor degree of Business Management','DipperPines','passDP','1997-05-15 00:00:00','M','N');
INSERT INTO tbl_User VALUES (NULL,28,NULL,'Candace','Flynn','CandaceFlynn@gmail.com','Bachelor degree of Pyschology','CandaceFlynn','passCF','1996-05-15 00:00:00','F','N');
INSERT INTO tbl_User VALUES (NULL,30,NULL,'admin','1','admin1@gmail.com','admin','admin1','passA1',null,'M','Y');

SELECT * FROM tbl_user;

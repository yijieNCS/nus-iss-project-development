CREATE DATABASE IF NOT EXISTS sg_learner_db;
USE sg_learner_db;

CREATE TABLE `report` (
	`reportId` INT NOT NULL AUTO_INCREMENT,
	`report` VARCHAR(100) NOT NULL,
	`reportedUser` INT NOT NULL,
	`reportBy` INT NOT NULL,
	PRIMARY KEY (`reportId`),
 	FOREIGN KEY (`reportedUser`) REFERENCES tbl_User(`userId`),
	FOREIGN KEY (`reportBy`) REFERENCES tbl_User(`userId`)
);

INSERT INTO report VALUES (NULL,'bad tutor',1,2);


SELECT * FROM report;

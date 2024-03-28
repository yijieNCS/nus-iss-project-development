CREATE DATABASE IF NOT EXISTS sg_learner_db;
USE sg_learner_db;

CREATE TABLE `resume` (
	`resumeId` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`years` DATETIME NOT NULL,
	`name` VARCHAR(15) NOT NULL,
	`types` VARCHAR(10) NOT NULL,
	`description` VARCHAR(15) NOT NULL,
	PRIMARY KEY (`resumeId`),
    FOREIGN KEY (`userId`) REFERENCES tbl_User(`userID`)
);
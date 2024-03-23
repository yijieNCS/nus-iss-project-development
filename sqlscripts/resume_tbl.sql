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

INSERT INTO resume VALUES (NULL,1,5,'2024-01-20 13:34:56','COMPLETED','Ang Mo Kio Ave 5');
INSERT INTO resume VALUES (NULL,4,2,'2024-01-20 13:34:56','COMPLETED','Bukit Merah Street 43');
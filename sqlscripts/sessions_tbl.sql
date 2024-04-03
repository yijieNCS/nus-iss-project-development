CREATE DATABASE IF NOT EXISTS sg_learner_db;
USE sg_learner_db;

CREATE TABLE `sessions` (
	`sessionId` INT NOT NULL AUTO_INCREMENT,
	`tutorId` INT NOT NULL,
	`studentId` INT NOT NULL,
	`timing` DATETIME NOT NULL,
	`status` VARCHAR(10) NOT NULL,
	`location` VARCHAR(25) NOT NULL,
	PRIMARY KEY (`sessionId`),
    FOREIGN KEY (`tutorId`) REFERENCES tbl_User(`userID`),
    FOREIGN KEY (`studentId`) REFERENCES tbl_User(`userID`)
);

INSERT INTO sessions VALUES (NULL,1,5,'2024-01-20 13:34:56','COMPLETED','Ang Mo Kio Ave 5');
INSERT INTO sessions VALUES (NULL,2,1,'2024-02-20 13:34:56','COMPLETED','Ang Mo Kio Ave 5');
INSERT INTO sessions VALUES (NULL,1,3,'2024-03-20 13:34:56','COMPLETED','Ang Mo Kio Ave 5');
INSERT INTO sessions VALUES (NULL,4,1,'2024-05-20 13:34:56','COMPLETED','Ang Mo Kio Ave 5');
INSERT INTO sessions VALUES (NULL,4,2,'2024-01-20 13:34:56','COMPLETED','Bukit Merah Street 43');


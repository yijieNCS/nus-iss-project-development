CREATE DATABASE IF NOT EXISTS sg_learner_db;
USE sg_learner_db;

CREATE TABLE `service` (
	`serviceId` INT NOT NULL AUTO_INCREMENT,
	`userId` INT NOT NULL,
	`rate` FLOAT NOT NULL,
	PRIMARY KEY (`serviceId`),
    FOREIGN KEY (`userId`) REFERENCES tbl_User(`userID`)
);

INSERT INTO service VALUES (NULL,1,5.00);
INSERT INTO service VALUES (NULL,2,7.00);

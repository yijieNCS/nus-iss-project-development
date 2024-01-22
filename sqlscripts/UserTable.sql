CREATE TABLE `tbl_User` (
  `userID` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `age` VARCHAR(3) NOT NULL,
  `dateJoined` DATETIME DEFAULT NULL,
  `firstName` VARCHAR(20) NOT NULL,
  `lastName` VARCHAR(20) NOT NULL,
  `email` VARCHAR(25) NOT NULL,
  `education` VARCHAR(100) NOT NULL,
  `username` VARCHAR(255) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=INNODB DEFAULT CHARSET=UTF8;


INSERT INTO tbl_User VALUES (NULL,27,NULL,'John','Doe','JohnDoe@gmail.com','Bachelor degree of Electronic and Electrical Engineering','JohnDoe','passJD');
INSERT INTO tbl_User VALUES (NULL,28,NULL,'Tom','Tan','TomTan@gmail.com','Bachelor degree of Computer Science','TomTan','passTT');
INSERT INTO tbl_User VALUES (NULL,25,NULL,'Jimmy','Neutron','JimmyNeutron@gmail.com','Bachelor degree of Chemical Engineering','JimmyNeutron','passJN');
INSERT INTO tbl_User VALUES (NULL,26,NULL,'Dipper','Pines','DipperPines@gmail.com','Bachelor degree of Business Management','DipperPines','passDP');
INSERT INTO tbl_User VALUES (NULL,30,NULL,'Candace','Flynn','CandaceFlynn@gmail.com','Bachelor degree of Pyschology','CandaceFlynn','passCF');





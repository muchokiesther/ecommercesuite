-- USE  ASSIGNMENT
-- go
 
 CREATE TABLE users(
 id VARCHAR(200) PRIMARY KEY,
 userName VARCHAR(155),
 fullName VARCHAR(155),
 email VARCHAR(155) UNIQUE,
 phoneNumber INT,
 password VARCHAR (200),
 isDeleted INT DEFAULT 0
 )

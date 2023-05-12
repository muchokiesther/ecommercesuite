-- NOT NECESSARY
-- USE  ASSIGNMENT
-- go

 CREATE TABLE products(
 productid VARCHAR(200) PRIMARY KEY,
 productName VARCHAR(155),
 productDescription VARCHAR (155),
 productImage VARCHAR(1000),
 price INT,
 isDeleted INT DEFAULT 0
 )

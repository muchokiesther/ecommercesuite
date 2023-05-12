-- add user
CREATE OR ALTER PROCEDURE addUser(
	@id VARCHAR(200), 
	@username VARCHAR(200), 
	@fullname VARCHAR(200), 
	@email VARCHAR(200),
	@phonenumber VARCHAR(200), 
	@password VARCHAR(200))
AS 
BEGIN
INSERT INTO Users(id,userName,fullName,email,phoneNumber,password) VALUES (@id, @username, @fullname, @email, @phonenumber, @password)

END
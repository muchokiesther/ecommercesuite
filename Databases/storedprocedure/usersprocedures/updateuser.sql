CREATE OR ALTER PROCEDURE updateUser(
 @id VARCHAR(200), @username VARCHAR(155), @fullname VARCHAR(155), @email VARCHAR(155), @phonenumber INT, @password VARCHAR(200))
AS
BEGIN
	UPDATE users SET  userName=@username, fullName=@fullname, email=@email, phoneNumber=@phonenumber, password=@password WHERE id=@id
END

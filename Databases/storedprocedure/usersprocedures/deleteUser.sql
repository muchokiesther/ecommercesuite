CREATE OR ALTER PROCEDURE deleteUser(@id VARCHAR(200))
AS
BEGIN
	UPDATE users SET isDeleted = 1 WHERE id=@id
END
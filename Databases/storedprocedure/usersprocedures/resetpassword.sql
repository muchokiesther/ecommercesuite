
CREATE OR ALTER PROCEDURE resetUserPassword(@email VARCHAR(150), @password VARCHAR(250))
AS
BEGIN
	UPDATE Users SET UPASSWORD = @password WHERE EMAIL=@email	
END
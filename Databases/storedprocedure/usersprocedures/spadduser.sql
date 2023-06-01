-- add user

CREATE OR ALTER PROCEDURE addUserDetails(
	@userid VARCHAR(200), @username VARCHAR(100),
	@fullname VARCHAR(200), @email VARCHAR(150),
	@phonenumber INT, @password VARCHAR(250))
AS
BEGIN
	INSERT INTO Users(USERID,USERNAME,FULLNAME,EMAIL,PHONENUMBER,UPASSWORD) VALUES(@userid,@username,@fullname,@email,@phonenumber,@password)
END

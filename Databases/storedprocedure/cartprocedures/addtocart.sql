CREATE OR ALTER PROCEDURE addtoCart
	@cid VARCHAR(200),
	@pid VARCHAR(200),
	@email VARCHAR(150)
AS
BEGIN
	DECLARE @uid VARCHAR(200)
	DECLARE @pname VARCHAR(155)
	DECLARE @pdescription VARCHAR(155)
	DECLARE @price INT

	SELECT @uid=USERID FROM Users WHERE EMAIL=@email

	SELECT @pname=PNAME, @pdescription=PDESCRIPTION, @price=PRICE
	FROM Products
	WHERE PID=@pid

	INSERT INTO Cartbasket(CID,PID,UID,PNAME,PDESCRIPTION,PRICE) 
	VALUES (@cid, @pid, @uid, @pname, @pdescription, @price)	
END
SELECT * FROM Users
SELECT * FROM Products
SELECT * FROM Cartbasket
EXEC addtoCart @cid='st3012', @pid='2329', @email='johnny@bravo.com'
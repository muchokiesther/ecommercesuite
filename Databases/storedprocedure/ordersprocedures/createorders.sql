CREATE OR ALTER PROCEDURE createOrder
	@orid VARCHAR(200),
	 @cid VARCHAR(200)
AS
BEGIN
	
	DECLARE @uid VARCHAR(200)
	DECLARE @pname VARCHAR(155)
	DECLARE @pdescription VARCHAR(155)
	DECLARE @price INT
	DECLARE @pcount INT
	DECLARE @uemail VARCHAR(150)

	
	SELECT @uid=UID,@pname=PNAME, @pdescription=PDESCRIPTION, @price=PRICE, @pcount=PCOUNT
	FROM dbo.Cartbasket
	WHERE CID=@cid

	SELECT @uemail=EMAIL FROM Users WHERE USERID=@uid

	INSERT INTO Orders (ORDERID,CID, UID, UEMAIL,PNAME, PDESCRIPTION, PRICE, PCOUNT)
	VALUES(@orid,@cid,@uid,@uemail,@pname,@pdescription,@price,@pcount)	

END

EXEC createOrder @orderid='1422', @pid='8989', @pname='earings', @price=500, @pcount=20
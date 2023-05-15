CREATE OR ALTER PROCEDURE addProduct(
	@pid VARCHAR(200),
	@pname VARCHAR(155),
	@pdescription VARCHAR(155),
	@pimage VARCHAR(1000),
	@price INT ) 
AS
BEGIN
INSERT INTO Products(PID ,PNAME, PDESCRIPTION, PIMAGE, PRICE) VALUES(@pid, @pname, @pdescription ,@pimage, @price)
END

EXEC addProduct @pid='23423', @pname='Chindano', @pdescription='nda thagereirie', @pimage='link', @price=75 
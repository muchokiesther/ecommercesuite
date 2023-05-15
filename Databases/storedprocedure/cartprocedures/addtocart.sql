CREATE OR ALTER PROCEDURE addtoCart(
	@pid VARCHAR(200),
	@pname VARCHAR(155),
	@pdescription VARCHAR(155),
	@price INT ) 
AS
BEGIN
INSERT INTO CartLists(PID ,PNAME, PDESCRIPTION, PRICE) VALUES(@pid, @pname, @pdescription, @price)
END
EXEC addtoCart @pid='23423', @pname='Chindano', @pdescription='nda thagereirie', @price=75 
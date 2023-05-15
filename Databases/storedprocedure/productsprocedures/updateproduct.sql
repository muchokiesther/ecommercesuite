CREATE OR ALTER PROCEDURE updateProduct(
    @pid VARCHAR(200),
    @pname VARCHAR(155), 
    @pdescription VARCHAR(155), 
    @pimage VARCHAR(1000), 
    @price INT)
AS 
BEGIN
UPDATE Products SET PNAME=@pname, PDESCRIPTION=@pdescription, PIMAGE=@pimage, PRICE=@price WHERE PID=@pid AND isDeleted=0
END

EXEC updateProduct @pid='23423', @pname='Shindano', @pdescription='nda thagereirie ithegereriano', @pimage='link', @price=2334
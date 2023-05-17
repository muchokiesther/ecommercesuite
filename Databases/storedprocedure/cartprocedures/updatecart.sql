CREATE OR ALTER PROCEDURE updateItemCart(
    @pid VARCHAR(200),
    @pname VARCHAR(155), 
    @pdescription VARCHAR(155), 
    @price INT)
AS 
BEGIN
UPDATE CartLists SET PNAME=@pname, PDESCRIPTION=@pdescription, PRICE=@price, PCOUNT=PCOUNT+1 WHERE PID=@pid
END
EXEC updateItemCart @pid='23423', @pname='Chindano', @pdescription='nda thagereirie', @price=75 



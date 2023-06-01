CREATE OR ALTER PROCEDURE updateItemCartUser(
    @cid VARCHAR(200), @pid VARCHAR(200), @pcount INT)
AS 
BEGIN
UPDATE Cartbasket SET PCOUNT=@pcount WHERE @pcount<= (SELECT PQUANTITY FROM Products WHERE PID=@pid) AND CID=@cid

END

EXEC updateItemCartUser @cid='st3012', @pid='2329', @pcount=56
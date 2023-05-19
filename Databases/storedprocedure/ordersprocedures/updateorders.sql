CREATE OR ALTER PROCEDURE updateOrder(@orderid VARCHAR(200), @pid VARCHAR(200), @pname VARCHAR(155), @price INT, @pcount INT)
AS
BEGIN
	UPDATE Orders SET PNAME=@pname, PRICE=@price, PCOUNT=@pcount WHERE ORDERID=@orderid AND PID=@pid
END

EXEC updateOrder @orderid='1422', @pid='8989', @pname='earings', @price=150, @pcount=10,@orderStatus='delievered'
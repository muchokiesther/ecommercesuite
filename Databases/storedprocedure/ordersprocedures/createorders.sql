CREATE OR ALTER PROCEDURE createOrder(@orderid VARCHAR(200), @pid VARCHAR(200), @pname VARCHAR(155), @price INT, @pcount INT)
AS
BEGIN
	INSERT INTO Orders(ORDERID,PID,PNAME,PRICE,PCOUNT) VALUES(@orderid, @pid, @pname, @price, @pcount)
END

EXEC createOrder @orderid='1422', @pid='8989', @pname='earings', @price=500, @pcount=20
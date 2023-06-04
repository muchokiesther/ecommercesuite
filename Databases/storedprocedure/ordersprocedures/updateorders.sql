CREATE OR ALTER PROCEDURE updateOrder(@orderid VARCHAR(200), @orderstatus VARCHAR(155))
AS
BEGIN
	UPDATE Orders SET ORDERSTATUS=@orderstatus WHERE ORDERID=@orderid AND ISDELETED=0
END

EXEC updateOrder @orderid='1422', @pid='8989', @pname='earings', @price=150, @pcount=10,@orderStatus='delievered'
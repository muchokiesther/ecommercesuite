CREATE OR ALTER PROCEDURE deleteOrder(@orderid VARCHAR(200))
AS
BEGIN
	UPDATE Orders SET ISDELETED=1 WHERE ORDERID=@orderid 
END

exec deleteOrder '1422'
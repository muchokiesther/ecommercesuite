CREATE OR ALTER PROCEDURE removeItemfromCart(@pid VARCHAR(200))
AS 
BEGIN
	DELETE * FROM Cartbasket WHERE PID=@pid
END
EXEC removeItemfromCart '2329'
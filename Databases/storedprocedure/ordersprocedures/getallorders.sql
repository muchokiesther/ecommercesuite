CREATE OR ALTER PROCEDURE viewActiveorders
AS
BEGIN
	SELECT * FROM Orders WHERE ISDELETED=0
END
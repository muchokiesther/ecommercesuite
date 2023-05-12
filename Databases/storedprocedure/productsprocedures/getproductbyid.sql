CREATE OR ALTER PROCEDURE getProductById(@productid VARCHAR(200))
AS 
BEGIN
SELECT * FROM products WHERE productid=@productid AND isDeleted=0
END
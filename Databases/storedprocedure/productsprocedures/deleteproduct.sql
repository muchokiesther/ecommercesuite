CREATE OR ALTER PROCEDURE deleteProduct(@productid VARCHAR(200))
AS 
BEGIN
UPDATE products SET isDeleted=1 WHERE productid=@productid 
END
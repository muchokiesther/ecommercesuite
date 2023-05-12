CREATE OR ALTER PROCEDURE getallproducts
AS
BEGIN
    SELECT * FROM products WHERE isDeleted=0
END
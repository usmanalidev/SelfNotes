// SQL Category Notes - Comprehensive Interview Preparation
export const sqlNotes = [
  {
    id: 2000,
    category: 'SQL',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    answer: `**One-Sentence Definition:** INNER JOIN returns only matching rows from both tables, while LEFT JOIN returns all rows from the left table and matching rows from the right table.

**The Core Concept:** INNER JOIN is like finding people who have both a driver's license AND a car - only those with both. LEFT JOIN is like listing all people with driver's licenses, and if they have a car, show it; if not, show NULL. You get everyone from the left table regardless.

**Key Points to Remember:**
- INNER JOIN: Only rows with matches in both tables
- LEFT JOIN: All rows from left table + matches from right (NULL if no match)
- RIGHT JOIN: All rows from right table + matches from left
- FULL OUTER JOIN: All rows from both tables
- Use INNER JOIN when you need matches only
- Use LEFT JOIN when you need all records from one table

**Quick Comparison:**

| JOIN Type | Left Table | Right Table | Result |
|-----------|------------|-------------|--------|
| INNER | Matching only | Matching only | Intersection |
| LEFT | All rows | Matching only | All left + matches |
| RIGHT | Matching only | All rows | All right + matches |
| FULL OUTER | All rows | All rows | Union |

**Example:**
\`\`\`sql
-- INNER JOIN - only users with orders
SELECT u.name, o.order_id
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
-- Returns: Only users who have orders

-- LEFT JOIN - all users, with orders if they exist
SELECT u.name, o.order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Returns: All users, NULL for order_id if no orders
\`\`\``
  },
  {
    id: 2001,
    category: 'SQL',
    question: 'What is a database index and why is it important?',
    answer: `**One-Sentence Definition:** An index is a data structure that speeds up data retrieval by creating a quick lookup path, similar to a book's index.

**The Core Concept:** Think of a book index. Instead of reading every page to find "Dependency Injection," you check the index which tells you it's on page 45. Database indexes work the same way - they create a sorted structure that points to data locations, making searches much faster.

**Key Points to Remember:**
- Speeds up SELECT queries significantly
- Slows down INSERT, UPDATE, DELETE (index must be maintained)
- Clustered index: Data physically sorted (one per table, usually primary key)
- Non-clustered index: Separate structure with pointers to data (multiple allowed)
- Index columns used in WHERE, JOIN, ORDER BY clauses
- Don't over-index (balance read vs write performance)

**Classic Interview Q&A:**
**Q:** Which columns should have non-clustered indexes?
**A:** Columns frequently used in WHERE clauses, foreign keys, columns in JOIN conditions, and columns used in ORDER BY. Avoid indexing columns with low selectivity (few unique values) or columns rarely used in queries.

**Example:**
\`\`\`sql
-- Create clustered index (primary key)
CREATE TABLE Users (
    Id INT PRIMARY KEY, -- Clustered index
    Email VARCHAR(100),
    Name VARCHAR(100)
);

-- Create non-clustered index
CREATE INDEX idx_email ON Users(Email);

-- Composite index
CREATE INDEX idx_name_email ON Users(Name, Email);

-- Query uses index
SELECT * FROM Users WHERE Email = 'user@example.com';
-- Fast: Uses idx_email index

-- Query without index (table scan - slow)
SELECT * FROM Users WHERE Name = 'John';
-- Slow: Scans entire table
\`\`\``
  },
  {
    id: 2002,
    category: 'SQL',
    question: 'What is the difference between WHERE and HAVING clauses?',
    answer: `**One-Sentence Definition:** WHERE filters rows before grouping, while HAVING filters groups after GROUP BY.

**The Core Concept:** WHERE is like filtering ingredients before cooking (individual items). HAVING is like filtering finished dishes after cooking (groups). You use WHERE to filter individual rows, and HAVING to filter aggregated groups.

**Key Points to Remember:**
- WHERE: Filters individual rows before aggregation
- HAVING: Filters groups after GROUP BY
- WHERE: Cannot use aggregate functions (COUNT, SUM, etc.)
- HAVING: Can use aggregate functions
- WHERE: Used with SELECT, UPDATE, DELETE
- HAVING: Only used with SELECT and GROUP BY

**Quick Comparison:**

| Feature | WHERE | HAVING |
|---------|-------|--------|
| Applied To | Individual rows | Groups |
| Aggregate Functions | ❌ | ✅ |
| Timing | Before GROUP BY | After GROUP BY |
| Use With | SELECT, UPDATE, DELETE | SELECT with GROUP BY |

**Example:**
\`\`\`sql
-- WHERE filters before grouping
SELECT department, COUNT(*) as emp_count
FROM employees
WHERE salary > 50000  -- Filters individual employees
GROUP BY department;
-- Result: Departments with employees earning > 50000

-- HAVING filters after grouping
SELECT department, COUNT(*) as emp_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;  -- Filters groups (departments)
-- Result: Only departments with more than 5 employees

-- Both together
SELECT department, AVG(salary) as avg_salary
FROM employees
WHERE salary > 30000  -- Filter employees first
GROUP BY department
HAVING AVG(salary) > 50000;  -- Filter departments after
\`\`\``
  },
  {
    id: 2003,
    category: 'SQL',
    question: 'What is the difference between Stored Procedure and Function?',
    answer: `**One-Sentence Definition:** Stored Procedures are precompiled SQL code that can return multiple values and perform DML operations, while Functions must return a single value and cannot modify database state.

**The Core Concept:** Stored Procedure is like a full recipe - it can do multiple things (cook, serve, clean). Function is like a single tool - it does one thing and returns a result (like a calculator). Procedures can change data, functions typically just calculate.

**Key Points to Remember:**
- Stored Procedure: Can return multiple values, can perform DML (INSERT, UPDATE, DELETE)
- Function: Must return single value, cannot perform DML (read-only)
- Stored Procedure: Can use TRY-CATCH, transactions
- Function: Can be used in SELECT statements
- Stored Procedure: EXEC or EXECUTE to call
- Function: Called in SELECT, WHERE, etc.

**Quick Comparison:**

| Feature | Stored Procedure | Function |
|---------|------------------|----------|
| Return Value | Optional, multiple | Required, single |
| DML Operations | ✅ | ❌ |
| Can Call from SELECT | ❌ | ✅ |
| Transactions | ✅ | ❌ |
| Performance | Precompiled | Precompiled |

**Example:**
\`\`\`sql
-- Stored Procedure
CREATE PROCEDURE GetUserOrders
    @UserId INT,
    @OrderCount INT OUTPUT
AS
BEGIN
    SELECT * FROM Orders WHERE UserId = @UserId;
    SELECT @OrderCount = COUNT(*) FROM Orders WHERE UserId = @UserId;
END

-- Execute
DECLARE @Count INT;
EXEC GetUserOrders @UserId = 1, @OrderCount = @Count OUTPUT;

-- Function
CREATE FUNCTION GetUserOrderCount(@UserId INT)
RETURNS INT
AS
BEGIN
    RETURN (SELECT COUNT(*) FROM Orders WHERE UserId = @UserId);
END

-- Use in SELECT
SELECT Name, dbo.GetUserOrderCount(Id) AS OrderCount
FROM Users;
\`\`\``
  },
  {
    id: 2004,
    category: 'SQL',
    question: 'What is the difference between Primary Key and Foreign Key?',
    answer: `**One-Sentence Definition:** Primary Key uniquely identifies each row in a table, while Foreign Key references the Primary Key of another table to establish relationships.

**The Core Concept:** Primary Key is like a social security number - unique to each person. Foreign Key is like a reference to someone's SSN - it points to another table's primary key to show relationships. For example, an Order table has a foreign key to User table's primary key.

**Key Points to Remember:**
- Primary Key: Unique identifier, cannot be NULL, one per table
- Foreign Key: References another table's primary key, can be NULL, maintains referential integrity
- Primary Key: Automatically creates clustered index
- Foreign Key: Enforces relationship, prevents orphaned records
- Primary Key: Can be composite (multiple columns)
- Foreign Key: Can have CASCADE options (DELETE/UPDATE)

**Quick Comparison:**

| Feature | Primary Key | Foreign Key |
|---------|-------------|-------------|
| Uniqueness | Must be unique | Can have duplicates |
| NULL Values | Not allowed | Allowed |
| Purpose | Identify row | Reference relationship |
| Index | Clustered (usually) | Non-clustered |
| Count | One per table | Multiple allowed |

**Example:**
\`\`\`sql
-- Primary Key
CREATE TABLE Users (
    Id INT PRIMARY KEY,  -- Primary key
    Email VARCHAR(100) UNIQUE,
    Name VARCHAR(100)
);

-- Foreign Key
CREATE TABLE Orders (
    Id INT PRIMARY KEY,
    UserId INT,  -- Foreign key column
    OrderDate DATETIME,
    FOREIGN KEY (UserId) REFERENCES Users(Id)  -- References Users.Id
    -- Or: CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- With CASCADE
CREATE TABLE Orders (
    Id INT PRIMARY KEY,
    UserId INT,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
        ON DELETE CASCADE  -- Delete orders when user deleted
        ON UPDATE CASCADE  -- Update orders when user id updated
);
\`\`\``
  },
  {
    id: 2005,
    category: 'SQL',
    question: 'What are Views, Indexes, Cursors, DDL, DML, Temp Tables, and Triggers?',
    answer: `**One-Sentence Definitions:**
- **View:** Virtual table based on a SELECT query
- **Index:** Data structure that speeds up queries
- **Cursor:** Database object to iterate through result sets row by row
- **DDL:** Data Definition Language (CREATE, ALTER, DROP)
- **DML:** Data Manipulation Language (SELECT, INSERT, UPDATE, DELETE)
- **Temp Table:** Temporary table that exists only for the session
- **Trigger:** Stored procedure that automatically executes on data changes

**Key Points to Remember:**

**Views:**
- Virtual table (doesn't store data)
- Can be used for SELECT, some allow INSERT/UPDATE
- Simplifies complex queries, provides security layer
- Example: CREATE VIEW ActiveUsers AS SELECT * FROM Users WHERE IsActive = 1

**Indexes:**
- Speeds up queries, slows down writes
- Clustered (one per table) vs Non-clustered (multiple)

**Cursors:**
- Row-by-row processing (usually avoid, use set-based operations)
- Slow performance, use only when necessary

**DDL (Data Definition Language):**
- CREATE, ALTER, DROP, TRUNCATE
- Defines database structure

**DML (Data Manipulation Language):**
- SELECT, INSERT, UPDATE, DELETE
- Manipulates data

**Temp Tables:**
- #table (session-scoped) or ##table (global)
- Automatically dropped when session ends

**Triggers:**
- AFTER INSERT/UPDATE/DELETE or INSTEAD OF
- Automatic execution on data changes
- Use sparingly (can cause performance issues)

**Example:**
\`\`\`sql
-- View
CREATE VIEW vw_UserOrders AS
SELECT u.Name, o.OrderDate, o.Total
FROM Users u
INNER JOIN Orders o ON u.Id = o.UserId;

-- Use view
SELECT * FROM vw_UserOrders WHERE Total > 100;

-- Temp Table
CREATE TABLE #TempOrders (
    OrderId INT,
    Total DECIMAL(10,2)
);
INSERT INTO #TempOrders SELECT Id, Total FROM Orders;
-- Automatically dropped when session ends

-- Trigger
CREATE TRIGGER trg_UpdateOrderDate
ON Orders
AFTER UPDATE
AS
BEGIN
    UPDATE Orders
    SET ModifiedDate = GETDATE()
    WHERE Id IN (SELECT Id FROM inserted);
END;
\`\`\``
  },
  {
    id: 2006,
    category: 'SQL',
    question: 'How to optimize query performance and stored procedures?',
    answer: `**One-Sentence Definition:** Query optimization involves using indexes, avoiding table scans, writing efficient queries, and analyzing execution plans to improve performance.

**The Core Concept:** Think of query optimization like planning a road trip. Instead of checking every road (table scan), use a map (index) to find the fastest route. Avoid unnecessary stops (unnecessary columns), and plan your route efficiently (proper joins).

**Key Points to Remember:**
- Use indexes on frequently queried columns
- Avoid SELECT * (select only needed columns)
- Use WHERE clauses to filter early
- Avoid functions in WHERE clauses (prevents index use)
- Use EXISTS instead of IN for subqueries when possible
- Avoid cursors (use set-based operations)
- Use parameterized queries (prevents SQL injection, allows plan caching)
- Analyze execution plans to identify bottlenecks
- Keep statistics updated
- Consider query hints only when necessary

**Optimization Techniques:**

1. **Index Optimization:**
\`\`\`sql
-- Create covering index (includes all needed columns)
CREATE INDEX idx_covering ON Orders(UserId, OrderDate, Total);
-- Query can be satisfied entirely from index
\`\`\`

2. **Query Rewriting:**
\`\`\`sql
-- Bad: Function in WHERE (can't use index)
SELECT * FROM Users WHERE YEAR(CreatedDate) = 2023;

-- Good: Range query (can use index)
SELECT * FROM Users WHERE CreatedDate >= '2023-01-01' 
    AND CreatedDate < '2024-01-01';
\`\`\`

3. **Stored Procedure Optimization:**
\`\`\`sql
-- Use SET NOCOUNT ON (reduces network traffic)
CREATE PROCEDURE GetUsers
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Users;
END

-- Use appropriate data types
-- Avoid dynamic SQL when possible
-- Use table-valued parameters for multiple values
\`\`\`

4. **Execution Plan Analysis:**
- Look for table scans (bad) vs index seeks (good)
- Check for missing indexes
- Identify expensive operations
- Use SET STATISTICS IO ON to see I/O costs
\`\`\``
  }
];

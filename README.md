# webDB
Class for using web db easily and simplify your code.

# Author
Apiwith Potisuk (po.apiwith@gmail.com)

**GNXB**, 2016 All Right Reserved.

# Get Starting
To put parameters, its looks like using `openDatabase()`. Refer to [read more](https://www.tutorialspoint.com/html5/html5_web_sql.htm)
```javascript
var dbname = 'MyDB',
	dbversion = '1.0.0', // It helps when your schema has more than 1 version.
	dbdescription = 'My First Database',
	dbsize = 5000000, // 5.0 MB, Assign database size estimately
	callback = function() { ... }; // Callback Function
	
var mydb = new gnxb.webDB(dbname, dbversion, dbdescription, dbsize, callback);
// Important!: dbname, dbversion, dbdescription and dbsize must be passed.
```

# APIs
## `.db`
An object contains `openDatabase()` returned pointer.

## `.query(sql, params, next)`
Pass `sql` string command to excute with **read/write** permission that can make change to the database. `params` is prepared parameters. It will callback with 1 parameter to `next()`.
> `sql` and `params` must be passed.
> See example code at the end.

## `.select(sql, params, next)`
Pass `sql` string command to excute with **read only** permission that cannot make any change to the database. `params` is prepared parameters. It will callback with 1 parameter to `next()`.
> `sql` and `params` must be passed.
> See example code at the end.

# Example
```javascript
var mydb = new gnxb.webDB('Company', '1.0.0', 'All-About-Company', 5000000);

// Create table 'employees'
mydb.query('CREATE TABLE IF NOT EXISTS employees(emp_id INTEGER NOT NULL PRIMARY KEY, emp_name TEXT)', []);

// Insert data to 'employees'
mydb.query('INSERT INTO employees VALUES(?,?)', [null, 'Apiwith']);

// Select data from 'employees'
mydb.select('SELECT * FROM employees', [], function(res) {
	// 'res' is response
	for (var i in res.rows) {
		console.log(res.rows[i].emp_name);
	}
});
```

# View schemas
Use **Google Chrome Developer Tools** to view your created schema. Go to **Application** tab, Storage -> Web SQL.

![alt tag](https://raw.githubusercontent.com/GNXB/webDB/master/screenshots/Using%20Google%20Chrome%20Developer%20Tools%20to%20verify%20data.png)

# Vacations

Prerequisites:

To run this application, you must have mysql installed on your computer.

---------------- TO CREATE DATABASE ----------------

Create MySQL db:

1. Go to db: mysql -u root -p

2. Create a database: CREATE DATABASE vacations;

5. Select database: USE vacations;

6. Create tables (Database have many to many relationships):

	CREATE TABLE employees (
        id Integer Unsigned Auto_Increment Primary Key,
        first_name VARCHAR(300) NOT NULL,
        last_name VARCHAR(300) NOT NULL
    );

	CREATE TABLE projects (
        id Integer Unsigned Auto_Increment Primary Key,
        name VARCHAR(300) NOT NULL
    );

	CREATE TABLE vacations (
        id Integer Unsigned Auto_Increment,
        project_id INTEGER Unsigned NOT NULL,
        employee_id INTEGER Unsigned NOT NULL,
        start_date DATE,
        end_date DATE,
        PRIMARY KEY (id, project_id, employee_id),
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE RESTRICT ON UPDATE CASCADE
    );

--------------------Used Libraries----------------------------

    https://www.youtube.com/watch?v=HPIjjFGYSJ4
    https://hackernoon.com/how-to-build-a-react-project-from-scratch-using-webpack-4-and-babel-56d4a26afd32

INSERT INTO department (id, name)
VALUES
(1, "Sales"),
(2, "Engineering"),
(3, "Legal"),
(4, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, "Sales Manager", 150000.00, 1),
(2, "Sales Person", 80000.00, 1),
(3, "Lead Engineer", 200000.00, 2),
(4, "Engineer", 120000, 2),
(5, "Attorney", 190000.00, 3),
(6, "Accountant", 70000.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Kristen", "Groher", 1, NULL),
(2, "Chad", "Benoit", 2, 1),
(3, "Jeremy", "Thomas", 3, NULL),
(4, "Cody", "Sehl", 4, 3),
(5, "John", "Smith", 5, NULL)
(6, "Jane", "Doe", 6, NULL);

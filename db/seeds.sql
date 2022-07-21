INSERT INTO departments (name)
VALUES
  ('Engineering'),
  ('Finance'),
  ('Sales'),
  ('Legal'),
  ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
 ('Lead Engineer', 150000, 1),
 ('Software Engineer', 120000, 1),
 ('Account Manager', 160000, 2),
 ('Accountant', 125000, 2),
 ('Sales Lead', 100000, 3),
 ('Salesperson', 80000, 3),
 ('Legal Team Lead', 250000, 4),
 ('Lawyer', 190000, 4),
 ('Creative Director', 125000, 5),
 ('Graphic Designer', 85000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Jessica', 'Murphy', 1, NULL), 
  ('Sharon', 'Martinez', 2, 1),
  ('Linda', 'Anderson', 2, 1),
  ('Kelly', 'Stewart', 3, NULL),
  ('Sarah', 'Hernandez', 4, 4),
  ('Steven', 'Lynn', 4, 4),
  ('Michael', 'Russell', 5, NULL),
  ('Rick', 'Stewart', 6, 7),
  ('Sean', 'Gallegos', 6, 7),
  ('Richard', 'Miller', 7, NULL),
  ('Benjamin', 'Greene', 8, 10),
  ('Mariah', 'Day', 8, 10),
  ('Joseph', 'Pennington', 9, NULL),
  ('Mary', 'Boyd', 10, 13),
  ('Maria', 'Mendez', 10, 13);
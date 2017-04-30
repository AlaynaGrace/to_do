CREATE TABLE tasks(
	id SERIAL PRIMARY KEY NOT NULL,
	task VARCHAR(200)
);

INSERT INTO tasks (task) VALUES ('Clean bathroom');
INSERT INTO tasks (task) VALUES ('Finish weekend homework');
INSERT INTO tasks (task) VALUES ('Buy groceries');

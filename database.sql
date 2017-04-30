CREATE TABLE tasks(
	id SERIAL PRIMARY KEY NOT NULL,
	task VARCHAR(200)
	completed BOOL
);

INSERT INTO tasks (task,completed) VALUES ('Clean bathroom',false);
INSERT INTO tasks (task,completed) VALUES ('Finish weekend homework',false);
INSERT INTO tasks (task,completed) VALUES ('Buy groceries',false);

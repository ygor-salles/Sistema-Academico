CREATE TABLE users (
	id UUID PRIMARY KEY NOT NULL,
	name VARCHAR NOT NULL,
	email VARCHAR UNIQUE NOT NULL,
	password VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT (now()),
	deleted_at TIMESTAMP
);

CREATE TABLE disciplines (
	id UUID PRIMARY KEY NOT NULL,
	code VARCHAR UNIQUE NOT NULL,
	name VARCHAR NOT NULL,
	workload INTEGER NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT (now()),
	deleted_at TIMESTAMP 
);

CREATE TABLE courses (
	id UUID PRIMARY KEY NOT NULL,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT (now())
);

CREATE TABLE students (
	id UUID PRIMARY KEY NOT NULL,
	matriculation INTEGER UNIQUE NOT NULL,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT (now()),
	course_id UUID,
	CONSTRAINT FKCourse FOREIGN KEY (course_id) REFERENCES courses(id)
		ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE grids(
	course_id UUID PRIMARY KEY NOT NULL,
	year SMALLINT NOT NULL,
	course_name VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT (now()),
	CONSTRAINT FKCourse FOREIGN KEY (course_id) REFERENCES courses(id)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE grid_discipline (
	grid_id UUID NOT NULL,
	discipline_id UUID NOT NULL,
	PRIMARY KEY(grid_id, discipline_id),
	CONSTRAINT FKGrid FOREIGN KEY (grid_id) REFERENCES grids(course_id)
		ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FKDiscipline FOREIGN KEY (discipline_id) REFERENCES disciplines(id)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE historics (
	id UUID PRIMARY KEY NOT NULL,
	matriculation INTEGER NOT NULL,
	semester SMALLINT CHECK(semester=1 OR semester=2) NOT NULL,
	year SMALLINT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT (now())
);

CREATE TABLE historic_discipline (
	historic_id UUID NOT NULL,
	discipline_id UUID NOT NULL,
	note_discipline FLOAT NOT NULL,
	status VARCHAR(10) CHECK(status='APROVADO' or status='REPROVADO') NOT NULL,
	required BOOL NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT (now()),
	PRIMARY KEY(historic_id, discipline_id),
		FOREIGN KEY (historic_id) REFERENCES historics(id) ON DELETE CASCADE ON UPDATE CASCADE,
		FOREIGN KEY (discipline_id) REFERENCES disciplines(id) 
);



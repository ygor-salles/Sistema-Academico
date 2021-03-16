query: BEGIN TRANSACTION
query: CREATE TABLE "users" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "deleted_at" timestamp, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))
query: INSERT INTO "migrations"("timestamp", "name") VALUES (?, ?) -- PARAMETERS: [1614805099915,"CreateUsers1614805099915"]
Migration CreateUsers1614805099915 has been executed successfully.
query: CREATE TABLE "disciplines" ("id" uuid PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "name" varchar NOT NULL, "workload" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "deleted_at" timestamp, CONSTRAINT "UQ_a985c1bbe7fc381e1174b6f8843" UNIQUE ("code"))       
query: INSERT INTO "migrations"("timestamp", "name") VALUES (?, ?) -- PARAMETERS: [1615147433162,"CreateDisciplines1615147433162"]
Migration CreateDisciplines1615147433162 has been executed successfully.
query: CREATE TABLE "courses" ("id" uuid PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()))       
query: INSERT INTO "migrations"("timestamp", "name") VALUES (?, ?) -- PARAMETERS: [1615335888053,"CreateCourses1615335888053"]
Migration CreateCourses1615335888053 has been executed successfully.
query: CREATE TABLE "students" ("id" uuid PRIMARY KEY NOT NULL, "matriculation" number NOT NULL, "name" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), "course_id" uuid, CONSTRAINT "UQ_cc055e463ef191457e13ad568fa" UNIQUE ("matriculation"), CONSTRAINT "FKCourse" FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE SET NULL ON UPDATE CASCADE)
query: INSERT INTO "migrations"("timestamp", "name") VALUES (?, ?) -- PARAMETERS: [1615414181182,"CreateStudents1615414181182"]
Migration CreateStudents1615414181182 has been executed successfully.
query: CREATE TABLE "grids" ("course_id" uuid PRIMARY KEY NOT NULL, "year" number NOT NULL, "course_name" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), CONSTRAINT "FKCourse" FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE) 
query: INSERT INTO "migrations"("timestamp", "name") VALUES (?, ?) -- PARAMETERS: [1615589607425,"CreateGrid1615589607425"]
Migration CreateGrid1615589607425 has been executed successfully.
query: CREATE TABLE "grid_discipline" ("grid_id" uuid NOT NULL, "discipline_id" uuid NOT NULL, CONSTRAINT "FKGrid" FOREIGN KEY ("grid_id") REFERENCES "grids" ("course_id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FKCourse" FOREIGN KEY ("discipline_id") REFERENCES "disciplines" 
("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("grid_id", "discipline_id"))
query: INSERT INTO "migrations"("timestamp", "name") VALUES (?, ?) -- PARAMETERS: [1615680014019,"CreateGridDiscipline1615680014019"]
Migration CreateGridDiscipline1615680014019 has been executed successfully.
query: CREATE TABLE "historics" ("id" uuid PRIMARY KEY NOT NULL, "matriculation" number NOT NULL, "semester" integer NOT NULL, "year" integer NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), CONSTRAINT "CHK_e2b430ed577c3b8e04ef0f53b4" CHECK (semester=1 OR semester=2))        
query: INSERT INTO "migrations"("timestamp", "name") VALUES (?, ?) -- PARAMETERS: [1615853973731,"CreateHistorics1615853973731"]
Migration CreateHistorics1615853973731 has been executed successfully.
query: CREATE TABLE "historic_discipline" ("historic_id" uuid NOT NULL, "discipline_id" uuid NOT NULL, "note_discipline" number NOT NULL, "status" varchar NOT NULL, "required" boolean NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), CONSTRAINT "CHK_87f54bc4b81247ae35647034d9" CHECK (status='APROVADO' OR status='REPROVADO'), CONSTRAINT "FKDiscipline" FOREIGN KEY ("discipline_id") REFERENCES "disciplines" ("id"), CONSTRAINT "FKHistoric" FOREIGN KEY ("historic_id") REFERENCES "historics" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("historic_id", 
"discipline_id"))
query: INSERT INTO "migrations"("timestamp", "name") VALUES (?, ?) -- PARAMETERS: [1615853995096,"CreateHistoricDiscipline1615853995096"]      
Migration CreateHistoricDiscipline1615853995096 has been executed successfully.
query: COMMIT
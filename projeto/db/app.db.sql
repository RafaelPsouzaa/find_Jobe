BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "jobs" (
	"id"	INTEGER,
	"title"	TEXT,
	"salary"	TEXT,
	"company"	TEXT,
	"email"	TEXT,
	"new_job"	INTEGER,
	"createdAt"	TEXT,
	"updatedAT"	TEXT,
	"description"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;

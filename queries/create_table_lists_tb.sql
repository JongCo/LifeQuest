CREATE TABLE "lists_tb" (
	"list_id"	INTEGER,
	"list_name"	TEXT NOT NULL,
	"success"	INTEGER NOT NULL,
	"title_id"	INTEGER NOT NULL,
	FOREIGN KEY("title_id") REFERENCES "titles_tb"("title_id"),
	PRIMARY KEY("list_id" AUTOINCREMENT)
)
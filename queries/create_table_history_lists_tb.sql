CREATE TABLE "history_lists_tb" (
	"list_id"	INTEGER,
	"list_name"	TEXT NOT NULL,
	"success"	INTEGER NOT NULL,
	"htitle_id"	INTEGER NOT NULL,
	FOREIGN KEY("htitle_id") REFERENCES "history_titles_tb"("htitle_id"),
	PRIMARY KEY("list_id" AUTOINCREMENT)
)
CREATE TABLE "titles_tb" (
	"title_id"	INTEGER,
	"title"	TEXT NOT NULL UNIQUE,
	"repeat_week"	INTEGER,
	"repeat_month"	INTEGER,
	"start_date"	TEXT,
	"create_date"	TEXT,
	"uid"	INTEGER NOT NULL,
	PRIMARY KEY("title_id" AUTOINCREMENT),
	FOREIGN KEY("uid") REFERENCES "users_tb"("uid")
)
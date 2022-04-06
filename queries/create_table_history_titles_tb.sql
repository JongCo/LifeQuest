CREATE TABLE "history_titles_tb" (
	"htitle_id"	INTEGER,
	"title"	TEXT NOT NULL UNIQUE,
	"repeat_week"	INTEGER,
	"repeat_month"	INTEGER,
	"success"	INTEGER NOT NULL,
	"start_date"	TEXT,
	"create_date"	TEXT,
	"uid"	INTEGER NOT NULL,
	PRIMARY KEY("htitle_id" AUTOINCREMENT),
	FOREIGN KEY("uid") REFERENCES "users_tb"("uid")
)
CREATE TABLE "todoes_tb" (
	"title_id"	INTEGER,
	"title"	TEXT NOT NULL,
	"create_date"	TEXT,
	"uid"	INTEGER NOT NULL,
	"success"	TEXT NOT NULL DEFAULT "false",
	PRIMARY KEY("title_id" AUTOINCREMENT),
	FOREIGN KEY("uid") REFERENCES "users_tb"("uid"),
	UNIQUE("title", "uid")
);

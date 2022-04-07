CREATE TABLE "users_tb" (
	"uid"	INTEGER,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	BLOB NOT NULL,
	PRIMARY KEY("uid" AUTOINCREMENT)
)
CREATE TABLE "tokens_tb" (
	"token"	TEXT,
	"uid"	INTEGER NOT NULL,
	PRIMARY KEY("token"),
	FOREIGN KEY("uid") REFERENCES "users_tb"("uid")
)
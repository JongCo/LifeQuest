SELECT token
FROM tokens_tb AS A LEFT JOIN users_tb AS B
ON A.uid = B.uid
WHERE B.username = ?;
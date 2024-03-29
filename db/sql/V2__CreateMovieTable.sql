use movie_db;

DROP TABLE IF EXISTS movie;

CREATE TABLE IF NOT EXISTS movie (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  release_date DATETIME,
  created_by VARCHAR(100),
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_by VARCHAR(100),
  updated_date DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
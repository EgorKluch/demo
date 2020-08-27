CREATE database IF NOT EXISTS derbent;
use derbent;

CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tokens(
    token VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    userId INT NOT NULL,
    createDate DATE NOT NULL,

    FOREIGN KEY (userId) references users (id) ON DELETE CASCADE
);

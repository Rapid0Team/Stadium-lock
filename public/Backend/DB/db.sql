CREATE DATABASE stadiums_lock;


CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    username VARCHAR(100) UNIQUE,
    email VARCHAR(100),
    phone_number VARCHAR(15),
    password VARCHAR(255),
    role VARCHAR(20)
);

CREATE TABLE Sports (
    sport_id INT PRIMARY KEY AUTO_INCREMENT,
    sport_name VARCHAR(50) UNIQUE
);

CREATE TABLE Stadiums (
    stadium_id INT PRIMARY KEY AUTO_INCREMENT,
    stadium_name VARCHAR(100) UNIQUE,
    photo VARCHAR(100),
    price INT,
    sport_id INT,
    CONSTRAINT fk_sport FOREIGN KEY (sport_id) REFERENCES Sports(sport_id) ON DELETE CASCADE
);

CREATE TABLE Reservations (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    stadium_id INT,
    sport_id INT,
    reservation_date DATE,
    start_time TIME,
    end_time TIME,
    status VARCHAR(50),
    totalHours INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_stadium FOREIGN KEY (stadium_id) REFERENCES Stadiums(stadium_id) ON DELETE CASCADE,
    CONSTRAINT fk_sport_reservation FOREIGN KEY (sport_id) REFERENCES Sports(sport_id) ON DELETE CASCADE
);


INSERT INTO sports(sport_name) VALUES ('Football');
INSERT INTO sports(sport_name) VALUES ('Basketball');
INSERT INTO sports(sport_name) VALUES ('Tennis');
INSERT INTO sports(sport_name) VALUES ('Volleyball');

INSERT INTO stadiums( stadium_name, photo, price, sport_id) VALUES ('football','footsalle.jpg', 200, 1);
INSERT INTO stadiums( stadium_name, photo, price, sport_id) VALUES ('basketball','basketsalle.jpg', 200, 2);
INSERT INTO stadiums( stadium_name, photo, price, sport_id) VALUES ('tennis','tennis.jpg', 200, 3);
INSERT INTO stadiums( stadium_name, photo, price, sport_id) VALUES ('volleyball','volley.jpg', 200, 4);
 

INSERT INTO users( name, username, email, phone_number, password, role) VALUES ('mohamed','mohamed','mohamed@gmail.com','+2126333333','mohamed','user');

INSERT INTO users(name, username, email, phone_number, password, role) VALUES ('mouad','mouad','mouad@gmail.com','+21263333','mouad','user')
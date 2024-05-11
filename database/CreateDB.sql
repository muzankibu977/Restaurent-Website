CREATE DATABASE Craving_DB;

Use Craving_DB;

CREATE TABLE account(
    user_ID int AUTO INCREMENT,

    username varchar(25) UNIQUE NOT NULL,
    email varchar(25) UNIQUE NOT NULL,
    password varchar(50) NOT NULL,

    PRIMARY KEY(user_ID)
    )

CREATE TABLE restaurant(
    restaurant_ID int AUTO INCREMENT,

    restaurant_name varchar(50),
    city varchar(25),
    exact_address varchar(50),
    opening_time TIME,
    closing_time TIME,

    PRIMARY KEY(restaurant_ID)
)

CREATE TABLE food(
    food_ID int AUTO INCREMENT,

    restaurant_ID int NOT NULL,
    food_name varchar(25) NOT NULL,
    price float(7,2) NOT NULL,
    description varchar(200),
    ingredients varchar(200),
    vegeterian boolean,
    vegan boolean,

    PRIMARY KEY(food_ID),
    FOREIGN KEY(restaurant_ID) REFERENCES restaurant
)

CREATE TABLE order(
    order_ID int AUTO INCREMENT,

    user_ID varchar(25) NOT NULL,
    food_ID int NOT NULL,

    delivery_address varchar(50) NOT NULL,
    quantity tinyint NOT NULL,
    date DATETIME NOT NULL,

    PRIMARY KEY(preference_ID),
    FOREIGN KEY(username) REFERENCES account(user_ID),
    FOREIGN KEY(food_ID) REFERENCES food(food_ID)
)

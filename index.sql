CREATE ROLE RamonHernandez WITH
    PASSWORD 'Ramon4321'
    NOSUPERUSER
    CREATEDB

where option can be:

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'
    | IN ROLE role_name [, ...]
    | IN GROUP role_name [, ...]
    | ROLE role_name [, ...]
    | ADMIN role_name [, ...]
    | USER role_name [, ...]
    | SYSID uid

CREATE DATABASE name
    [ WITH ] [ OWNER [=] user_name ]
           [ TEMPLATE [=] template ]
           [ ENCODING [=] encoding ]
           [ STRATEGY [=] strategy ]
           [ LOCALE [=] locale ]
           [ LC_COLLATE [=] lc_collate ]
           [ LC_CTYPE [=] lc_ctype ]
           [ ICU_LOCALE [=] icu_locale ]
           [ ICU_RULES [=] icu_rules ]
           [ LOCALE_PROVIDER [=] locale_provider ]
           [ COLLATION_VERSION = collation_version ]
           [ TABLESPACE [=] tablespace_name ]
           [ ALLOW_CONNECTIONS [=] allowconn ]
           [ CONNECTION LIMIT [=] connlimit ]
           [ IS_TEMPLATE [=] istemplate ]
           [ OID [=] oid ]

CREATE TABLE Product (
    P_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Price DECIMAL(10, 2),
    Description TEXT
);

CREATE TABLE Order (
    Order_ID INT PRIMARY KEY,
    Order_Amount DECIMAL(10, 2),
    Order_Date DATE
);

CREATE TABLE Customer (
    User_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255)
);

CREATE TABLE Payment (
    Payment_ID INT PRIMARY KEY,
    Type VARCHAR(50),
    Amount DECIMAL(10, 2)
);

CREATE TABLE Cart (
    Cart_ID INT PRIMARY KEY,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES Customer(User_ID)
);

CREATE TABLE Category (
    C_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Picture VARCHAR(255),
    Description TEXT
);
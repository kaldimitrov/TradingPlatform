CREATE TABLE IF NOT EXISTS accounts
(
    id              UUID            NOT NULL,
    first_name      TEXT            NOT NULL,
    last_name       TEXT            NOT NULL,
    email           TEXT            NOT NULL,
    hashed_password TEXT            NOT NULL,
    balance         NUMERIC(38, 18) NOT NULL,
    CONSTRAINT pk_accounts PRIMARY KEY (id)
);

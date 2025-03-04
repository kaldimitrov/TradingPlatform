CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE accounts
(
    id              UUID           NOT NULL,
    first_name      TEXT           NOT NULL,
    last_name       TEXT           NOT NULL,
    email           TEXT           NOT NULL,
    hashed_password TEXT           NOT NULL,
    balance         DECIMAL(20, 8) NOT NULL,
    CONSTRAINT pk_accounts PRIMARY KEY (id)
);

CREATE TABLE crypto_prices
(
    symbol TEXT           NOT NULL,
    name   TEXT           NOT NULL,
    price  DECIMAL(20, 8) NOT NULL,
    CONSTRAINT pk_crypto_prices PRIMARY KEY (symbol)
);

CREATE TABLE holdings
(
    id                 UUID           NOT NULL,
    user_id            UUID           NOT NULL,
    crypto_symbol      TEXT           NOT NULL,
    quantity           DECIMAL(20, 8) NOT NULL,
    avg_purchase_price DECIMAL(20, 8) NOT NULL,
    CONSTRAINT pk_holdings PRIMARY KEY (id)
);

CREATE TABLE transactions
(
    id                   UUID                        NOT NULL,
    user_id              UUID                        NOT NULL,
    crypto_symbol        TEXT                        NOT NULL,
    quantity             DECIMAL(20, 8)              NOT NULL,
    price_at_transaction DECIMAL(20, 8)              NOT NULL,
    transaction_type     TEXT                        NOT NULL,
    timestamp            TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_transactions PRIMARY KEY (id)
);

ALTER TABLE holdings
    ADD CONSTRAINT FK_HOLDINGS_ON_USER FOREIGN KEY (user_id) REFERENCES accounts (id);

ALTER TABLE transactions
    ADD CONSTRAINT FK_TRANSACTIONS_ON_USER FOREIGN KEY (user_id) REFERENCES accounts (id);
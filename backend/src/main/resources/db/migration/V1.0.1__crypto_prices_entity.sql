CREATE TABLE IF NOT EXISTS crypto_prices
(
    symbol     TEXT            NOT NULL,
    name       TEXT,
    price      NUMERIC(38, 18) NOT NULL,
    change_pct NUMERIC(38, 18) NOT NULL,
    volume     NUMERIC(38, 18) NOT NULL,
    CONSTRAINT pk_crypto_prices PRIMARY KEY (symbol)
);
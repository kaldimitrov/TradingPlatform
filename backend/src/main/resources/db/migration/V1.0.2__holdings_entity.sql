CREATE TABLE IF NOT EXISTS holdings
(
    id                 UUID            NOT NULL,
    user_id            UUID            NOT NULL,
    currency           TEXT            NOT NULL,
    quantity           NUMERIC(38, 18) NOT NULL,
    avg_purchase_price NUMERIC(38, 18) NOT NULL,
    CONSTRAINT pk_holdings PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS transactions
(
    id               UUID                        NOT NULL,
    user_id          UUID                        NOT NULL,
    currency         TEXT                NOT NULL,
    quantity         NUMERIC(38, 18)              NOT NULL,
    amount           NUMERIC(38, 18)              NOT NULL,
    transaction_type TEXT                NOT NULL,
    timestamp        TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_transactions PRIMARY KEY (id)
);

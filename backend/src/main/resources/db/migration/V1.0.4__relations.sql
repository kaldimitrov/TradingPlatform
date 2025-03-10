ALTER TABLE IF EXISTS accounts
    ADD CONSTRAINT uc_accounts_email UNIQUE (email);

ALTER TABLE IF EXISTS holdings
    ADD CONSTRAINT FK_HOLDINGS_ON_CURRENCY FOREIGN KEY (currency) REFERENCES crypto_prices (symbol);

ALTER TABLE IF EXISTS holdings
    ADD CONSTRAINT FK_HOLDINGS_ON_USER FOREIGN KEY (user_id) REFERENCES accounts (id);

ALTER TABLE IF EXISTS transactions
    ADD CONSTRAINT FK_TRANSACTIONS_ON_CURRENCY FOREIGN KEY (currency) REFERENCES crypto_prices (symbol);

ALTER TABLE IF EXISTS transactions
    ADD CONSTRAINT FK_TRANSACTIONS_ON_USER FOREIGN KEY (user_id) REFERENCES accounts (id);
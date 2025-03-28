START TRANSACTION;

SET
    GLOBAL time_zone = '+00:00';

CREATE TABLE
    IF NOT EXISTS `person` (
        `id` NVARCHAR (36) PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `dateOfBirth` DATE NOT NULL,
        `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

COMMIT;
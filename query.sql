CREATE DATABASE "hirejob";

CREATE TABLE "users" (
  "id" VARCHAR PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(100) NOT NULL,
  "role" BOOLEAN NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "worker_profiles" (
  "id" VARCHAR PRIMARY KEY,
  "user_id" VARCHAR UNIQUE,
  "city" VARCHAR(100),
  "province" VARCHAR(100),
  "last_work" VARCHAR(100),
  "description" TEXT,
  "skills" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "company_profiles" (
  "id" VARCHAR PRIMARY KEY,
  "user_id" VARCHAR UNIQUE,
  "company_name" VARCHAR(100),
  "company_email" VARCHAR(100),
  "company_phone" VARCHAR(20),
  "company_field" VARCHAR(100),
  "city" VARCHAR(100),
  "province" VARCHAR(100),
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "portfolios" (
  "id" VARCHAR PRIMARY KEY,
  "user_id" VARCHAR,
  "photo" VARCHAR(255),
  "app_name" VARCHAR(100),
  "type" VARCHAR(50),
  "link" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "experiences" (
  "id" VARCHAR PRIMARY KEY,
  "user_id" VARCHAR,
  "position" VARCHAR(100),
  "company_name" VARCHAR(100),
  "working_start" DATE,
  "working_end" DATE,
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "social_media" (
  "id" VARCHAR PRIMARY KEY,
  "user_id" VARCHAR,
  "type" VARCHAR(50),
  "media" VARCHAR(255)
);

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "worker_profiles" ("user_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "company_profiles" ("user_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "portfolios" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "experiences" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "social_media" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY,
--     username VARCHAR(100) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     phone VARCHAR(15) NOT NULL,
--     passwordHash VARCHAR(255) NOT NULL,
--     role VARCHAR(50) NOT NULL,
--     verify_token VARCHAR(255),
--     is_verified BOOLEAN DEFAULT FALSE
-- );
-- Account 테이블 생성
CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    mail VARCHAR(100) UNIQUE,
    pw VARCHAR(32),
    nickname VARCHAR(32) UNIQUE,
    longitude FLOAT,
    latitude FLOAT,
    location GEOMETRY,
    CONSTRAINT location_unique UNIQUE (id, location)
);

CREATE INDEX mail_idx ON account(mail);

-- spatial_ref_sys 테이블 생성 (이 테이블은 PostGIS에서 기본적으로 제공되므로, 이미 설치되어 있다면 다시 생성할 필요가 없습니다.)
CREATE TABLE IF NOT EXISTS spatial_ref_sys (
    srid INT PRIMARY KEY,
    auth_name VARCHAR(256),
    auth_srid INT,
    srtext VARCHAR(2048),
    proj4text VARCHAR(2048)
);

-- Refrigerator 테이블 생성
CREATE TABLE IF NOT EXISTS refrigerator (
    id SERIAL PRIMARY KEY,
    account_id INT,
    energy REAL,
    co2 REAL,
    model_name VARCHAR(50),
    location GEOMETRY,
    CONSTRAINT fk_account
        FOREIGN KEY(account_id)
        REFERENCES account(id)
        ON DELETE CASCADE
);

-- PostGIS의 GIST 인덱스 생성
CREATE INDEX gist_idx ON refrigerator USING GIST (location);

-- account_id 및 location에 대한 복합 외래키는 PostgreSQL에서 직접적으로 지원되지 않으므로, 
-- 이 부분은 Prisma의 데이터 모델링 기능을 SQL로 직접 변환할 때 고려해야 할 복잡성 중 하나입니다.
-- 따라서, account 테이블의 location 필드와 refrigerator 테이블의 location 필드 간의 관계를
-- 관리하는 것은 애플리케이션 레벨에서 처리해야 할 수도 있습니다.

create database IF NOT EXISTS db_sb;
-- create user 'sbuser'@'localhost' identified by 'sbsecret';
grant all on db_sb.* to 'sbuser'@'localhost';

CREATE TABLE IF NOT EXISTS db_sb.person (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` CHAR NOT NULL,
    `name` VARCHAR(255),
    `cpf` VARCHAR(15),
    `birth_date` TIMESTAMP,
    `cnpj` VARCHAR(20),
    `company_name` VARCHAR(255),
    `fantasy_name` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS db_sb.account (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `parent` tinyint(1) NOT NULL,
    `parent_id` BIGINT(20) UNSIGNED,
    `person_id` BIGINT(20) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_parent_id` FOREIGN KEY (`parent_id`) REFERENCES db_sb.account (`id`),
    CONSTRAINT `fk_person_id` FOREIGN KEY (`person_id`) REFERENCES db_sb.person (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

insert into db_sb.person(type, name, cpf, birth_date) values('I', 'user1', '111.111.111-11', '2000-01-01');
insert into db_sb.person(type, name, cpf, birth_date) values('I', 'user2', '111.111.111-12', '2000-01-01');
insert into db_sb.person(type, name, cpf, birth_date) values('I', 'user3', '111.111.111-13', '2000-01-01');

insert into db_sb.person(type, company_name, cnpj, fantasy_name) values('C', 'company1', '11.111.111/0001-11', 'fantasy1');
insert into db_sb.person(type, company_name, cnpj, fantasy_name) values('C', 'company2', '11.111.111/0001-12', 'fantasy2');
insert into db_sb.person(type, company_name, cnpj, fantasy_name) values('C', 'company3', '11.111.111/0001-13', 'fantasy3');

insert into db_sb.account(name, parent, parent_id, person_id) values ('account1', 1, null, 1);
insert into db_sb.account(name, parent, parent_id, person_id) values ('account2', 0, 1, 2);
insert into db_sb.account(name, parent, parent_id, person_id) values ('account3', 0, 2, 3);



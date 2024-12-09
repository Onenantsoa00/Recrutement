/* CREATE DATABASE IF NOT EXISTS `recrutements`;

USE recrutements ;

CREATE TABLE IF NOT EXISTS `administration` (
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(200), 
    prenom VARCHAR(250), 
    email VARCHAR(300) NOT NULL UNIQUE,
    pwd VARCHAR(30) NOT NULL 
) ENGINE=InnoDB ; 

CREATE TABLE IF NOT EXISTS `post` (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    id_adm INT, 
    nom_post VARCHAR(200), 
    criteres VARCHAR(300),
    exp_att VARCHAR(300), 
    cert_nec VARCHAR(300)
) ENGINE=InnoDB ; 

CREATE TABLE IF NOT EXISTS `client` (
    id SERIAL PRIMARY KEY, 
    nom_clt VARCHAR(200), 
    prenom_clt VARCHAR(250), 
    email VARCHAR(250) UNIQUE,
    contact VARCHAR(50) NOT NULL
) ENGINE=InnoDB ; 

CREATE TABLE IF NOT EXISTS `postuler` (
    id SERIAL PRIMARY KEY, 
    id_post INT,
    id_clt INT
) ENGINE=InnoDB ; 

CREATE TABLE IF NOT EXISTS `etapes` (
    id SERIAL PRIMARY KEY, 
    nom_etape VARCHAR(200)
) ENGINE=InnoDB ; 

CREATE TABLE IF NOT EXISTS `appartenir` (
    id SERIAL PRIMARY KEY, 
    id_clt INT,
    id_etapes INT
) ENGINE=InnoDB ;  */



-- Création de la base de données
CREATE DATABASE recrutements;

-- Connectez-vous à la base de données
\c recrutements;

-- Création de la table administration
CREATE TABLE IF NOT EXISTS administration (
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(200), 
    prenom VARCHAR(250), 
    email VARCHAR(300) NOT NULL UNIQUE,
    pwd VARCHAR(30) NOT NULL 
); 

-- Création de la table post
CREATE TABLE IF NOT EXISTS post (
    id SERIAL PRIMARY KEY, 
    id_adm INT REFERENCES administration(id) ON UPDATE CASCADE ON DELETE CASCADE, 
    nom_post VARCHAR(200), 
    criteres VARCHAR(300),
    exp_att VARCHAR(300), 
    cert_nec VARCHAR(300)
); 

-- Création de la table client
CREATE TABLE IF NOT EXISTS client (
    id SERIAL PRIMARY KEY, 
    nom_clt VARCHAR(200), 
    prenom_clt VARCHAR(250), 
    email VARCHAR(250) UNIQUE,
    contact VARCHAR(50) NOT NULL
); 

-- Création de la table postuler
CREATE TABLE IF NOT EXISTS postuler (
    id SERIAL PRIMARY KEY, 
    id_post INT REFERENCES post(id) ON UPDATE CASCADE ON DELETE CASCADE,
    id_clt INT REFERENCES client(id) ON UPDATE CASCADE ON DELETE CASCADE
); 

-- Création de la table etapes
CREATE TABLE IF NOT EXISTS etapes (
    id SERIAL PRIMARY KEY, 
    nom_etape VARCHAR(200)
); 

-- Création de la table appartenir
CREATE TABLE IF NOT EXISTS appartenir (
    id SERIAL PRIMARY KEY, 
    id_clt INT REFERENCES client(id) ON UPDATE CASCADE ON DELETE CASCADE,
    id_etapes INT REFERENCES etapes(id) ON UPDATE CASCADE ON DELETE CASCADE
); 




/* 
-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS recrutements;

-- Sélection de la base de données à utiliser
\c recrutements

-- Création de la table administration
CREATE TABLE IF NOT EXISTS administration (
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(200), 
    prenom VARCHAR(250), 
    email VARCHAR(300) NOT NULL UNIQUE,
    pwd VARCHAR(30) NOT NULL
);

-- Création de la table post
CREATE TABLE IF NOT EXISTS post (
    id SERIAL PRIMARY KEY, 
    id_adm INT REFERENCES administration(id) ON UPDATE CASCADE ON DELETE CASCADE, 
    nom_post VARCHAR(200), 
    criteres VARCHAR(300),
    exp_att VARCHAR(300), 
    cert_nec VARCHAR(300)
);

-- Création de la table client
CREATE TABLE IF NOT EXISTS client (
    id SERIAL PRIMARY KEY, 
    nom_clt VARCHAR(200), 
    prenom_clt VARCHAR(250), 
    email VARCHAR(250) UNIQUE,
    contact VARCHAR(50) NOT NULL
);

-- Création de la table postuler
CREATE TABLE IF NOT EXISTS postuler (
    id SERIAL PRIMARY KEY, 
    id_post INT REFERENCES post(id) ON UPDATE CASCADE ON DELETE CASCADE,
    id_clt INT REFERENCES client(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Création de la table etapes
CREATE TABLE IF NOT EXISTS etapes (
    id SERIAL PRIMARY KEY, 
    nom_etape VARCHAR(200)
);
 */
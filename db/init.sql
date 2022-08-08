ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'devved';

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS people (
  id             int not null,
  nombre         varchar(255),
  altura         varchar(255), -- permite unknow
  peso           varchar(255), -- permite unknow
  color_pelo     varchar(255),
  color_piel     varchar(255),
  color_ojo      varchar(255),
  nacimiento     varchar(255),
  genero         varchar(255),
  planeta_origen varchar(255),
  peliculas      json,
  especies       json,
  vehiculos      json,
  naves          json,
  swapi_creacion varchar(255), -- campo que viene de SWAPI
  swapi_edicion  varchar(255), -- campo que viene de SWAPI
  url            varchar(255),
  creacion       timestamp default now(),
  edicion        timestamp default now(),
  PRIMARY KEY (id)
);
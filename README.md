# reto-3-sofka-nestjs

NOTA IMPORTANTE:

El proyecto cuenta con 3 ramas que se detallan a continuacion; la version final para presentar la respuesta al reto comprende la rama version-array la cual hice la rama default.

-La Rama MAIN contiene solo el backend realizado con NestJS en conjunto con MongoDb, es una version anterior sobre la cual no realice merge para que quede como referencia ya que hablo sobre esta rama en el video entregado como prueba en el proyecto.

-La rama VERSION-ARRAY comprende es una reimplementacion de la rama main pero con logica de arrays y con nuevas caracteristicas que he ido aprendiendo (lista al pie).

-La Rama FRONTEND cuenta con el backend realizada en la rama main más una capa de front realizada con Angular (de momento basica, es solo a modo de practicar conceptos de angular).


## VERSION ARRAY

#### Caracteristicas:

##### Pipes 
       => validation (scope => local) class-validator, ParseInt

##### Guards 
       => Autentificacion =>passport local y sesiones-express
       => Autorizacion    => RBAC Roles (decorador custom para setMetadata)

##### Herramientas 
             => Hashing => bcrypt
             => Session Serializer (solo id + rol) 
             => AutoIDs  
             => Seeder => faker random users 

##### Excepciones 
       Controllers lvl

##### Middleware 
       logger => Pino (pino-pretty) con uuid para seguimiento de peticiones

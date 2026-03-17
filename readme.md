# M7-4-CRUD-parametrizado-con-Node-pg

## Descripción

Proyecto de ejemplo para practicar un **CRUD parametrizado** sobre la tabla `clientes` con Node.js y PostgreSQL.  
Permite crear, leer, actualizar y eliminar clientes, usando **consultas parametrizadas** para mayor seguridad y con **respuestas JSON estandarizadas**.



## Tecnologías utilizadas
- Node.js  
- Express  
- PostgreSQL  
- pg (cliente de PostgreSQL para Node)  
- HTML / CSS / JavaScript  
- npm para gestión de dependencias  


## Funcionalidades

- Crear clientes validando campos obligatorios y rut único.  
- Listar clientes por filtros: rut, nombre (prefijo o completo), edad, rango de edad o todos.  
- Modificar el nombre de un cliente por rut.  
- Eliminar clientes por rut, nombre o edad, evitando borrado masivo si hay coincidencias múltiples.  
- Respuestas JSON con códigos HTTP: 200, 201, 400, 404, 409, 500.  
- Frontend simple con formularios separados para crear, modificar, eliminar y consultar clientes.  


## Endpoints


| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/clientes` | Lista todos los clientes |
| GET | `/clientes?rut=<rut>` | Retorna cliente por rut |
| GET | `/clientes?nombre=<texto>` | Lista clientes por nombre o prefijo |
| GET | `/clientes?edad=<n>` | Lista clientes por edad |
| GET | `/clientes?edadMin=<n>&edadMax=<m>` | Lista clientes en rango de edad |
| POST | `/clientes` | Crea un cliente nuevo |
| PUT | `/clientes/:rut` | Modifica solo el nombre de un cliente |
| DELETE | `/clientes?rut=<rut>&nombre=<texto>&edad=<n>` | Elimina un cliente según criterio; si hay más de uno, pide refinar |


## Uso
1. Configurar el archivo .env_ejemplo con las credenciales de tu base de datos. 
2. Instalar dependencias npm install
3. Ejecutar Servidor npm start
4. Abrir Navegador http://localhost:3000.


# Notas 
- Todas las consultas usan Query Objects ({ text, values }) para evitar concatenación de strings.
- Validaciones básicas de campos y tipos se realizan en backend y frontend.

## Autor
Fernanda Álvarez para curso Fullstack Javascript Sence.











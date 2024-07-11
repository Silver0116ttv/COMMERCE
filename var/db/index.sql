CREATE USER nombre_usuario WITH PASSWORD 'contraseña_segura';
GRANT CONNECT ON DATABASE nombre_base_datos TO nombre_usuario;
GRANT ALL PRIVILEGES ON DATABASE nombre_base_datos TO nombre_usuario;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO nombre_usuario;

where option can be:

      SUPERUSER | NOSUPERUSER
    | CREATEDB | NOCREATEDB
    | CREATEROLE | NOCREATEROLE
    | INHERIT | NOINHERIT
    | LOGIN | NOLOGIN
    | REPLICATION | NOREPLICATION
    | BYPASSRLS | NOBYPASSRLS
    | CONNECTION LIMIT connlimit
    | [ ENCRYPTED ] PASSWORD 'password' | PASSWORD NULL
    | VALID UNTIL 'timestamp'
    | IN ROLE role_name [, ...]
    | IN GROUP role_name [, ...]
    | ROLE role_name [, ...]
    | ADMIN role_name [, ...]
    | USER role_name [, ...]
    | SYSID uid

CREATE DATABASE name
    [ WITH ] [ OWNER [=] user_name ]
           [ TEMPLATE [=] template ]
           [ ENCODING [=] encoding ]
           [ STRATEGY [=] strategy ]
           [ LOCALE [=] locale ]
           [ LC_COLLATE [=] lc_collate ]
           [ LC_CTYPE [=] lc_ctype ]
           [ ICU_LOCALE [=] icu_locale ]
           [ ICU_RULES [=] icu_rules ]
           [ LOCALE_PROVIDER [=] locale_provider ]
           [ COLLATION_VERSION = collation_version ]
           [ TABLESPACE [=] tablespace_name ]
           [ ALLOW_CONNECTIONS [=] allowconn ]
           [ CONNECTION LIMIT [=] connlimit ]
           [ IS_TEMPLATE [=] istemplate ]
           [ OID [=] oid ]

-- Tabla de Usuarios
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Tabla de Direcciones
CREATE TABLE direcciones (
    direccion_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    tipo_direccion VARCHAR(50) NOT NULL, -- Envío o Facturación
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Tabla de Categorías
CREATE TABLE categorias (
    categoria_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de Productos
CREATE TABLE productos (
    producto_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id)
);

-- Tabla de Carritos
CREATE TABLE carritos (
    carrito_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Tabla intermedia Carrito_Productos
CREATE TABLE carrito_productos (
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    PRIMARY KEY (carrito_id, producto_id),
    FOREIGN KEY (carrito_id) REFERENCES carritos(carrito_id),
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id)
);

-- Tabla de Pedidos
CREATE TABLE pedidos (
    pedido_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    direccion_id INT NOT NULL,
    fecha_pedido DATE NOT NULL DEFAULT CURRENT_DATE,
    total NUMERIC(10, 2) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    metodo_pago VARCHAR(100) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (direccion_id) REFERENCES direcciones(direccion_id)
);

-- Tabla intermedia Pedido_Productos
CREATE TABLE pedido_productos (
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (pedido_id, producto_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id),
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id)
);

-- Tabla de Métodos de Pago
CREATE TABLE metodos_pago (
    metodo_pago_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Relación de Métodos de Pago y Pedidos
CREATE TABLE pedido_metodos_pago (
    pedido_id INT NOT NULL,
    metodo_pago_id INT NOT NULL,
    PRIMARY KEY (pedido_id, metodo_pago_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id),
    FOREIGN KEY (metodo_pago_id) REFERENCES metodos_pago(metodo_pago_id)
);

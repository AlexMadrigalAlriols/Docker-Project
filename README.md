# Descripcion
Proyecto para barrel.Cloud. Gestor de reservas con laravel y REACT.

Puedes hacer reservas a propiedades, editarlas y cancelarlas.
# Pasos docker a seguir:
# Backend
moverse a la carpeta /backend

Configurar .env (Se puede dejar como esta)

Montamos la build de docker
```bash
docker-compose build
```

Ejecutamos la build
```bash
docker-compose up
```

En otra consula ejecutamos los comandos de artisan
Creamos la base de datos
```bash
docker-compose exec -it app php /var/www/artisan migrate
```

Insertamos los datos de prueba
```bash
docker-compose exec -it app php /var/www/artisan migrate --seed
```

# Frontend
Ejecutamos el servicio de react en el puerto 3000
```bash
docker run -it -p 3000:3000 frontend
```

Ya puedes entrar en localhost:3000 y usar la app.

# Pasos manuales a seguir:
Pasos a seguir por si quieres iniciar los servicios manualmente.

# Backend
moverse a la carpeta /backend

Copiar el .env.exemple a .env y configurarlo.

Descargar las librerias
```bash
composer install
```

Generar la key de laravel
```bash
php artisan key:generate
```

Para Crear la base de datos:
```bash
php artisan migrate
```

Para Colocar Datos Aleatorios en la BD
```bash
php artisan migrate -seed
```

Encender el servidor
```bash
php artisan serve
```

# Frontend
Moverse a la carpeta frontend

Descargar las librerias
```bash
npm i
```

Encender el servidor
```bash
npm start
```


# INFO
Esta creado un usuario con {email: admin@admin.com y "password"} para poder hacer las pruebas.
Adicionalmente esta adjuntado una coleccion de postman con todos los endpoints.

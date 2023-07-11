# Partimos de la imagen php en su versión 7.4
FROM php:8.1.0-fpm

# Copiamos los archivos package.json composer.json y composer-lock.json a /var/www/
COPY *.json /var/www/

# Nos movemos a /var/www/
WORKDIR /var/www/

# Instalamos las dependencias necesarias
RUN apt-get update && apt-get dist-upgrade -y && apt-get install -y \
    build-essential \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    git \
    curl

# Instalamos extensiones de PHP
RUN docker-php-ext-install mysqli pdo_mysql zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY --from=mysql:latest /usr/bin/mysql /usr/local/bin/mysql
# Instalamos dependendencias de composer
RUN composer install --no-ansi --no-dev --no-interaction --no-progress --optimize-autoloader --no-scripts
RUN chmod 777 /var/www
# Copiamos todos los archivos de la carpeta actual de nuestra 
# computadora (los archivos de laravel) a /var/www/
COPY . /var/www/

# Exponemos el puerto 9000 a la network
EXPOSE 9000
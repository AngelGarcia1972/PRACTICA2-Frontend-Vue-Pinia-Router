# Tienda Online - Vue.js + Laravel

## Descripción
Aplicación Full-Stack de tienda online con CRUD, autenticación, carrito de compras y subida de imágenes.

## Requisitos
- PHP 8.2+
- Node.js 18+
- Composer

## Instalación Backend
```bash
cd practica2-auth
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

## Instalación Frontend
```bash
cd practica2-frontend
npm install
npm run dev
```

## Funcionalidades
- Registro e inicio de sesión con Laravel Sanctum
- CRUD de productos con subida de imágenes
- Catálogo público con búsqueda en tiempo real
- Carrito de compras persistente con Pinia
- Panel de administración protegido
- Rutas públicas y privadas con Vue Router
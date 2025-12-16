# Fragments

## Backend

### Stack Tecnológico
- **Framework:** NestJS
- **ORM:** Prisma 7 (con soporte para `prismaSchemaFolder` y adaptador `pg`)
- **Base de Datos:** PostgreSQL (Supabase)
- **Lenguaje:** TypeScript

### Funcionalidades Implementadas
- **Módulo de Usuarios:**
  - CRUD básico para gestión de usuarios.
  - Modelo de datos con campos: `id`, `email`, `name`, `lastname`, `role`.
  - Autenticación delegada (sin persistencia de password local).
- **Módulo de Wallets:**
  - Gestión de billeteras por usuario y moneda.
  - Validación de unicidad (una wallet por moneda por usuario).
  - Operaciones atómicas para actualización de saldos (`increment`).
  - Seguridad integrada: Solo el propietario puede ver o editar sus wallets.
- **Configuración de Base de Datos:**
  - Estructura de esquemas modular en `prisma/schema/`.
  - Configuración centralizada en `prisma.config.ts`.
  - Conexión mediante `PrismaPg` adapter para compatibilidad con entornos Serverless/Edge.

### Configuración Local
1.  Clonar el repositorio.
2.  Configurar variables de entorno en `.env`:
    ```env
    DATABASE_URL="postgresql://user:password@host:port/database"
    PORT=3000
    ```
3.  Instalar dependencias:
    ```bash
    cd backend
    npm install
    ```
4.  Generar cliente de Prisma:
    ```bash
    npx prisma generate
    ```
5.  Ejecutar migraciones (si hay cambios pendientes):
    ```bash
    npx prisma migrate dev
    ```
6.  Iniciar servidor de desarrollo:
    ```bash
    npm run start:dev
    ```

## Frontend (Mobile - Client)

### Stack Tecnológico
- **Framework:** Expo (React Native)
- **Lenguaje:** TypeScript
- **Cliente HTTP:** Axios (encapsulado en `ApiService`)
- **Estilos:** StyleSheet nativos con sistema de diseño centralizado.

### Funcionalidades Implementadas
- **Autenticación Integrada:**
  - Servicio centralizado (`auth.service.ts`) que consume los endpoints del backend.
  - Hook personalizado `useAuth` para gestionar Login, Registro y Logout.
  - Persistencia de sesión mediante manejo seguro de tokens.
- **Pantallas:**
  - Login y Signup completamente integrados.
  - Navegación protegida basada en el estado de autenticación.

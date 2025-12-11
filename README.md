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

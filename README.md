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
- **Módulo de Perfil:**
  - Gestión centralizada de datos del usuario (`/profile/me`).
  - Capacidad de actualización de información personal (Nombre, Apellido).
  - Consulta unificada de saldos y monedas disponibles (`/profile/currencies`).
- **Configuración de Base de Datos:**
  - Estructura de esquemas modular en `prisma/schema/`.
  - Configuración centralizada en `prisma.config.ts`.
  - Conexión mediante `PrismaPg` adapter para compatibilidad con entornos Serverless/Edge.

### Arquitectura de Software
Utilizamos **Clean Architecture (Arquitectura Hexagonal)** para garantizar escalabilidad, testabilidad y desacoplamiento.

#### 1. Capas del Sistema
*   **Core (Dominio):** Contiene la lógica de negocio pura y las reglas del sistema.
    *   *Entidades:* Clases TS planas (`User`, `Wallet`).
    *   *Repositorios Abstractos:* Contratos (`WalletRepository`) que definen operaciones sin conocer la base de datos.
    *   *Mappers:* Transforman datos crudos de Prisma/Supabase a Entidades de Dominio.
*   **Features (Aplicación):** Agrupa funcionalidades por caso de uso.
    *   *Use Cases:* Clases de servicio único (`RegisterUserUseCase`) que orquestan la lógica.
    *   *DTOs:* Objetos de transferencia de datos validados estrictamente con `class-validator`.
*   **Infrastructure (Adaptadores):** Implementaciones concretas de interfaces externas.
    *   *PrismaProvider:* Implementación de repositorios usando PostgreSQL.
    *   *SupabaseProvider:* Cliente de autenticación externo.

#### 2. Patrones Implementados
*   **Inyección de Dependencias:** Uso de clases abstractas como tokens para inyectar implementaciones concretas.
*   **Transacciones Distribuidas:** Patrón de compensación (Saga/Rollback manual) para asegurar consistencia entre Supabase Auth y PostgreSQL local en el registro de usuarios.
*   **Single Source of Truth:** El backend valida y sirve datos desde la base de datos local, usando Supabase solo como puerta de entrada (AuthN).

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

### UI/UX & Estética
- **Tema:** Cyberpunk / Retro-Terminal.
- **Tipografía:**
  - `Press Start 2P`: Usada para títulos principales y botones (Headers, Buttons).
  - `VT323`: Usada para campos de entrada, texto de terminal y etiquetas.
- **Componentes Personalizados:**
  - `Window`: Contenedores con bordes de neón y esquinas reforzadas.
  - `Field`: Inputs con estilo de línea de comandos, cursor de bloque y efectos de foco.
  - `Screen`: Manejo global de fondos y áreas seguras con soporte para imágenes de fondo con opacidad.
- **Paleta de Colores:**
  - Cyan Neón (`#00FFFF`) para acentos principales y brillos.
  - Verde Terminal (`#33FF33`) para texto de entrada y cursores.
  - Rosa Chicle (`#FF69B4`) para indicadores de campos obligatorios.
  - Gris Desvanecido (`#8899A6`) para textos secundarios y placeholders.

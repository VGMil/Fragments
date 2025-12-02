# 🚀 Fragments: Plataforma LMS Gamificada

Fragments transforma el esfuerzo académico en una experiencia de mercado digital, reemplazando la motivación tradicional por una **economía de tres niveles** donde la estrategia es tan importante como el conocimiento.

---

## 🛠️ Tabla de Prioridad de Desarrollo (Fases de Implementación)

La implementación se estructura en fases, priorizando el **Ciclo de Juego (Core Loop)** antes que las funcionalidades de apoyo y análisis.

| Prioridad | Fase | Módulos Clave | Justificación |
| :--- | :--- | :--- | :--- |
| **P1** | **Core Loop Mínimo Viable (MVP)** | Usuarios, Cursos, Misiones, Economía, Subastas, Inventario, Tienda, Notificaciones (Básicas). | Permite a los estudiantes Ganar (ACH), Subastar (Fragmentos) y Canjear (Beneficios). **El corazón del sistema debe funcionar primero.** |
| **P2** | **Estabilidad y Prestigio** | Temporadas, Logros, Analíticas/Reportes. | Añade el control de la inflación/deflación (Temporadas), la motivación a largo plazo (Logros) y las herramientas de balance para el Profesor. |
| **P3** | **Optimización y Crecimiento** | IA, Notificaciones (Avanzadas), Refinamiento de Permisos. | Mejora la experiencia, automatiza la gestión de contenido y refina el balance económico a través de la IA. |

---

## 🔄 El Ciclo de Juego (Core Loop)

El sistema se basa en un ciclo económico de tres pasos que impulsa la participación: 

1.  **⛏️ Ganar (Mining/Producción):** Los estudiantes obtienen **ACH** (Academic Coin Handler, divisa base) al asistir, participar, entregar tareas y **completar misiones**.
2.  **⚖️ Subastar (Trading/Conversión):** Los **ACH** se utilizan exclusivamente para pujar en **Subastas en Tiempo Real** por **Fragmentos** (el activo intermedio de alto valor).
3.  **🛒 Canjear (Burning/Consumo):** Los **Fragmentos** se intercambian en la **Tienda de Beneficios** por ventajas reales (entregas tardías, bonos de nota, etc.) simbolizadas en ítems de temporada.

---

## 🔑 Características Clave y Stack Tecnológico

### 🚀 Características Funcionales

* **Economía de Mercado:** Sistema de oferta y demanda controlado por el profesor para equilibrar los incentivos.
* **Subastas en Vivo:** Actualización de pujas en tiempo real mediante **WebSockets**.
* **Temporadas:** Reinicio periódico de la economía y activos para combatir la inflación.
* **Premios Conmemorativos:** Uso de Medallas y Logros como activos cosméticos y de prestigio.

### 📚 Características Técnicas

* **Backend:** **NestJS** (Node.js) – Para una arquitectura modular y escalable.
* **Frontend:** **React.js** con Vite.
* **Mobile:** **React Native** con Expo.
* **Base de Datos:** **PostgreSQL administrado (Supabase)** – Para transacciones ACID robustas.
* **Autenticación:** Autenticación con Google y Github (vía Supabase Auth).
* **Tiempo Real:** **WebSockets** (Subastas y Notificaciones).
* **Cache:** **Redis** – Para la gestión de caché de subastas en vivo.
* **Notificaciones Push:** **Firebase**.
* **ORM:** **Prisma** – Para tipado seguro y gestión de la base de datos.
* **Contenedorización:** **Docker** y **Docker Compose**.
* **Control de Versiones:** **Git** con **GitHub**.
---

## 🧩 Especificación Detallada de Módulos

### 1. 👥 Modulo de Usuarios

Gestiona la identidad y el control de acceso a la plataforma.

* **Autenticación (Auth):** Inicio de sesión vía Google/GitHub (OAuth2), gestión de JWT y sesiones.
* **Gestión de Usuarios y Roles:** Definición de roles (`Student`, `Teacher`, `Admin`) y almacenamiento de perfiles.
* **Gestión de Permisos (RBAC):** Control de acceso basado en roles. Ejemplo: Solo el `Teacher` puede crear misiones.

---

### 2. 🏫 Modulo de Cursos

Gestiona la estructura académica y la asignación de estudiantes.

* **Gestión de Cursos:** CRUD de Cursos (Nombre, Código, Profesor asignado).
* **Matrícula:** Inscripción y desinscripción de estudiantes al curso.

---

### 3. ⛏️ Modulo de Misiones y Recompensas (Mining)

La fuente de la divisa **ACH**.

* **Gestión de Misiones (CRUD):** Creación y edición de tareas gamificadas (Tipo: `Principal`/`Secundaria`).
* **Definición de Recompensa:** Asignación del monto fijo de **ACH** al completar la misión.
* **Validación y Pago:** **`Endpoint` transaccional** (`/missions/:id/complete`) que el `Teacher` usa para disparar el crédito de **ACH** al estudiante a través del **Modulo de Economía**.

---

### 4. 💰 Modulo de Economía

El *ledger* central de todas las transacciones monetarias.

* **Gestión de Monedas:** Define los activos: **ACH** (divisa base), **Fragment** (activo intermedio), **SeasonCoin** (ítem de canje).
* **Gestión de Economías (Transacciones):** Registro de Transacciones (*Log*) de cada ganancia/pérdida de ACH y Fragmentos (vital para la auditoría).
* **Auditoría de Fondos:** Herramientas para que el profesor verifique saldos y distribución de monedas.

---

### 5. 🗓️ Modulo de Temporadas

Define los ciclos económicos y previene la inflación a largo plazo.

* **Gestión de Temporadas:** CRUD de Temporadas (Fechas de inicio/fin, nombre) que actúan como contenedores de la economía.
* **🔄 Activación del Reinicio de Temporada (Endgame):** Proceso transaccional de ajuste de saldos al finalizar el ciclo:
    1.  **Fragmentos:** Quedan intactos.
    2.  **ACH Remanente:** Se Mantiene .
    3.  **Ítems de Beneficio:** Se eliminan los ítems no usados, un porcentaje de su valor retorna como **ACH** y se otorga una **Medalla de Temporada** (ítem cosmético) por la participación, acreditada al **Inventario**.

---

### 6. ⚖️ Modulo de Subastas (Trading)

El mecanismo central de conversión en tiempo real de ACH a Fragmentos.

* **Gestión de Subastas:** CRUD de Subastas de Fragmentos (Precio de salida, Duración, Cantidad).
* **API de Puje (WebSockets):** Gestión de la lógica de puja en tiempo real, garantizando la baja latencia.
* **Lógica de Ganador y Deducción:** Determinación del ganador al finalizar y **deducción atómica** del ACH.

---

### 7. 📦 Modulo de Inventario

Gestiona la propiedad y el consumo de todos los activos.

* **Gestión de Inventario:** Almacenamiento de saldos de **ACH**, **Fragmentos**, y lista de **Ítems Poseídos** por el estudiante.
* **Gestión de Consumo de Ítems:** **`Endpoint` de Uso** (`/inventory/use/:item-id`) para gastar ítems de un solo uso. Esto aplica una *flag* de beneficio al estudiante/curso (Ej: `hasLateSubmission`).

---

### 8. 🛒 Modulo de Tienda (Burning)

Permite canjear Fragmentos por beneficios académicos.

* **Gestión de Tienda:** CRUD de Ítems de Beneficio (Nombre, Descripción, **Costo en Fragmentos**).
* **API de Canje:** **`Endpoint` transaccional** que quema **Fragmentos** del estudiante y transfiere el nuevo Ítem de Beneficio a su **Inventario**.
* **Calculo de Precio:** Se calcula el precio final de un ítem de beneficio considerando la media de **Fragmentos** para cada ítem de beneficio.

---

### 9. 🏆 Modulo de Logros (Achievements)

Reconoce hitos a largo plazo para fomentar el prestigio.

* **Gestión de Logros (CRUD):** Define los criterios de desbloqueo (Ej: "Ganar 3 Subastas").
* **Monitoreo de Eventos:** Suscripción a eventos críticos del sistema (Ej: `AuctionWon`, `MissionCompleted`) para verificar el cumplimiento del criterio.
* **Desbloqueo y Payout:** **Registro** de la obtención del logro y entrega de la **Insignia Cosmética** asociada al Inventario del estudiante.

---

### 10. 🔔 Modulo de Notificaciones

Garantiza la comunicación oportuna, especialmente para eventos de tiempo real.

* **Notificaciones de Eventos Críticos:** Alertas de Subasta (nueva puja, finalizada), Misión completada, Ítem comprado.
* **WebSockets:** Para notificaciones internas de baja latencia (Ej: *Live Bid Feed*).
* **Firebase:** Para notificaciones *push* a dispositivos móviles.

---

### 11. 📊 Módulo de Analíticas/Reportes

Proporciona al `Teacher` datos para el balance económico y la intervención académica.

* **Distribución de ACH/Fragmentos:** Reportes sobre *top holders* y tasas de acumulación (*Tasa de Minería*).
* **Tasa de Canje y Demanda:** Reportes sobre la frecuencia de uso de ítems y el precio promedio de Fragmentos en subastas.

---

### 12. 🤖 Modulo de IA

Automatiza y personaliza la gestión del contenido.

* **Recomendación de Contenido:** Sugerencias para el `Teacher` de nuevas Misiones, Subastas o Ítems basadas en la demanda (Analíticas) y el comportamiento de los estudiantes.
* **Métricas de Predicción:** Algoritmos para identificar estudiantes en riesgo de bajo rendimiento o desinterés (falta de actividad económica/misiones), sugiriendo intervenciones personalizadas.
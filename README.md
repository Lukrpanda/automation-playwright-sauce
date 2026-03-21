# SaucePlay - Playwright con Cucumber

Este proyecto es una configuración de pruebas automatizadas utilizando Playwright para la automatización de navegadores y Cucumber para la definición de pruebas en lenguaje natural (BDD).

## Descripción

SaucePlay combina las capacidades de Playwright para interactuar con navegadores web y Cucumber para escribir escenarios de prueba legibles por humanos. Esto permite crear pruebas end-to-end robustas y mantenibles.

## Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Navegadores compatibles: Chromium, Firefox, WebKit (instalados automáticamente por Playwright)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd sauceplay
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Instala los navegadores de Playwright:
   ```bash
   npx playwright install
   ```

## Configuración

### package.json
El archivo `package.json` define las dependencias del proyecto:
- `@cucumber/cucumber`: Framework BDD para ejecutar escenarios.
- `@playwright/test`: Biblioteca de Playwright para pruebas.
- `@types/node`: Tipos de TypeScript para Node.js.
- `ts-node`: Ejecutor de TypeScript para Node.js.
- `tsx`: Ejecutor alternativo para TypeScript.

**Nota:** Actualmente no hay scripts definidos en `package.json`. Se recomienda agregar scripts para ejecutar las pruebas, por ejemplo:
```json
"scripts": {
  "test": "cucumber-js",
  "test:playwright": "playwright test"
}
```

### playwright.config.ts
Configuración de Playwright:
- `testDir`: Directorio de pruebas (`./tests`).
- `fullyParallel`: Ejecuta pruebas en paralelo.
- `retries`: Reintentos en CI.
- `reporter`: Reporte HTML.
- `projects`: Configuración para Chromium, Firefox y WebKit.

Puedes modificar este archivo para ajustar la configuración según tus necesidades, como agregar baseURL, configurar trazas, etc.

### cucumber.js
Configuración de Cucumber:
- `requireModule`: Registra `ts-node` para ejecutar archivos TypeScript.
- `paths`: Rutas a los archivos `.feature`.
- `require`: Rutas a los archivos de pasos (steps).
- `format`: Formatos de salida: HTML (`cucumber-report.html`) y resumen en consola.

### tsconfig.json
Configuración de TypeScript:
- `target`: ES2020.
- `module`: CommonJS (compatible con el tipo de módulo en `package.json`).
- `outDir`: `./dist`.
- Incluye todos los archivos `.ts` y excluye `node_modules` y `dist`.

### config/environment.js y config/environment.ts
Archivos de configuración de entorno (actualmente vacíos). Puedes usar estos archivos para definir variables de entorno específicas para diferentes entornos de prueba (desarrollo, staging, producción).

Ejemplo de uso:
```javascript
// environment.js
module.exports = {
  baseURL: 'https://example.com',
  username: 'testuser',
  password: 'testpass'
};
```

## Estructura del Proyecto

```
sauceplay/
├── config/
│   ├── environment.js
│   └── environment.ts
├── tests/
│   ├── Features/
│   │   └── Compra.feature
│   ├── Pages/
│   │   ├── CheckOutCompraPage.ts
│   │   ├── LoginCompraPage.ts
│   │   └── ProductoCompraPage.ts
│   ├── Steps/
│   │   └── compra.steps.ts
│   └── Tests/
│       └── compraexitosa.spec.ts
├── utils/
│   └── logger.ts
├── cucumber.js
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

- **Features/**: Archivos `.feature` de Cucumber con escenarios BDD.
- **Pages/**: Clases Page Object para encapsular la lógica de las páginas.
- **Steps/**: Definiciones de pasos que conectan los escenarios con el código de Playwright.
- **Tests/**: Archivos de pruebas adicionales (posiblemente specs de Playwright puro).
- **utils/**: Utilidades como logger.

## Ejecutar Pruebas

Para ejecutar las pruebas con Cucumber:
```bash
npx cucumber-js
```

Si agregas scripts en `package.json`, puedes usar:
```bash
npm test
```

Para ejecutar pruebas específicas de Playwright (si las hay):
```bash
npx playwright test
```

### Reportes
- Reporte HTML de Cucumber: `cucumber-report.html`
- Reporte HTML de Playwright: `playwright-report/index.html`

## Desarrollo

### Agregar Nuevas Pruebas
1. Crea un archivo `.feature` en `tests/Features/`.
2. Define los pasos en `tests/Steps/`.
3. Implementa la lógica usando Page Objects en `tests/Pages/`.

### Depuración
- Usa `trace: 'on-first-retry'` en `playwright.config.ts` para capturar trazas en reintentos.
- Revisa los reportes HTML para detalles de fallos.

## Contribución

1. Fork el proyecto.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`).
4. Push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

ISC


# 🛒 Sauce Demo - Automatización E2E con Playwright y Cucumber

Este repositorio contiene un proyecto de automatización de pruebas End-to-End (E2E) para el flujo de compras de la aplicación web [Sauce Demo](https://www.saucedemo.com/). 

El proyecto está construido utilizando **Playwright**, **TypeScript** y **Cucumber** (BDD), implementando buenas prácticas de ingeniería de calidad y patrones de diseño escalables.

---

## 🚀 Estrategia de Automatización

* **Framework Principal:** Implementación de pruebas End-to-End (E2E) robustas utilizando **Playwright** junto con **TypeScript**, asegurando una ejecución rápida, control avanzado del navegador y tipado estricto para prevenir errores en tiempo de desarrollo.
* **Enfoque BDD (Behavior-Driven Development):** Integración de **Cucumber** para redactar los casos de prueba empleando la sintaxis **Gherkin** en español. Esta estrategia transforma las pruebas en documentación viva, facilitando el entendimiento y la colaboración entre los equipos de desarrollo, QA y negocio.
* **Reportes Nativos:** Configuración adaptada para la generación de reportes automáticos en formato HTML (`cucumber-report.html`), permitiendo una visualización clara y auditable de los resultados de las ejecuciones.
* **Preparación para Integración Continua (CI):** La inclusión del directorio `.github/workflows` establece la base para integrar las pruebas automatizadas en un pipeline de despliegue continuo (CI/CD) usando GitHub Actions.

## 🧩 Patrones de Diseño Implementados

* **Page Object Model (POM):** Se aplica este patrón estructural centralizando los localizadores y métodos de interacción en clases específicas dentro del directorio `tests/Pages` (ej. `LoginCompraPage.ts`, `ProductoCompraPage.ts`, `CheckOutCompraPage.ts`). Esto garantiza un bajo acoplamiento, alta cohesión y facilita el mantenimiento ante futuros cambios en la interfaz de usuario.
* **Separación de Conceptos (Separation of Concerns):** El repositorio cuenta con una arquitectura modular y escalable dividida estratégicamente:
  * `tests/Features/`: Almacena el comportamiento funcional del sistema escrito en lenguaje natural.
  * `tests/Steps/`: Actúa como la capa de conexión (glue code), traduciendo los pasos Gherkin en llamadas a los métodos de las páginas.
  * `utils/` y `config/`: Archivos de configuración transversal y utilidades de apoyo.

## ⚙️ Manejo Eficiente de Escenarios

* **Optimización de Flujos:** Uso de bloques de `Antecedentes` (Background) en Gherkin para extraer y reutilizar pasos precondicionales comunes a todos los escenarios, como la carga de la página y el inicio de sesión.
* **Data-Driven Testing (Pruebas Basadas en Datos):** Implementación de `Esquemas del escenario` (Scenario Outlines) combinados con tablas de datos. Esta técnica permite validar de forma dinámica y eficiente múltiples casuísticas (como validaciones de campos incompletos en el checkout) minimizando la duplicación de código.

---

## 📁 Estructura del Proyecto

```text
📦 automation-playwright-sauce
 ┣ 📂 .github/workflows/   # Configuración de pipelines para CI/CD
 ┣ 📂 config/              # Configuraciones globales del framework
 ┣ 📂 tests/
 ┃ ┣ 📂 Features/          # Casos de prueba descritos en Gherkin (.feature)
 ┃ ┣ 📂 Pages/             # Clases del patrón Page Object Model (POM)
 ┃ ┣ 📂 Steps/             # Step definitions que unen Gherkin con Playwright
 ┃ ┗ 📂 Tests/             # (Histórico) Scripts de prueba directos de Playwright
 ┣ 📂 utils/               # Funciones y utilidades transversales
 ┣ 📜 cucumber.js          # Archivo de configuración principal de Cucumber
 ┣ 📜 package.json         # Dependencias y scripts del proyecto
 ┣ 📜 playwright.config.ts # Configuración base de Playwright
 ┗ 📜 tsconfig.json        # Configuración del compilador de TypeScript
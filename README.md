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
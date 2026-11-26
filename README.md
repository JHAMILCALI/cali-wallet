# Cali Wallet

Cali es un proyecto de wallet de Solana orientada a pagos iniciados por agentes de inteligencia artificial, flujos x402, permisos financieros y autorizaciones desde dispositivos móviles. El repositorio agrupa tres proyectos independientes. Por ahora, solo existe la aplicación móvil; el backend y el servidor MCP son espacios reservados.

## Proyectos

| Directorio | Responsabilidad | Tecnologías |
| --- | --- | --- |
| [`cali-mobile/`](./cali-mobile/) | Aplicación móvil existente | Expo SDK 58, React Native, TypeScript, Expo Router, Solana Kit, Wallet UI, Zustand, TanStack Query |
| [`cali-backend/`](./cali-backend/) | Futuro servicio de autenticación, políticas, pagos y transacciones | NestJS, TypeScript, PostgreSQL, Prisma, Solana Kit, SDK de x402 Foundation, WebSockets |
| [`cali-mcp/`](./cali-mcp/) | Futuras herramientas autenticadas para agentes | Node.js, TypeScript, SDK oficial de Model Context Protocol |
| [`docs/`](./docs/) | Documentación técnica | Markdown |

La aplicación móvil conserva su código, imágenes, configuración Expo, plugin personalizado, scripts y lockfile. El traslado no cambia su interfaz ni su comportamiento. El backend y el servidor MCP todavía no tienen implementación ni manifiestos de paquetes. Consulta la [arquitectura](./docs/architecture.md) para conocer sus responsabilidades previstas.

## Ejecutar la aplicación móvil

Usa Node.js 24 y npm. Desde la raíz del repositorio:

```bash
cd cali-mobile
npm ci
npx expo start --dev-client
```

El cliente de desarrollo debe estar instalado en el dispositivo o emulador para usar los módulos nativos que no vienen con Expo Go. Ejecuta `npx expo lint`, `npx tsc --noEmit` y `npx expo-doctor` desde `cali-mobile/` para validar la app. El [README móvil](./cali-mobile/README.md) conserva las notas originales de la plantilla Expo.

La raíz es un repositorio compartido, sin npm workspaces. Cuando se creen el backend y MCP, cada uno tendrá su propio `package.json` y sus comandos se ejecutarán desde su directorio.

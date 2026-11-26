# Arquitectura de Cali

Cali agrupa tres proyectos independientes en un único repositorio Git. En esta etapa solo está implementado `cali-mobile/`. Los directorios del backend y del servidor MCP contienen documentación de planificación, sin código ejecutable ni dependencias.

## Responsabilidades

### `cali-mobile/`: wallet y autorización del usuario

La aplicación existente usa Expo SDK 58, React Native, TypeScript, Expo Router, Solana Kit, Wallet UI, Zustand y TanStack Query. Sus responsabilidades previstas son crear e importar wallets, proteger claves, mostrar balances, transferir SOL y USDC, administrar agentes y permisos, y revisar y firmar solicitudes de pago. Estas funciones describen el producto previsto; este traslado no las implementa.

Las claves privadas y la firma de transacciones corresponden al dispositivo móvil del usuario. El proyecto ya incluye Expo Secure Store y Local Authentication, aunque su presencia como dependencias no significa que exista un flujo completo de gestión de claves.

### `cali-backend/`: políticas y coordinación

El servicio previsto con NestJS y TypeScript autenticará usuarios y agentes, administrará sesiones, aplicará presupuestos y límites de gasto, coordinará pagos x402, registrará el historial de transacciones y enviará solicitudes de autorización mediante WebSockets. Su stack previsto incluye PostgreSQL, Prisma, Solana Kit y el SDK oficial de x402 Foundation. Para los pagos que requieran firma del usuario, solicitará autorización a la aplicación móvil.

### `cali-mcp/`: interfaz para agentes

El servidor MCP previsto con Node.js y TypeScript expondrá herramientas autenticadas a agentes de inteligencia artificial. Consultará balances y presupuestos, solicitará pagos x402 y comunicará el estado de las transacciones a través de Cali Backend. Usará credenciales con alcance limitado, sin manejar claves privadas ni firmar por el usuario.

## Flujo de solicitudes previsto

1. Un agente autenticado llama a una herramienta de Cali MCP.
2. Cali MCP envía la solicitud a Cali Backend con la identidad y los permisos del agente.
3. Cali Backend evalúa la política, el presupuesto y el estado del pago.
4. Si se requiere autorización, Cali Backend envía la solicitud a Cali Mobile.
5. El usuario revisa y firma desde el dispositivo móvil; el backend registra y comunica el resultado.

Este flujo es un objetivo de diseño, no una integración ya implementada. Cada proyecto tendrá su propio `package.json` cuando se cree; la raíz no es un npm workspace.

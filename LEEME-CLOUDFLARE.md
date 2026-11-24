# GOING-MERRY 1.5 — IMAP multiproveedor

El proyecto completo incluye la gestión de asuntos anterior y los nuevos buzones, con Hotmail por código mediante cliente público experimental.

Lee **ACTUALIZAR-BUZONES-Y-HOTMAIL.md** para instalar sobre tu versión actual conservando usuarios, buzones, carpetas, administrador y personalizaciones. Para el modo público solo se mantienen las cinco variables que ya utilizabas.

La tabla de usuarios conserva sus acciones y Consultas permitidas. El buscador filtra por usuario y por correo cuando el proyecto muestra esa columna, sin buscar en contraseñas ni alterar registros. Mantiene el filtro al actualizar la tabla.

Build: `npm run build`. Salida: `dist`. No hacen falta D1 ni KV. Conserva MAILBOX_ENCRYPTION_KEY sin cambios. No subas secretos, node_modules ni dist al repositorio.

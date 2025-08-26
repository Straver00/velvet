# Velvet

Una aplicación personal para leer y escuchar música.

## Problemas conocidos y soluciones

### Error de preload

Si ves el error `<link rel=preload> uses an unsupported 'as' value`:

- ✅ **Solucionado**: Cambiado de `as="audio"` a `as="fetch"`
- ✅ **Solucionado**: Agregado `crossorigin` para mejor compatibilidad

### Botones no se ven en GitHub Pages

Si los botones de navegación o el botón de play no son visibles:

- ✅ **Solucionado**: Agregada verificación de CSS y forzado de visibilidad
- ✅ **Solucionado**: Mejorada la función `setupDeviceInterface()`

### Canciones no cargan

Si los archivos de audio no se reproducen:

- ✅ **Solucionado**: Mejorado el manejo de errores de audio
- ✅ **Solucionado**: Agregada verificación de archivos
- ✅ **Solucionado**: Mejorada la creación del elemento Audio

## Configuración para GitHub Pages

### 1. Habilitar GitHub Pages

**Opción A: Configuración automática (Recomendado)**

1. Ve a Settings > Pages
2. Source: "GitHub Actions"
3. Selecciona el workflow "Simple Deploy"
4. Save

**Opción B: Configuración manual**

1. Ve a Settings > Pages
2. Source: "Deploy from a branch"
3. Branch: "main" o "master"
4. Folder: "/ (root)"
5. Save

### 2. Configurar permisos (si usas GitHub Actions)

Si ves el error "Permission denied to github-actions[bot]":

1. Ve a Settings > Actions > General
2. En "Workflow permissions", selecciona "Read and write permissions"
3. Marca "Allow GitHub Actions to create and approve pull requests"
4. Save

### 3. Verificar archivos necesarios

Asegúrate de que estos archivos estén en tu repositorio:

- ✅ `index.html`
- ✅ `style.css`
- ✅ `script.js`
- ✅ `.nojekyll`
- ✅ `songs/Cherry Waves.mp3`
- ✅ `songs/K. - Cigarettes After Sex.mp3`

### 4. Debugging

Para verificar que todo funcione:

1. **Abre la consola del navegador** (F12)
2. **Recarga la página**
3. **Busca estos mensajes**:
   ```
   === Verificación de compatibilidad ===
   === Verificación de elementos DOM ===
   === Verificación de archivos de audio ===
   === Verificación de datos ===
   === Verificación post-inicialización ===
   ```

### 5. Problemas comunes

#### Los archivos de audio muestran error 404:

- Verifica que los archivos estén en la carpeta `songs/`
- Los nombres deben coincidir exactamente (incluyendo espacios)
- Los archivos MP3 deben ser válidos

#### Los botones no aparecen:

- Verifica que el CSS se esté cargando
- Revisa la consola para errores de JavaScript
- Asegúrate de que no sea un dispositivo táctil (los botones se ocultan en móviles)

#### La página se ve diferente:

- Limpia la caché del navegador (Ctrl+F5)
- Verifica que todos los archivos se hayan subido
- Revisa que no haya errores en la consola

## Estructura del proyecto

```
velvet/
├── index.html
├── style.css
├── script.js
├── .nojekyll
├── CNAME
├── README.md
├── .github/workflows/deploy.yml
└── songs/
    ├── Cherry Waves.mp3
    └── K. - Cigarettes After Sex.mp3
```

## Tecnologías

- HTML5
- CSS3 (responsive)
- JavaScript vanilla
- Web Audio API

## Licencia

Proyecto personal - Uso privado.

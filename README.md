# Flux Studio — Landing page de muestra

Landing page estática (HTML + CSS + JS puro, sin frameworks ni build) para Flux Studio, el negocio de José Sanoja y Ángel Figueroa dedicado a crear landing pages.

## Archivos
- `index.html` — estructura de la página
- `styles.css` — estilos (tema oscuro futurista, tipografías, carruseles)
- `script.js` — lógica mínima de los carruseles

No necesita servidor ni instalación: puedes abrir `index.html` directo en el navegador para verla localmente.

## Publicar en GitHub + Vercel

**1. Crear el repositorio en GitHub**
1. Entra a github.com y crea un repositorio nuevo, por ejemplo `flux-studio-landing` (puede ser público o privado).
2. En tu computadora, dentro de la carpeta de este proyecto, ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Landing page inicial de Flux Studio"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/flux-studio-landing.git
   git push -u origin main
   ```

**2. Conectar el repositorio a Vercel**
1. Entra a vercel.com e inicia sesión (puedes usar tu cuenta de GitHub).
2. Haz clic en **"Add New… → Project"**.
3. Elige el repositorio `flux-studio-landing` que acabas de subir.
4. Como es HTML/CSS/JS puro, Vercel lo detecta automáticamente como sitio estático — no necesitas configurar "Framework" ni "Build Command", solo deja los valores por defecto.
5. Haz clic en **Deploy**.

En un par de minutos Vercel te da una URL pública (algo como `flux-studio-landing.vercel.app`). Cada vez que hagas `git push` a `main`, Vercel vuelve a publicar la página automáticamente.

## Personalizar después
- **Número de WhatsApp:** aparece en 3 lugares de `index.html` (`https://wa.me/51936885108?...`). Cámbialo ahí si el número cambia.
- **Textos de servicios / equipo:** están directamente en `index.html`, en las secciones `#servicios`, `#negocios` y `#nosotros`.
- **Colores:** están centralizados como variables al inicio de `styles.css` (bloque `:root`), así que puedes ajustarlos sin tocar el resto del archivo.

# bug-hunter
# 👾 Workshop: Bug Hunter Arena

¡Bienvenid@ a la ayudantía! Hoy dejaremos de lado las páginas estáticas para construir un **Minijuego RPG de Batalla** funcional desde cero.

**Objetivo:** Aprender a conectar HTML, SASS y JavaScript, manipulando el DOM, manejando eventos y controlando la lógica de estados de un videojuego.

---

## 🚀 Fase 0: Setup del Proyecto

Antes de empezar, asegúrate de tener tu entorno listo.

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPO>
    cd bug-hunter
    ```

2.  **Ramas (Branches):**
    * `main`: Código base (esqueleto inicial) **<-- Trabajaremos aquí**.
    * `final`: Solución completa (por si necesitas consultar el código final).

3.  **Compilar SASS (¡Muy Importante!):**
    Necesitamos que SASS observe los cambios en nuestra carpeta `sass` y genere el CSS en `assets`.
    * **Opción A (VS Code Plugin):** Haz click en "Watch Sass" en la barra inferior.
    * **Opción B (Terminal):**
        ```bash
        sass --watch sass/main.scss:assets/css/style.css
        ```

---

## 🏗️ Fase 1: La Estructura (HTML)

Trabajaremos en `index.html`. Necesitamos una arena de combate dividida en 3 columnas dentro de `<main class="battle-arena">`.

### 1. El Héroe (`.fighter-card.hero`)
* **Info:** Avatar y nombre.
* **Barras de Estado:** Usaremos la técnica de "Caja dentro de Caja".
    * Padre gris (fondo): `.bar-container`
    * Hijo color (relleno dinámico): `.bar-fill`
    * ⚠️ **Importante:** Asigna IDs únicos (`hero-hp-bar`) a los hijos para moverlos con JS.
* **Controles:** Botones con eventos directos.
    ```html
    <div class="controls" id="btn-container">
        <button class="btn-skill" onclick="atacar('basico')">Refactor</button>
        </div>
    ```

### 2. El Log de Batalla (`.battle-log`)
* Título: `<h3>Console.log()</h3>`
* Lista: `<ul id="log-list" class="battle-log__list">`.
    * *Nota:* Usamos **ID** para que JS lo encuentre rápido y **Clase** para darle estilos específicos.

### 3. El Boss (`.fighter-card.boss`)
* Similar al héroe, pero con la clase `.boss` (para el borde rojo) y su barra de vida con ID `boss-hp-bar`.

---

## 🎨 Fase 2: Estilos (SASS)

Trabajaremos en `sass/main.scss`.

1.  **Variables:** Define colores (`$color-hero`, `$color-boss`) al inicio para mantener el orden.
2.  **Layout Principal:**
    * `.battle-arena`: Usa `display: flex` y `gap: 20px` para alinear las columnas.
    * **Responsive:** En `@media (max-width: 768px)`, cambia a `flex-direction: column`.
3.  **Animaciones y Efectos:**
    * `.bar-fill`: Agrega `transition: width 0.5s ease` para que la vida baje suavemente.
    * `.btn-skill:hover`: Usa `filter: brightness(1.1)` para iluminar el botón al pasar el mouse.
4.  **El Scroll del Log (Fix):**
    * Al contenedor `.battle-log`: `display: flex; flex-direction: column; height: 300px;`
    * A la lista `.battle-log__list`: `overflow-y: auto; height: 100%;` (Esto permite que el título se quede fijo y solo scrollee el texto).

---

## 🧠 Fase 3: Lógica del Juego (JS)

Trabajaremos en `assets/js/script.js`.

### A. Estado Inicial
Crea objetos para manejar la data numérica. **Nunca** uses el HTML para guardar datos (como la vida actual), úsalo solo para mostrarla.
```javascript
let turno = true; // true = Jugador, false = Boss
let hero = { hp: 100, maxHp: 100, mp: 50 };
let boss = { hp: 150, maxHp: 150 };
```
### B. Función atacar(tipo)
Esta función es el corazón del juego. Debe:

1. * Validar si es turno del jugador `(if (!turno) return)`.

2. * Calcular daño según el ataque `('basico', 'fuerte', 'ulti')`.

3. * Restar vida al Boss (y usar un `if` para evitar que baje de 0).

4. * Llamar a `actualizarBarras()` para refrescar la pantalla.

5. * Pasar el turno con `cambiarTurno()`.

### C. La IA del Boss (cambiarTurno)
El enemigo debe sentirse "vivo".

1. * Bloquea los botones visualmente: `btnContainer.style.pointerEvents = "none"`.

2. * Usa `setTimeout(() => { ... }, 1500)` para simular que está "pensando".

3. * Calcula un daño random y ataca al héroe.

4. * Devuelve el turno y desbloquea los botones.

## 📝 Notas Técnicas Importantes

### 1. ⚠️ Actualización de Sintaxis Sass (`@import` vs `@use`)
Se reemplazó la sintaxis obsoleta `@import` por el sistema de módulos moderno de Dart Sass para evitar advertencias (warnings) y asegurar compatibilidad futura:
- Ahora se utiliza **`@use`** en lugar de `@import`.
- **Nota clave:** Al usar módulos, las variables dejan de ser globales automáticamente. Por ello, en cada archivo parcial donde se necesiten variables, se incluyó la línea:
  ```scss
  @use '../abstracts/variables' as *;
  ```
### 2. 🐛 Corrección de Errores
Se corrigieron errores de digitación en los nombres de las clases (typos) que estaban impidiendo que los estilos anidados se aplicaran correctamente en el diseño.
// 1. ESTADO DEL JUEGO (Variables Globales)
let turno = true; // true = Jugador, false = Boss
let hero = { hp: 100, maxHp: 100, mp: 50, maxMp: 50 };
let boss = { hp: 150, maxHp: 150 };

// Referencias al DOM (Elementos HTML)
const logLista = document.getElementById('log-list');
const btnContainer = document.getElementById('btn-container');

// 2. FUNCIÓN PRINCIPAL: ATACAR
function atacar(tipo) {
    if (!turno) return; // Si no es tu turno, no hace nada

    let dano = 0;
    let costoMp = 0;
    let nombreAtaque = "";

    // Configuración de Habilidades
    if (tipo === 'basico') {
        dano = 10;
        nombreAtaque = "Refactorización";
    } else if (tipo === 'fuerte') {
        dano = 20;
        costoMp = 10;
        nombreAtaque = "Hotfix Urgente";
    } else if (tipo === 'ulti') {
        dano = 40;
        costoMp = 20;
        nombreAtaque = "Deploy a Producción";
    }

    // Validar Mana
    if (hero.mp < costoMp) {
        agregarLog("⚠️ No tienes suficiente energía (MP)");
        return;
    }

    // APLICAR CAMBIOS
    hero.mp -= costoMp;
    boss.hp -= dano;
    if (boss.hp < 0) boss.hp = 0; // Evitar negativos

    // Feedback
    agregarLog(`⚔️ Usaste ${nombreAtaque}: -${dano} HP al Boss`);
    actualizarBarras();

    // VERIFICAR VICTORIA
    if (boss.hp === 0) {
        finalizarJuego(true);
    } else {
        cambiarTurno(); // Le toca al Boss
    }
}

// 3. FUNCIÓN CURAR (Poción)
function curar() {
    if (!turno) return;
    
    // Curar HP y un poco de MP
    hero.hp += 30;
    hero.mp += 10;
    if (hero.hp > hero.maxHp) hero.hp = hero.maxHp;
    
    agregarLog(`☕ Tomas café: +30 HP y +10 MP`);
    actualizarBarras();
    cambiarTurno();
}

// 4. TURNO DEL BOSS (Automático)
function cambiarTurno() {
    turno = false;
    // Deshabilitar botones visualmente
    btnContainer.style.opacity = "0.5";
    btnContainer.style.pointerEvents = "none"; // Evita clicks

    agregarLog("... El Rey Bug está procesando ...");

    // Simular tiempo de pensamiento (1.5 segundos)
    setTimeout(() => {
        if (boss.hp > 0) {
            // Ataque del Boss
            const danoBoss = Math.floor(Math.random() * 15) + 10; // Daño entre 10 y 25
            hero.hp -= danoBoss;
            if (hero.hp < 0) hero.hp = 0;

            agregarLog(`👾 Rey Bug lanza 'Exception': Recibes -${danoBoss} HP`);
            actualizarBarras();

            if (hero.hp === 0) {
                finalizarJuego(false);
            } else {
                // Devolver turno al jugador
                turno = true;
                btnContainer.style.opacity = "1";
                btnContainer.style.pointerEvents = "auto";
                agregarLog("> Tu turno. ¿Qué harás?");
            }
        }
    }, 1500);
}

// 5. UTILIDADES (Actualizar HTML)
function actualizarBarras() {
    // Calcular porcentajes para CSS width
    const heroHpPct = (hero.hp / hero.maxHp) * 100;
    const heroMpPct = (hero.mp / hero.maxMp) * 100;
    const bossHpPct = (boss.hp / boss.maxHp) * 100;

    // Actualizar estilos (ancho de la barra)
    document.getElementById('hero-hp-bar').style.width = heroHpPct + "%";
    document.getElementById('hero-mana-bar').style.width = heroMpPct + "%";
    document.getElementById('boss-hp-bar').style.width = bossHpPct + "%";

    // Actualizar textos
    document.getElementById('hero-hp-text').innerText = `${hero.hp}/${hero.maxHp} HP`;
    document.getElementById('hero-mana-text').innerText = `${hero.mp}/${hero.maxMp} MP`;
    document.getElementById('boss-hp-text').innerText = `${boss.hp}/${boss.maxHp} HP`;
}

function agregarLog(mensaje) {
    const li = document.createElement('li');
    li.innerText = mensaje;
    logLista.appendChild(li);
    logLista.scrollTop = logLista.scrollHeight; // Auto-scroll al final
}

function finalizarJuego(victoria) {
    btnContainer.style.display = "none"; // Quitar botones
    const h2 = document.getElementById('resultado-final');
    if (victoria) {
        h2.innerText = "🎉 ¡VICTORIA! El sistema está limpio.";
        h2.style.color = "#00b894";
    } else {
        h2.innerText = "☠️ GAME OVER. El Bug ganó.";
        h2.style.color = "#d63031";
    }
}
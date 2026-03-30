let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

// ─── Som de colisão ───
const bonk = new Audio('./bonk.wav')

// ─── Sprites ───
const imgPeixe    = new Image(); imgPeixe.src    = './peixe.png'
const imgPeixeDmg = new Image(); imgPeixeDmg.src = './peixe_dmg.png'
const imgPedra    = new Image(); imgPedra.src    = './pedra.png'
const imgSoul     = new Image(); imgSoul.src     = './soul.png'

// ─── Controle de dano visual ───
let dmgTimer1 = 0
let dmgTimer2 = 0
const DMG_FRAMES = 20

// ─── Inimigos da pista SUPERIOR (Jogador 1) ───
let carroInimigo  = new CarroInimigoSup(1300, 200, 80, 55, 'darkgreen')
let carroInimigo2 = new CarroInimigoSup(1600, 280, 80, 55, 'rgb(247, 0, 255)')
let carroInimigo3 = new CarroInimigoSup(1900, 100, 80, 55, 'rgb(255, 238, 0)')

// ─── Inimigos da pista INFERIOR (Jogador 2) ───
let carroInimigoB  = new CarroInimigoInf(1400, 450, 80, 55, 'orangered')
let carroInimigoB2 = new CarroInimigoInf(1700, 560, 80, 55, 'rgb(0, 200, 255)')
let carroInimigoB3 = new CarroInimigoInf(2000, 400, 80, 55, 'rgb(0, 255, 128)')

// ─── Jogador 1 — pista SUPERIOR (W/S) ───
let carro = new Carro(100, 200, 80, 55, 'darkblue')

// ─── Jogador 2 — pista INFERIOR (↑/↓) ───
let carro2 = new Carro2(100, 520, 80, 55, 'darkred')

// ─── Coletáveis de vida ───
const SOUL_W = 40
const SOUL_H = 40
let soul1 = new Coletavel(1800, 150, SOUL_W, SOUL_H, 10,  295)
let soul2 = new Coletavel(2200, 500, SOUL_W, SOUL_H, 360, 645)
const VIDA_MAX = 5

// ─── Background do body por nível ───
const BACKGROUNDS = [
    "url('./lvl1_bg.jpg')",
    "url('./lvl2_bg.jpg')",
    "url('./lvl3_bg.jpg')"
]
let nivelAnterior = -1

function atualizaBackground(){
    const nivel1 = nivelVelocidade(carro.pontos)
    const nivel2 = nivelVelocidade(carro2.pontos)
    const nivelAtual = Math.max(nivel1, nivel2)  // 0, 1 ou 2

    if(nivelAtual !== nivelAnterior){
        document.body.style.backgroundImage    = BACKGROUNDS[nivelAtual]
        document.body.style.backgroundSize     = 'cover'
        document.body.style.backgroundPosition = 'center'
        document.body.style.backgroundRepeat   = 'no-repeat'
        nivelAnterior = nivelAtual
    }
}

// ─── Controles Jogador 1 (W / S) ───
document.addEventListener('keydown', (e) => {
    if(e.key === 'w' || e.key === 'W'){
        carro.dir = -10
    } else if(e.key === 's' || e.key === 'S'){
        carro.dir = 10
    }
    if(e.key === 'ArrowUp'){
        carro2.dir = -10
        e.preventDefault()
    } else if(e.key === 'ArrowDown'){
        carro2.dir = 10
        e.preventDefault()
    }
})

document.addEventListener('keyup', (e) => {
    if(e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S'){
        carro.dir = 0
    }
    if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        carro2.dir = 0
    }
})

// ─── Som ───
function tocaBonk(){
    bonk.currentTime = 0
    bonk.play()
}

// ─── Colisão ───
function colisao(){
    if(carro.colid(carroInimigo))  { carroInimigo.recomeca();  carro.vida -= 1; tocaBonk(); dmgTimer1 = DMG_FRAMES }
    if(carro.colid(carroInimigo2)) { carroInimigo2.recomeca(); carro.vida -= 1; tocaBonk(); dmgTimer1 = DMG_FRAMES }
    if(carro.colid(carroInimigo3)) { carroInimigo3.recomeca(); carro.vida -= 1; tocaBonk(); dmgTimer1 = DMG_FRAMES }

    if(carro2.colid(carroInimigoB))  { carroInimigoB.recomeca();  carro2.vida -= 1; tocaBonk(); dmgTimer2 = DMG_FRAMES }
    if(carro2.colid(carroInimigoB2)) { carroInimigoB2.recomeca(); carro2.vida -= 1; tocaBonk(); dmgTimer2 = DMG_FRAMES }
    if(carro2.colid(carroInimigoB3)) { carroInimigoB3.recomeca(); carro2.vida -= 1; tocaBonk(); dmgTimer2 = DMG_FRAMES }
}

// ─── Coletáveis — colisão e efeito ───
function verificaColetaveis(){
    if(soul1.ativo && carro.colid(soul1)){
        soul1.ativo = false
        carro.vida = Math.min(carro.vida + 1, VIDA_MAX)
        setTimeout(() => soul1.recomeca(), 8000)
    }
    if(soul2.ativo && carro2.colid(soul2)){
        soul2.ativo = false
        carro2.vida = Math.min(carro2.vida + 1, VIDA_MAX)
        setTimeout(() => soul2.recomeca(), 8000)
    }
}

// ─── Pontuação ───
function pontuacao(){
    if(carro.point(carroInimigo))  carro.pontos  += 5
    if(carro.point(carroInimigo2)) carro.pontos  += 5
    if(carro.point(carroInimigo3)) carro.pontos  += 5

    if(carro2.point(carroInimigoB))  carro2.pontos += 5
    if(carro2.point(carroInimigoB2)) carro2.pontos += 5
    if(carro2.point(carroInimigoB3)) carro2.pontos += 5
}

// ─── Desenha sprite ───
const DEBUG_HITBOX = false
function desenhaSprite(img, obj){
    des.drawImage(img, obj.x, obj.y, obj.w, obj.h)
    if(DEBUG_HITBOX){
        des.save()
        des.strokeStyle = 'red'
        des.lineWidth = 2
        des.strokeRect(obj.x, obj.y, obj.w, obj.h)
        des.restore()
    }
}

// ─── Desenha coletável com brilho pulsante ───
let pulseFrame = 0
function desenhaColetavel(soul){
    if(!soul.ativo) return
    pulseFrame++
    const escala = 1 + Math.sin(pulseFrame * 0.1) * 0.12
    const cx = soul.x + soul.w / 2
    const cy = soul.y + soul.h / 2
    const dw = soul.w * escala
    const dh = soul.h * escala

    des.save()
    des.shadowColor = 'rgba(255, 50, 50, 0.9)'
    des.shadowBlur = 14
    des.drawImage(imgSoul, cx - dw / 2, cy - dh / 2, dw, dh)
    des.restore()
}

// ─── Linha divisória ───
function desenhaDivisoria(){
    des.save()
    des.setLineDash([30, 15])
    des.lineWidth = 3
    des.strokeStyle = 'rgba(255,255,255,0.4)'
    des.beginPath()
    des.moveTo(0, 350)
    des.lineTo(1200, 350)
    des.stroke()
    des.setLineDash([])
    des.restore()
}

// ─── HUD (vida e pontos) ───
function desenhaHUD(){
    const nivel1 = nivelVelocidade(carro.pontos) + 1
    const nivel2 = nivelVelocidade(carro2.pontos) + 1

    des.save()
    des.font = 'bold 18px monospace'

    des.fillStyle = 'rgba(0,0,100,0.55)'
    des.fillRect(8, 8, 260, 60)
    des.fillStyle = '#7cf'
    des.fillText(`P1 — W/S   LVL ${nivel1}`, 16, 28)
    des.fillStyle = 'white'
    des.fillText(`❤ ${Math.max(carro.vida, 0)}   ★ ${carro.pontos}`, 16, 54)

    des.fillStyle = 'rgba(100,0,0,0.55)'
    des.fillRect(8, 358, 260, 60)
    des.fillStyle = '#f88'
    des.fillText(`P2 — ↑/↓   LVL ${nivel2}`, 16, 378)
    des.fillStyle = 'white'
    des.fillText(`❤ ${Math.max(carro2.vida, 0)}   ★ ${carro2.pontos}`, 16, 404)

    des.restore()
}

// ─── Game Over ───
function gameOver(){
    if(carro.vida <= 0){
        window.location.href = "./win2.html";
    }
    if(carro2.vida <= 0){
        window.location.href = "./win1.html";
    }
}

// ─── Desenha ───
function desenha(){
    desenhaDivisoria()

    desenhaSprite(imgPedra, carroInimigo)
    desenhaSprite(imgPedra, carroInimigo2)
    desenhaSprite(imgPedra, carroInimigo3)
    desenhaSprite(imgPedra, carroInimigoB)
    desenhaSprite(imgPedra, carroInimigoB2)
    desenhaSprite(imgPedra, carroInimigoB3)

    desenhaColetavel(soul1)
    desenhaColetavel(soul2)

    desenhaSprite(dmgTimer1 > 0 ? imgPeixeDmg : imgPeixe, carro)
    desenhaSprite(dmgTimer2 > 0 ? imgPeixeDmg : imgPeixe, carro2)

    desenhaHUD()
    gameOver()
}

// ─── Atualiza ───
function atualiza(){
    if(dmgTimer1 > 0) dmgTimer1--
    if(dmgTimer2 > 0) dmgTimer2--

    if(carro.vida > 0){
        carro.mov_car()
        carroInimigo.mov_car(carro.pontos)
        carroInimigo2.mov_car(carro.pontos)
        carroInimigo3.mov_car(carro.pontos)
    }
    if(carro2.vida > 0){
        carro2.mov_car()
        carroInimigoB.mov_car(carro2.pontos)
        carroInimigoB2.mov_car(carro2.pontos)
        carroInimigoB3.mov_car(carro2.pontos)
    }

    soul1.mov(carro.pontos)
    soul2.mov(carro2.pontos)

    colisao()
    verificaColetaveis()
    pontuacao()
    atualizaBackground()
}

// ─── Loop principal ───
function main(){
    des.clearRect(0, 0, 1200, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()

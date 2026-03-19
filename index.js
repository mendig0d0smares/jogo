let canvas = document.getElementById('des')
let des = canvas.getContext('2d')

// ─── Inimigos da pista SUPERIOR (Jogador 1) ───
let carroInimigo  = new CarroInimigoSup(1300, 200, 50, 50, 'darkgreen')
let carroInimigo2 = new CarroInimigoSup(1600, 280, 50, 50, 'rgb(247, 0, 255)')
let carroInimigo3 = new CarroInimigoSup(1900, 100, 50, 50, 'rgb(255, 238, 0)')

// ─── Inimigos da pista INFERIOR (Jogador 2) ───
let carroInimigoB  = new CarroInimigoInf(1400, 450, 50, 50, 'orangered')
let carroInimigoB2 = new CarroInimigoInf(1700, 560, 50, 50, 'rgb(0, 200, 255)')
let carroInimigoB3 = new CarroInimigoInf(2000, 400, 50, 50, 'rgb(0, 255, 128)')

// ─── Jogador 1 — pista SUPERIOR (W/S) ───
let carro = new Carro(100, 200, 50, 50, 'darkblue')

// ─── Jogador 2 — pista INFERIOR (↑/↓) ───
let carro2 = new Carro2(100, 520, 50, 50, 'darkred')

// ─── Controles Jogador 1 (W / S) ───
document.addEventListener('keydown', (e) => {
    if(e.key === 'w' || e.key === 'W'){
        carro.dir = -10
    } else if(e.key === 's' || e.key === 'S'){
        carro.dir = 10
    }
    // ─── Controles Jogador 2 (↑ / ↓) ───
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

// ─── Colisão ───
function colisao(){
    // Jogador 1
    if(carro.colid(carroInimigo))  { carroInimigo.recomeca();  carro.vida -= 1 }
    if(carro.colid(carroInimigo2)) { carroInimigo2.recomeca(); carro.vida -= 1 }
    if(carro.colid(carroInimigo3)) { carroInimigo3.recomeca(); carro.vida -= 1 }

    // Jogador 2
    if(carro2.colid(carroInimigoB))  { carroInimigoB.recomeca();  carro2.vida -= 1 }
    if(carro2.colid(carroInimigoB2)) { carroInimigoB2.recomeca(); carro2.vida -= 1 }
    if(carro2.colid(carroInimigoB3)) { carroInimigoB3.recomeca(); carro2.vida -= 1 }
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
    des.save()
    des.font = 'bold 18px monospace'

    // Jogador 1 — topo esquerdo
    des.fillStyle = 'rgba(0,0,100,0.55)'
    des.fillRect(8, 8, 220, 60)
    des.fillStyle = '#7cf'
    des.fillText('J1 — W/S', 16, 28)
    des.fillStyle = 'white'
    des.fillText(`❤ ${Math.max(carro.vida, 0)}   ★ ${carro.pontos}`, 16, 54)

    // Jogador 2 — meio esquerdo
    des.fillStyle = 'rgba(100,0,0,0.55)'
    des.fillRect(8, 358, 220, 60)
    des.fillStyle = '#f88'
    des.fillText('J2 — ↑/↓', 16, 378)
    des.fillStyle = 'white'
    des.fillText(`❤ ${Math.max(carro2.vida, 0)}   ★ ${carro2.pontos}`, 16, 404)

    des.restore()
}

// ─── Game Over por pista ───
function gameOver(){
    if(carro.vida <= 0){
        des.save()
        des.fillStyle = 'rgba(0,0,80,0.75)'
        des.fillRect(300, 80, 620, 120)
        des.font = 'bold 48px monospace'
        des.fillStyle = '#7cf'
        des.textAlign = 'center'
        des.fillText('JOGADOR 1 — GAME OVER', 600, 155)
        des.restore()
    }
    if(carro2.vida <= 0){
        des.save()
        des.fillStyle = 'rgba(80,0,0,0.75)'
        des.fillRect(300, 430, 620, 120)
        des.font = 'bold 48px monospace'
        des.fillStyle = '#f88'
        des.textAlign = 'center'
        des.fillText('JOGADOR 2 — GAME OVER', 600, 505)
        des.restore()
    }
}

// ─── Desenha ───
function desenha(){
    desenhaDivisoria()

    // Inimigos superiores
    carroInimigo.des_carro()
    carroInimigo2.des_carro()
    carroInimigo3.des_carro()

    // Inimigos inferiores
    carroInimigoB.des_carro()
    carroInimigoB2.des_carro()
    carroInimigoB3.des_carro()

    // Jogadores
    carro.des_carro()
    carro2.des_carro()

    desenhaHUD()
    gameOver()
}

// ─── Atualiza ───
function atualiza(){
    if(carro.vida > 0){
        carro.mov_car()
        carroInimigo.mov_car()
        carroInimigo2.mov_car()
        carroInimigo3.mov_car()
    }
    if(carro2.vida > 0){
        carro2.mov_car()
        carroInimigoB.mov_car()
        carroInimigoB2.mov_car()
        carroInimigoB3.mov_car()
    }
    colisao()
    pontuacao()
}

// ─── Loop principal ───
function main(){
    des.clearRect(0, 0, 1200, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()

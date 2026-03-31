class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

    des_quad(){
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h, this.a)
    }

    des_carro() {
        // Roda dianteira esquerda
        des.beginPath()
        des.lineWidth = '5'
        des.strokeStyle = 'rgb(186, 186, 186)'
        des.fillStyle = 'darkorange'
        des.rect(this.x + 60, this.y - 50, 10, 10)
        des.stroke()
        des.fill()

        // Roda dianteira direita
        des.beginPath()
        des.rect(this.x + 60, this.y - 10, 10, 10)
        des.stroke()
        des.fill()

        // Roda traseira esquerda
        des.beginPath()
        des.rect(this.x + 10, this.y - 52, 10, 10)
        des.stroke()
        des.fill()

        // Roda traseira direita
        des.beginPath()
        des.rect(this.x + 10, this.y - 8, 10, 10)
        des.stroke()
        des.fill()

        // Trapézio do corpo
        des.beginPath()
        des.moveTo(this.x, this.y - 50)
        des.lineTo(this.x, this.y)
        des.lineTo(this.x + 50, this.y - 10)
        des.lineTo(this.x + 50, this.y - 40)
        des.closePath()
        des.lineWidth = '5'
        des.strokeStyle = 'rgb(186, 186, 186)'
        des.fillStyle = this.a
        des.stroke()
        des.fill()

        // Corpo frente
        des.beginPath()
        des.rect(this.x + 50, this.y - 40, 20, 30)
        des.stroke()
        des.fill()

        // Asa frontal
        des.beginPath()
        des.rect(this.x + 70, this.y - 50, 10, 50)
        des.stroke()
        des.fill()
    }
}

class Carro extends Obj{

    dir = 0
    vida = 5
    pontos = 0

    // Limites verticais da pista superior
    limiteMin = 10
    limiteMax = 295   // 345 - h(50)

    mov_car(){
        this.y += this.dir
        if(this.y < this.limiteMin){
            this.y = this.limiteMin
        } else if(this.y + this.h > this.limiteMax + this.h){
            this.y = this.limiteMax
        }
    }

    colid(objeto){
        if((this.x < objeto.x + objeto.w) &&
          (this.x + this.w > objeto.x) &&
          (this.y < objeto.y + objeto.h) &&
          (this.y + this.h > objeto.y)){
            return true
        } else {
            return false
        }
    }

    point(objeto){
        if(objeto.x <= -100){
            return true
        } else {
            return false
        }
    }
}

class Carro2 extends Obj{

    dir = 0
    vida = 5
    pontos = 0

    // Pista inferior
    limiteMin = 360
    limiteMax = 645   // 700 - h(55)

    mov_car(){
        this.y += this.dir
        if(this.y < this.limiteMin){
            this.y = this.limiteMin
        } else if(this.y + this.h > this.limiteMax + this.h){
            this.y = this.limiteMax
        }
    }

    colid(objeto){
        if((this.x < objeto.x + objeto.w) &&
          (this.x + this.w > objeto.x) &&
          (this.y < objeto.y + objeto.h) &&
          (this.y + this.h > objeto.y)){
            return true
        } else {
            return false
        }
    }

    point(objeto){
        if(objeto.x <= -100){
            return true
        } else {
            return false
        }
    }

    // Desenha o carro 2 espelhado (virado para a mesma direção)
    des_carro() {
        des.beginPath()
        des.lineWidth = '5'
        des.strokeStyle = 'rgb(186, 186, 186)'
        des.fillStyle = 'cyan'
        des.rect(this.x + 60, this.y - 50, 10, 10)
        des.stroke()
        des.fill()

        des.beginPath()
        des.rect(this.x + 60, this.y - 10, 10, 10)
        des.stroke()
        des.fill()

        des.beginPath()
        des.rect(this.x + 10, this.y - 52, 10, 10)
        des.stroke()
        des.fill()

        des.beginPath()
        des.rect(this.x + 10, this.y - 8, 10, 10)
        des.stroke()
        des.fill()

        des.beginPath()
        des.moveTo(this.x, this.y - 50)
        des.lineTo(this.x, this.y)
        des.lineTo(this.x + 50, this.y - 10)
        des.lineTo(this.x + 50, this.y - 40)
        des.closePath()
        des.lineWidth = '5'
        des.strokeStyle = 'rgb(186, 186, 186)'
        des.fillStyle = this.a
        des.stroke()
        des.fill()

        des.beginPath()
        des.rect(this.x + 50, this.y - 40, 20, 30)
        des.stroke()
        des.fill()

        des.beginPath()
        des.rect(this.x + 70, this.y - 50, 10, 50)
        des.stroke()
        des.fill()
    }
}

// ─── Velocidades por nível: [nível1, nível2, nível3] ───
const VELOCIDADES = [5, 10, 20]

function nivelVelocidade(pontos){
    if(pontos >= 3000) return 2
    if(pontos >= 600)  return 1 
    return 0
}

class CarroInimigo extends Obj{

    recomeca(yMin, yMax){
        this.x = 1300
        if(yMin !== undefined && yMax !== undefined){
            this.y = Math.floor(Math.random() * (yMax - yMin) + yMin)
        } else {
            this.y = Math.floor(Math.random() * (638 - 10) + 10)
        }
    }

    mov_car(pontos){
        const vel = VELOCIDADES[nivelVelocidade(pontos)]
        this.x -= vel
        if(this.x <= -200){
            this.recomeca()
        }
    }
}

class CarroInimigoSup extends CarroInimigo {
    recomeca(){
        this.x = 1300
        this.y = Math.floor(Math.random() * (345 - 10) + 10)
    }
}

class CarroInimigoInf extends CarroInimigo {
    // Inimigos da pista inferior (y de 355 a 638)
    recomeca(){
        this.x = 1300
        this.y = Math.floor(Math.random() * (638 - 355) + 355)
    }
}

class Estrada extends Obj{
    mov_est(pontos){
        const vel = VELOCIDADES[nivelVelocidade(pontos)] + 2
        this.x -= vel
        if(this.x < -60){
            this.x = 1300
        }
    }
}

// ─── Coletável de vida (soul.png) ───
class Coletavel extends Obj {

    ativo = true

    constructor(x, y, w, h, yMin, yMax) {
        super(x, y, w, h, null)
        this.yMin = yMin
        this.yMax = yMax
    }

    recomeca() {
        // Reaparece fora da tela com posição Y aleatória na pista
        this.x = 1400 + Math.floor(Math.random() * 600)
        this.y = Math.floor(Math.random() * (this.yMax - this.yMin) + this.yMin)
        this.ativo = true
    }

    mov(pontos) {
        if (!this.ativo) return
        const vel = VELOCIDADES[nivelVelocidade(pontos)]
        this.x -= vel
        if (this.x <= -100) {
            this.recomeca()
        }
    }
}

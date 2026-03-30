# 🐟 Jogo do Peixão

Jogo 2D para dois jogadores no navegador. Cada jogador controla um peixe em sua própria pista e deve desviar de pedras enquanto coleta corações para recuperar vida. O jogador que zerar a vida do adversário (sobrevivendo mais) vence.

---

## 🎮 Como Jogar

O canvas é dividido horizontalmente em duas pistas:

- **Jogador 1** joga na pista **superior**
- **Jogador 2** joga na pista **inferior**

### Controles

| Jogador | Mover para cima | Mover para baixo |
|---------|----------------|-----------------|
| Jogador 1 | `W` | `S` |
| Jogador 2 | `↑` | `↓` |

### Regras

- Pedras vêm da direita e devem ser desviadas
- Colidir com uma pedra remove **1 ponto de vida**
- Coletar um coração recupera **1 ponto de vida** (máximo: 5)
- O jogo termina quando um jogador chegar a **0 de vida**

---

## ⚡ Níveis e Dificuldade

A velocidade das pedras aumenta conforme a pontuação:

| Nível | Pontos necessários | Velocidade |
|-------|--------------------|------------|
| 1 | 0 | Lenta |
| 2 | 600 | Média |
| 3 | 3000 | Rápida |

O nível de cada jogador é calculado individualmente com base nos seus próprios pontos. O background da página muda conforme o maior nível entre os dois jogadores.

---

## 📁 Estrutura de Arquivos

```
├── index.html          # Menu principal
├── jogo.html           # Página do jogo
├── creditos.html       # Tutorial e créditos
├── win1.html           # Tela de vitória do jogador 1
├── win2.html           # Tela de vitória do jogador 2
│
├── index.js            # Lógica principal do jogo (loop, colisão, HUD)
├── main.css            # CSS das páginas fora do jogo
├── style.css           # CSS da página do jogo (canvas)
├── style2.css          # CSS da página de créditos
│
├── models/
│   └── Carro.js        # Classes: Obj, Carro, Carro2, CarroInimigo, Coletavel, Estrada
│
├── peixe.png           # Sprite do peixe (normal)
├── peixe_dmg.png       # Sprite do peixe (tomando dano)
├── pedra.png           # Sprite da pedra (inimigo)
├── soul.png            # Sprite do coração (coletável)
├── bonk.wav            # Som de colisão
│
├── lvl1_bg.jpg         # Background nível 1
├── lvl2_bg.jpg         # Background nível 2
└── lvl3_bg.jpg         # Background nível 3
```

---

## 🛠️ Tecnologias

- HTML5 Canvas
- JavaScript (ES6, orientação a objetos com classes)
- CSS3

Não requer instalação nem dependências externas. Basta abrir o `index.html` em um navegador.

---

## 👥 Créditos

| Função | Nome |
|--------|------|
| Programador | Pedro Caldart |
| Project Owner | Carlos Roberto (Prof-Carlos-Senai) |

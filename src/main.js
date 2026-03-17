'use strict'

// game configuration
const config = {
    parent: 'game',
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    scene: [ Play ],
}

// define game
let game = new Phaser.Game(config)

const w = game.config.width
const h = game.config.height

console.log(w, h)
//***************************************************
// CREATED BY: AYUSH BANDOPADHYAY, ERIC GONZALEZ
// ALL CODE DONE ON ONE COMPUTER, WE ARE ROOMMATES
//*************************************************** 

// COMPONENTS USED: Tween, Animation, Arcade Physics, Text Objects, Sound, Timer

// Credits to assets
// Background, Visuals, Characters: Ayush Bandopadhyay
// Font: Google Fonts: Kelly Slab
// Keyboard keycap assets by nartGraphic on Vecteezy.com
// Punch sound 1 by happy? on Youtube
// Punch sound 2 by Pixabay on Pixabay
// Woosh sound by floraphonic on Pixabay
// Sword sound by CPhT Fluke on Youtube
// Click sound from Mixkit
// Background Music: Royalty Free Doom Music by Jacob Lizotte

let config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.FIT,
    parent: 'gameCanvas',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    render: {
        pixelArt: true
    },
    width: 960,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60,
            debug: false
        }
    },
    scene: [ Load, Keys, Menu, Tutorial, Play, GameOver ]
}

const game = new Phaser.Game(config)
let { height, width } = game.config


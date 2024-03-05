let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 640,
    height: 480,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Tutorial, Play, GameOver ]
}

const game = new Phaser.Game(config)

let keyLEFT1, keyRIGHT1, keyATK1, keySPC1, keyLEFT2, keyRIGHT2, keyATK2, keySPC2 
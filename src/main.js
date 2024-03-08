let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 960,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Keys, Menu, Tutorial, Play, GameOver ]
}

const game = new Phaser.Game(config)


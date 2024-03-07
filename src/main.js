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
    scene: [ Load, Keys, Menu, Tutorial, Play, GameOver ]
}

const game = new Phaser.Game(config)


class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {
        //this.load.path = './assets/'

        //this.load.path = './assets/tilemaps/'

        //this.load.path = './assets/fonts/'
        //this.load.bitmapFont('pixeled-font', 'pixeled.png', 'pixeled.xml')

        //this.load.path = './assets/sounds/'
        //this.load.audio('jump-sfx', 'jump-temp.wav')
    }

    create() {
        // animation definitions

        this.scene.start('sceneKeys')
    }
}
class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {
        this.load.path = './assets/Img/'
        this.load.image('screen' ,'ScreenOut.png')
        this.load.image('sword', 'sword.png')
        this.load.image('W', 'W.png')
        this.load.image('A', 'A.png')
        this.load.image('S','S.png')
        this.load.image('D', 'D.png')
        this.load.image('UP', 'UP.png')
        this.load.image('DOWN', 'DOWN.png')
        this.load.image('LEFT', 'LEFT.png')
        this.load.image('RIGHT', 'RIGHT.png')

        //this.load.path = './assets/tilemaps/'

        this.load.path = './assets/fonts/'
        this.load.bitmapFont('reg', 'WhiteBone.png', 'WhiteBone.xml')
        this.load.bitmapFont('title-font', 'BoneFont.png', 'BoneFont.xml')
        this.load.image('M', 'M.png')
        this.load.image('B', 'B.png')


        //this.load.path = './assets/sounds/'
        //this.load.audio('jump-sfx', 'jump-temp.wav')
    }

    create() {
        // animation definitions

        this.scene.start('sceneKeys')
    }
}
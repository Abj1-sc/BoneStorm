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
        this.load.image('fly', 'fly.png')

        this.load.spritesheet('stage','FightStage.png', {
            frameWidth: 1956, 
            frameHeight: 1436
        })

        this.load.spritesheet('lava','lava.png', {
            frameWidth: 1904, 
            frameHeight: 1420
        })


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

        this.anims.create({
            key: 'stageLava',
            frameRate: 2,
            repeat: -1,
            repeatDelay: 3000,
            frames: this.anims.generateFrameNumbers('stage', { frames: [ 0, 1, 0]} )
        })

        this.anims.create({
            key: 'fallingLava',
            frameRate: 2,
            repeat: -1,
            repeatDelay: 3000,
            frames: this.anims.generateFrameNumbers('lava', { frames: [ 0, 1, 2, 0]} )
        })

        this.scene.start('sceneKeys')
    }
}
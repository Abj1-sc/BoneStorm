class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')
    }

    init() {
        this.PLAYER_VELOCITY = 250
    }

    create() {

        //get keybinds fron keys.js
        this.KEYS = this.scene.get('sceneKeys').KEYS


        // screen
        let screen = this.add.sprite(0, 0, 'screen').setOrigin(0).setDepth(2).setScale(1.5)


        // background, lava: #9e1502
        let stage = this.add.sprite(0, 0, 'stage', 0).setOrigin(0).setDepth(-2).setScale(.51)


        stage.anims.play('stageLava')


        // falling lava
        let lava = this.add.sprite(0, 0, 'lava', 0).setOrigin(0).setDepth(1).setScale(.51)


        this.time.delayedCall(1000, () => {
            lava.anims.play('fallingLava')
        })


        // flies
        let fly1 = this.add.sprite(this.game.config.width/5, -300, 'fly').setOrigin(0.5).setDepth(1).setScale(0.4)
        let fly2 = this.add.sprite(this.game.config.width*2/5 - 100, -300, 'fly').setOrigin(0.5).setDepth(1).setScale(0.4)
        let fly3 = this.add.sprite(this.game.config.width*3/5 + 100, -300, 'fly').setOrigin(0.5).setDepth(1).setScale(0.4)
        let fly4 = this.add.sprite(this.game.config.width*4/5, -300, 'fly').setOrigin(0.5).setDepth(1).setScale(0.4)

        let flyFall1 = this.tweens.add({
            targets: [fly1, fly3],
            y: {from: -300, to: this.game.config.height + 300},
            repeat: -1,
            duration: 4000
        })

        let flyFall2 = this.tweens.add({
            targets: [fly2, fly4],
            y: {from: -300, to: this.game.config.height + 300},
            paused: true,
            repeat: -1,
            delayedCall: 2000,
            duration: 4000
        })

        this.time.delayedCall(800, () => {
            flyFall2.play(true)
        })

       
        //define the animations
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('p1', {
                start: 1,
                end: 1
            })
        })


        this.anims.create({
            key: 'walk-left',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('p1', {
                start: 3,
                end: 5
            })
        })


        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('p1', {
                start: 6,
                end: 8
            })
        })


        
        //add character sprites
        //this.p1 = new P1(this, width / 4, height * 3 / 4, 'p1', 1)
        this.p1 = this.physics.add.sprite(width/4, height * 3 / 4, 'p1', 1).setScale(2)
        this.p1.body.setCollideWorldBounds(true)
        this.p1.body.setSize(32, 32).setOffset(8,16)

        this.p1Attack = false


        //this.p2 = new P1(this, width / 4, height * 3 / 4, 'p1', 1)
        this.p2 = this.physics.add.sprite(width * 3 / 4, height * 3 / 4, 'p1', 1).setScale(2)
        this.p2.body.setCollideWorldBounds(true)
        this.p2.body.setSize(32, 32).setOffset(8,16)

        this.p2Attack = false

        //collider
        this.physics.add.collider(this.p1.body, this.p2.body)


        // Fight Message
        let title = this.add.bitmapText(game.config.width/2, -300, 'title-font', 'FIGHT!!!!!!', 80).setOrigin(.5)

        let introTween = this.tweens.chain({
            targets: title,
            tweens: [
                {
                    y: {from: -300, to: game.config.height/2},
                    duration: 1500,
                    ease: 'Bounce.easeInOut',
                },
                {
                    delay: 1000,      
                    y: {from: this.game.config.height/2, to: -300},
                    duration: 1000,
                    ease: 'Linear.easeOut'
                }
            ]
        })

        // Health bars
        this.P1Health = this.add.sprite(215, 120, 'P1Health', 0).setScale(7).setDepth(1)
        this.P2Health = this.add.sprite(game.config.width - 220, 120, 'P2Health', 0).setScale(7).setDepth(1)

        let P1Label = this.add.bitmapText(132, 150, 'title-font', 'P1', 30).setOrigin(.5).setDepth(1)
        let P2Label = this.add.bitmapText(game.config.width - 135, 150, 'title-font', 'P2', 30).setOrigin(.5).setDepth(1)

        this.P1HealthCount = 10
        this.P2HealthCount = 10


        // fade in for everything

        let fadeIn = this.tweens.add({
            targets: [stage, this.P1Health, this.P2Health, P1Label, P2Label],
            duration: 2000,
            alpha: {from: 0, to: 1}
        })

    }


    update() {
        if (this.P1HealthCount <= 0){
            this.scene.start('sceneGameOver')
        }

        if (this.P2HealthCount <= 0){
            this.scene.start('sceneGameOver')
        }
        
        //this.p1.update()
        // do this every frame
        let p1Vector = new Phaser.Math.Vector2(0, 0)
        let p1Direction = 'down'


        //handle left and right
        if(this.KEYS.P1LEFT.isDown) {
            p1Vector.x = -1
            p1Direction = 'left'
        } else if(this.KEYS.P1RIGHT.isDown) {
            p1Vector.x = 1
            p1Direction = 'right'
        }

        if(this.KEYS.P1ATK.isDown && this.p1.x - this.p2.x  < 20) {
            p1Vector.x = 0
            this.P2HealthCount -= 1
        }


        //set player speed and direction
        this.p1.setVelocity(this.PLAYER_VELOCITY * p1Vector.x, this.PLAYER_VELOCITY * p1Vector.y)
        let p1Movement
        p1Vector.length() ? p1Movement = 'walk' : p1Movement = 'idle'
        this.p1.play(p1Movement + '-' + p1Direction, true)


        //this.p2.update()
        // do this every frame
        let p2Vector = new Phaser.Math.Vector2(0, 0)
        let p2Direction = 'down'


        //handle left and right
        if(this.KEYS.P2LEFT.isDown) {
            p2Vector.x = -1
            p2Direction = 'left'
        } else if(this.KEYS.P2RIGHT.isDown) {
            p2Vector.x = 1
            p2Direction = 'right'
        }

        if(this.KEYS.P2ATK.isDown && this.p1.x - this.p2.x  < 20) {
            p2Vector.x = 0
            this.P1HealthCount -= 1
        }


        //set player speed and direction
        this.p2.setVelocity(this.PLAYER_VELOCITY * p2Vector.x, this.PLAYER_VELOCITY * p2Vector.y)
        let p2Movement
        p2Vector.length() ? p2Movement = 'walk' : p2Movement = 'idle'
        this.p2.play(p2Movement + '-' + p2Direction, true)
    }
}

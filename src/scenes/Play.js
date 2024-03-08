class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')
    }

    create() {
        //init objects
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

        // // flies
        // let fly1 = this.add.sprite(this.game.width/5, -300, 'fly').setOrigin(0.5).setDepth(1)
        // let fly2 = this.add.sprite(this.game.width*2/5, -300, 'fly').setOrigin(0.5).setDepth(1)
        // let fly3 = this.add.sprite(this.game.width*3/5, -300, 'fly').setOrigin(0.5).setDepth(1)
        // let fly4 = this.add.sprite(this.game.width*4/5, -300, 'fly').setOrigin(0.5).setDepth(1)

        // let flyFall = this.tweens.add({
        //     targets: [fly1, fly3],
        //     y: {from: -300, to: this.game.height/2},
        //     repeat: -1,
        // })



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


        //
    }

    update() {
        // do this every frame
    }
}
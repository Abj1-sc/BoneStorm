class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')
    }

    create() {
        //init objects
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // screen
        let screen = this.add.sprite(0, 0, 'screen').setOrigin(0).setDepth(1).setScale(1.5)

        // background
        let stage = this.add.sprite(0, 0, 'stage').setOrigin(0).setDepth(-2).setScale(.51)

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
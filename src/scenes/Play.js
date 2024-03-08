class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')
    }

    create() {
        //init objects
        this.KEYS = this.scene.get('sceneKeys').KEYS

        // screen
        let screen = this.add.sprite(0, 0, 'screen').setOrigin(0).setDepth(1).setScale(1.5)

        // Fight Message
        let title = this.add.bitmapText(game.config.width/2, -300, 'title-font', 'FIGHT!!!!!!', 80).setOrigin(.5)

        let introTween = this.tweens.add({
            targets: title,
            y: {from: -300, to: game.config.height/2},
            duration: 1500,
            ease: 'Bounce.easeInOut',
        })
    }

    update() {
        // do this every frame
    }
}
/*
Keys is a persistent scene that allows keyboard input to be abstracted across all subsequent scenes.
Code solution from StinOfSin: https://phaser.discourse.group/t/configure-keyboard-inputs-once-for-all-scenes-to-use/10470/6
*/

class Keys extends Phaser.Scene {
    constructor() {
        super('sceneKeys')
    }

    create() {
        const { KeyCodes } = Phaser.Input.Keyboard
        this.KEYS = this.input.keyboard.addKeys({
            START: KeyCodes.SPACE,
            P1LEFT:   KeyCodes.A,
            P1RIGHT: KeyCodes.D,
            P1ATK:   KeyCodes.W,
            P2LEFT:   KeyCodes.LEFT,
            P2RIGHT: KeyCodes.RIGHT,
            P2ATK:   KeyCodes.UP,
        })

        // launch next scene so it will run concurrently with this one
        this.scene.launch('scenePlay')
    }
}
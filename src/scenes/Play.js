class Play extends Phaser.Scene {
    constructor() {
        super('scenePlay')
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

       
        //add character sprites
        this.p1 = new P1(this, width * 3/ 8, height * 5.8/11, 'p1', 1).setScale(4)
        this.p2 = new P2(this, width * 5/ 8, height * 5.8/11, 'p2', 1).setScale(4)

        this.PLAYER_VELOCITY = 200  

        //add character blocking ability variables
        this.p1blocking = false
        this.p1blockTime = 0

        this.p2blocking = false
        this.p2blockTime = 0

        //add punch counter so the players can't spam punches
        this.p1PunchCount = 3
        this.p2PunchCount = 3

        //lock player movement when they punch
        this.p1MoveLock = false
        this.p2MoveLock = false

        let timer = this.time.addEvent({
            delay: 3000,
            callback: this.addPunches,
            callbackScope: this,
            loop: true
        })
    

        //collider so the characters don't move past each other
        this.physics.add.collider(this.p1.body, this.p2.body, () => {
            
        })


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

        this.P1HealthCount = 0
        this.P2HealthCount = 0


        // fade in for everything
        let fadeIn = this.tweens.add({
            targets: [stage, this.P1Health, this.P2Health, P1Label, P2Label, this.p1, this.p2],
            duration: 2000,
            alpha: {from: 0, to: 1}
        })

        // punch sound
        this.punch = this.sound.add('Punch')
        this.swish = this.sound.add('swish')

    }

    update() {
        //check if a player was defeated
        if (this.p1.checkGameOver()){
            this.scene.start('sceneGameOver', 2)
        }
        if (this.p2.checkGameOver()){
            this.scene.start('sceneGameOver', 1)
        }

        //player 1 inputs
        //set animation to idle and stop character movement at the beginning of each frame
        let p1direction = 'down1'
        let p1movement = 'idle'
        this.p1.setVelocityX(0)

        //move left and right
        if(this.KEYS.P1LEFT.isDown && this.p1MoveLock == false) {
            this.p1.setVelocityX(-1 * this.PLAYER_VELOCITY)
            p1direction = 'left1'
        } else if(this.KEYS.P1RIGHT.isDown && this.p1MoveLock == false) {
            this.p1.setVelocityX(1 * this.PLAYER_VELOCITY)
            p1direction = 'right1'
        }

        if (p1direction == 'left1' || p1direction == 'right1') {
            p1movement = 'walk'
        }
        this.p1.play(p1movement + '-' + p1direction, true)

        //block attacks if the key is pressed and blocking hasn't been held for more than 2 seconds straight
        if (this.KEYS.P1BLOCK.isDown && this.p1blockTime < 120) {
            this.p1blocking = true
            this.p1blockTime += 1
            this.p1.setVelocityX(0)
            this.p1.anims.play('guard1')
        }
        //if block time exceeds 2 seconds, the player can no longer block
        if (this.p1blockTime >= 120) {
            this.p1blocking = false
        }
        //reset block time if they are not holding the key down
        if (!this.KEYS.P1BLOCK.isDown) {
            this.p1blockTime = 0
            this.p1blocking = false
        }

        //handle player attacking
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1ATK) && this.p1PunchCount > 0) {
            this.p1PunchCount -= 1
            this.p1.setFrame(5)
            this.time.delayedCall(100, () => {
                this.p1.anims.play('idle-down1')
            })
            if(Math.abs(this.p2.body.x - this.p1.body.x) <  370 && this.p2blocking == false) {
            this.p1.setVelocityX(0)
            this.punch.play()
            this.p2.subHealthCount()
            this.P2Health.setFrame(this.p2.getHealthCount())
            this.p2.x += 50
            } else {
                this.p1.setVelocityX(0)
                this.swish.play()
            }
            this.p1MoveLock = true
            let unlockP1 = this.time.addEvent({
                delay: 1000,
                callback: this.p1Unlock,
                callbackScope: this,
                loop: false
            })
        }

        //player 2 inputs
        //set animation to idle and stop character movement at the beginning of each frame
        let p2direction = 'down2'
        let p2movement = 'idle'
        this.p2.setVelocityX(0)

        //move left and right
        if(this.KEYS.P2LEFT.isDown && this.p2MoveLock == false) {
            this.p2.setVelocityX(-1 * this.PLAYER_VELOCITY)
            p2direction = 'left2'
        } else if(this.KEYS.P2RIGHT.isDown && this.p2MoveLock == false) {
            this.p2.setVelocityX(1 * this.PLAYER_VELOCITY)
            p2direction = 'right2'
        }
        if (p2direction == 'left2' || p2direction == 'right2') {
            p2movement = 'walk'
        }
        this.p2.play(p2movement + '-' + p2direction, true)

        //block attacks if the key is pressed and blocking hasn't been held for more than 2 seconds straight
        if (this.KEYS.P2BLOCK.isDown && this.p2blockTime < 120) {
            this.p2blocking = true
            this.p2blockTime += 1
            this.p2.setVelocityX(0)
            this.p2.play('guard2', true)
        }
        //if block time exceeds 2 seconds, the player can no longer block
        if (this.p2blockTime >= 120) {
            this.p2blocking = false
        }
        //reset block time if they are not holding the key down
        if (!this.KEYS.P2BLOCK.isDown) {
            this.p2blockTime = 0
            this.p2blocking = false
        }

        //handle player attacking
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P2ATK) && this.p2PunchCount > 0) {
            this.p2PunchCount -= 1
            this.p2.setFrame(4)
            this.time.delayedCall(100, () => {
                this.p2.anims.play('idle-down2')
            })
            if(Math.abs(this.p2.body.x - this.p1.body.x) < 370 && this.p1blocking == false) {
            this.p2.setVelocityX(0)
            this.punch.play()
            this.p1.subHealthCount()
            this.P1Health.setFrame(this.p1.getHealthCount())
            this.p1.x -= 50
            } else {
                this.p2.setVelocityX(0) 
                this.swish.play()
            }
            this.p2MoveLock = true
            let unlockP2 = this.time.addEvent({
                delay: 1000,
                callback: this.p2Unlock,
                callbackScope: this,
                loop: false
            })
        }
    }

    // punch cooldown or stamina
    addPunches() {
        this.p1PunchCount += 3
        this.p2PunchCount += 3
    }

    // movement lock for when punching or guarding
    p1Unlock() {
        this.p1MoveLock = false
    }

    p2Unlock() {
        this.p2MoveLock = false
    }
}

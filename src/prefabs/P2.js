class P2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)


        // define custom properties
        this.VELOCITY = 250


        this.body.setSize(this.width/2, this.height/2, false)
        this.body.setOffset(this.width/10, this.height/2)
        this.body.setCollideWorldBounds(true)
        //this.body.setMaxVelocity(this.MAX_VELOCITY_X, this.MAX_VELOCITY_Y)
       


        this.p1Vector = new Phaser.Math.Vector2(0, 0)
        this.p1Direction = 'down'
        //this.KEYS = this.scene.get('sceneKeys').KEYS
        //this.body.setDragX(this.DRAG)


    }


    create() {
        //get keybinds fron keys.js
        this.KEYS = this.scene.get('sceneKeys').KEYS


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
    }


    update() {
        // do this every frame
        this.p2Vector = new Phaser.Math.Vector2(0, 0)
        this.p2Direction = 'down'


        //handle left and right
        if(this.KEYS.P2LEFT.isDown) {
            this.p2Vector.x = -1
            this.p2Direction = 'left'
        } else if(this.KEYS.P2RIGHT.isDown) {
            this.p2Vector.x = 1
            this.p2Direction = 'right'
        }


        //set player speed and direction
        this.p2.setVelocity(this.VELOCITY * this.p2Vector.x, this.VELOCITY * this.p2Vector.y)
        this.p2Movement
        this.p2Vector.length() ? this.p2Movement = 'walk' : this.p2Movement = 'idle'
        this.p2.play(this.p2Movement + '-' + this.p2Direction, true)
    }
}

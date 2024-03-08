class BurgerBoss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, texture, frame = 0) {
        // invoke parent class and add to display list/physics world
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // define custom properties
        this.WALK_VELOCITY = 75
        this.MAX_VELOCITY_X = 150
        this.ACCELERATION = 250
        this.JUMP_VELOCITY = -350
        //this.DRAG = 350

        this.body.setSize(this.width/2, this.height/2, false)
        this.body.setOffset(this.width/10, this.height/2)
        this.body.setCollideWorldBounds(true)
        //this.body.setMaxVelocity(this.MAX_VELOCITY_X, this.MAX_VELOCITY_Y)
        
        //this.body.setDragX(this.DRAG)

    }

    create() {

    }

    update() {

    }
}

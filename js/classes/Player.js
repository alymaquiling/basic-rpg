import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);

    this.scene = scene;
    this.velocity = 160;

    this.scene.physics.world.enable(this);
    this.setImmovable(false);

    this.body.setCollideWorldBounds(true);
    this.scene.add.existing(this);

    this.scene.anims.create({
      key: "down",
      frames: this.scene.anims.generateFrameNumbers("schoolgirl", {
        start: 0,
        end: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers("schoolgirl", {
        start: 3,
        end: 5,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers("schoolgirl", {
        start: 6,
        end: 8,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "up",
      frames: this.scene.anims.generateFrameNumbers("schoolgirl", {
        start: 9,
        end: 11,
      }),
      frameRate: 15,
      repeat: -1,
    });
  }

  update(cursors) {
    this.body.setVelocity(0);
    if (cursors.left.isDown) {
      this.anims.play("left", true);
      this.body.setVelocityX(-this.velocity);
    } else if (cursors.right.isDown) {
      this.anims.play("right", true);
      this.body.setVelocityX(this.velocity);
    } else if (cursors.down.isDown) {
      this.anims.play("down", true);
      this.body.setVelocityY(this.velocity);
    } else if (cursors.up.isDown) {
      this.anims.play("up", true);
      this.body.setVelocityY(-this.velocity);
    } else {
      this.anims.stopOnRepeat();
      this.body.setVelocity(0);
    }
  }
}

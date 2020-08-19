import Phaser from "phaser";

import Player from "../classes/Player";
import Chest from "../classes/Chest";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.scene.launch("Ui");
    this.score = 0;
  }

  create() {
    this.createBackground();
    this.setBounds();
    this.createAudio();
    this.createChests();
    this.createPlayer();
    this.createEnemies();
    this.addCollisions();
    this.createInput();
  }

  update() {
    this.player.update(this.cursors);
  }

  createBackground() {
    var city = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "city"
    );

    let scaleX = this.cameras.main.width / city.width;
    let scaleY = this.cameras.main.height / city.height;
    let scale = Math.max(scaleX, scaleY);
    city.setScale(scale).setScrollFactor(0);
  }

  setBounds() {
    this.boundaries = this.physics.add.group();

    var boundaryList = [
      this.add.tileSprite(0, 0, this.cameras.main.width * 2, 100, "city"),
      this.add.tileSprite(25, 120, 320, 160, "city").setOrigin(0, 0),
      this.add.tileSprite(395, 115, 150, 160, "city").setOrigin(0, 0),
      this.add.tileSprite(255, 345, 350, 200, "city").setOrigin(0, 0),
      this.add.tileSprite(340, 325, 50, 25, "city").setOrigin(0, 0),
      this.add.tileSprite(410, 325, 80, 25, "city").setOrigin(0, 0),
      this.add.tileSprite(0, 280, 150, 235, "city").setOrigin(0, 0),
      this.add.tileSprite(0, 325, 220, 210, "city").setOrigin(0, 0),
      this.add.tileSprite(645, 120, 220, 425, "city").setOrigin(0, 0),
    ].map((boundary) => {
      var b = this.physics.add.existing(boundary);

      b.body.moves = false;
      b.setAlpha(0);
      return b;
    });

    this.boundaries.addMultiple(boundaryList);
  }

  createAudio() {
    this.chestPickup = this.sound.add("chestPickup");
  }

  createChests() {
    this.chests = this.physics.add.group();
    this.chestPositions = [
      [100, 100],
      [250, 95],
      [400, 100],
      [400, 300],
      [575, 200],
      [560, 300],
      [620, 300],
      [240, 500],
      [240, 400],
    ];

    this.maxNumberOfChests = 3;
    for (let i = 0; i < this.maxNumberOfChests; i++) {
      this.spawnChest();
    }
  }

  spawnChest() {
    const location = this.chestPositions[
      Math.floor(Math.random() * this.chestPositions.length)
    ];

    let chest = this.chests.getFirstDead();

    if (!chest) {
      const chest = new Chest(this, location[0], location[1], "chest");
      this.chests.add(chest);
    } else {
      chest.setPosition(location[0], location[1]);
      chest.makeActive();
    }
  }

  createEnemies() {
    this.enemies = this.physics.add.group();
    this.enemies.add(this.physics.add.sprite(500, 70, "enemy", 5));
    this.enemies.add(this.physics.add.sprite(500, 100, "enemy", 5));
    this.enemies.children.each((enemy) => enemy.setImmovable());
  }

  createPlayer() {
    this.player = new Player(this, 300, 100, "schoolgirl", 0);
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.enemies);
    this.physics.add.collider(this.player, this.boundaries);
    this.physics.add.overlap(
      this.player,
      this.chests,
      this.collectChest,
      null,
      this
    );
  }

  collectChest(player, chest) {
    this.chestPickup.play();
    this.score += Math.floor(Math.random() * 20) + 1;
    this.events.emit("updateScore", this.score);
    chest.makeInactive();
    this.time.delayedCall(1000, this.spawnChest, [], this);
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
}

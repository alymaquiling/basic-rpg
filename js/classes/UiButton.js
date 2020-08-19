import Phaser from "phaser";

export default class UiButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key, hoverKey, targetCallback) {
    super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.key = key;
    this.hoverKey = hoverKey;
    this.targetCallback = targetCallback;

    this.createButton();

    this.scene.add.existing(this);
  }

  createButton() {
    this.button = this.scene.add.image(0, 0, this.key);
    this.button.setScale(2);
    this.button.setInteractive();

    this.add(this.button);

    this.button.on("pointerover", () => {
      this.button.setTexture(this.hoverKey);
    });
    this.button.on("pointerout", () => {
      this.button.setTexture(this.key);
    });
    this.button.on("pointerdown", () => {
      this.targetCallback();
    });
  }
}

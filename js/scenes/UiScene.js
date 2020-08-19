export default class UiScene extends Phaser.Scene {
  constructor() {
    super("Ui");
  }

  init() {
    this.gameScene = this.scene.get("Game");
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    this.scoreText = this.add.text(680, 575, "Coins: 0", {
      fontSize: "20px",
      fill: "#3a303e",
      fontFamily: "gameFont",
    });
    this.coinIcon = this.add.image(663, 585, "items", 3);
  }
  setupEvents() {
    this.gameScene.events.on("updateScore", (score) => {
      this.scoreText.setText(`Coins: ${score}`);
    });
  }
}

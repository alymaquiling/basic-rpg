import UiButton from "../classes/UiButton";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }
  preload() {}
  create() {
    var urban = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "urban"
    );

    this.gameTitle = "Basic RPG";

    let scaleX = this.cameras.main.width / urban.width;
    let scaleY = this.cameras.main.height / urban.height;
    let scale = Math.max(scaleX, scaleY);
    urban.setScale(scale).setScrollFactor(0);

    this.highlightText = this.add.text(
      this.scale.width / 2 + 2,
      this.scale.height / 2 - 3,
      this.gameTitle,
      { fontSize: "72px", fill: "#a88a9a", fontFamily: "gameFont" }
    );
    this.highlightText.setOrigin(0.5);

    this.shadowText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 + 3,
      this.gameTitle,
      { fontSize: "72px", fill: "#28222b", fontFamily: "gameFont" }
    );
    this.shadowText.setOrigin(0.5);

    this.titleText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      this.gameTitle,
      { fontSize: "72px", fill: "#3a303e", fontFamily: "gameFont" }
    );
    this.titleText.setOrigin(0.5);

    this.gameStartButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.65,
      "button",
      "hoverButton",
      this.startScene.bind(this, "Game")
    );
  }
  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}

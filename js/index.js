import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import TitleScene from "./scenes/TitleScene";
import GameScene from "./scenes/GameScene";
import UiScene from "./scenes/UiScene";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [BootScene, TitleScene, GameScene, UiScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
};

var game = new Phaser.Game(config);

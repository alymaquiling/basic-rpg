import Phaser from "phaser";

import newFont from "../../assets/fonts/upheavtt.ttf";

import buttonImage from "../../assets/images/ui/play-button.png";
import hoverButtonImage from "../../assets/images/ui/play-button-2.png";
import chestImage from "../../assets/images/chest.png";
import schoolgirlSpritesheet from "../../assets/images/schoolgirl.png";
import enemySpritesheet from "../../assets/images/enemy.png";

import pickupSound from "../../assets/audio/Pickup.wav";

import cityBG from "../../assets/images/background/city.png";
import urbanBG from "../../assets/images/background/urban.png";
import items from "../../assets/images/ui/items.png";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.loadImages();
    this.loadSpriteSheets();
    this.loadAudio();
  }

  loadFont() {
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
  }

  loadImages() {
    this.load.image("city", cityBG);
    this.load.image("urban", urbanBG);
    this.load.image("button", buttonImage);
    this.load.image("hoverButton", hoverButtonImage);
    this.load.image("chest", chestImage);
  }

  loadSpriteSheets() {
    this.load.spritesheet("schoolgirl", schoolgirlSpritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("enemy", enemySpritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("items", items, { frameWidth: 32, frameHeight: 32 });
  }

  loadAudio() {
    this.load.audio("chestPickup", [pickupSound]);
  }

  create() {
    this.scene.start("Title");
  }
}

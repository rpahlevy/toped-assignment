import 'phaser';
import config from './Config/config';
import MainScene from './Scenes/MainScene';
import HatchScene from './Scenes/HatchScene';
 
class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Main', MainScene);
    this.scene.add('Hatch', HatchScene);
    this.scene.start('Main');
  }
}
 
window.game = new Game();
import 'phaser';

export default {
    type: Phaser.AUTO,
    width: 540,
    height: 960,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'phaser-example'
};
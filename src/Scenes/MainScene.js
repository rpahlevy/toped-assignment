import 'phaser';

export default class MainScene extends Phaser.Scene {

    constructor () {
        super('Main');
    }

    preload() {
        let svgConfig = { scale: 1.5 };

        this.load.image('background', 'assets/background.jpg');
        this.load.image('energy_panel', 'assets/energyPanel.png');
        this.load.image('btn_green1', 'assets/btn_green1.png');
        this.load.image('btn_grey', 'assets/btn_grey.png');
        this.load.image('btn_hatch', 'assets/btn_hatch.png');
        this.load.image('btn_tokopoint', 'assets/btn_tokopoint.png');
        this.load.image('progress_bar', 'assets/progress_bar.png');

        this.load.image('_preview1', 'assets/_preview1.png');

        this.load.image('board', 'assets/board.png');
        this.load.image('window', 'assets/window.png');
        this.load.svg('lamp', 'assets/lamp.svg', svgConfig);
        this.load.svg('nest', 'assets/nest.svg', svgConfig);
        this.load.svg('blue_egg', 'assets/blue_egg.svg', svgConfig);
        this.load.svg('leaf_left', 'assets/leaf_left.svg', svgConfig);
        this.load.spritesheet('char_idle', 'assets/char_idle.png', {
            frameWidth: 300,
            frameHeight: 300
        });
        this.load.spritesheet('char_excited', 'assets/char_excited.png', {
            frameWidth: 300,
            frameHeight: 300
        });
        this.load.spritesheet('electricity_big', 'assets/electricity_big.png', {
            frameWidth: 350,
            frameHeight: 540
        });

        // for hatch
        this.load.image('hatch_background', 'assets/egg_crack_background.png');
        this.load.image('_preview2', 'assets/_preview4.png');
        
        // this.load.svg('nest', 'assets/nest.svg', { scale: 3.75 });
        this.load.svg('popup_asset', 'assets/popupAsset.svg', { scale: 1.5 });
        this.load.image('shine', 'assets/shine.png');

        this.load.spritesheet('egg_crack', 'assets/egg_crack_matrix.png', {
            frameWidth: 340,
            frameHeight: 260
        });
        this.load.spritesheet('egg_hatch', 'assets/egg_hatch.png', {
            frameWidth: 340,
            frameHeight: 260
        });
        
        this.load.image('reward_text_panel', 'assets/reward_text_panel.png');
        this.load.image('panel_reward', 'assets/panel_reward.png');
        this.load.image('price_small', 'assets/price_small.png');
        this.load.image('btn_hatch', 'assets/btn_hatch.png');
        this.load.image('btn_tokopoint', 'assets/btn_tokopoint.png');
    }

    create() {
        let _width = 540;
        let _height = 960;

        this.add.image(_width/2, _height/2, 'background');

        // this.add.image(_width/2, _height/2, '_preview1').setAlpha(0.5);

        this.add.image(160, 318, 'board')
                            .setScale(0.75);
        this.add.image(400, 318, 'window')
                            .setScale(0.75);
        this.add.image(400, 440, 'lamp');
        this.add.image(400, 610, 'nest');

        const blue_egg = this.add.image(400, 565, 'blue_egg')
                            .setOrigin(0.5, 1);
        this.tweens.add({
            targets: blue_egg,
            ease: 'Linear',
            repeat: -1,
            repeatDelay: 100,
            yoyo: true,
            duration: 500,
            scaleX: 0.95,
            scaleY: 1.1,
        });

        const leaf_left = this.add.image(0-5, _height+5, 'leaf_left')
                            .setOrigin(0, 1);
        const leaf_right = this.add.image(_width+5, _height+5, 'leaf_left')
                            .setOrigin(1, 1)
                            .setFlipX(true);
        this.tweens.add({
            targets: [leaf_left, leaf_right],
            ease: 'Sine',
            repeat: -1,
            repeatDelay: 300,
            yoyo: true,
            hold: 300,
            duration: 500,
            props: {
                rotation: 0.03
            }
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('char_idle'),
            frameRate: 20,
        });
        this.anims.create({
            key: 'excited',
            frames: this.anims.generateFrameNumbers('char_excited'),
            frameRate: 20,
        });
        this.char = this.add.sprite(160, 520, 'char_idle')
                            .setScale(1.3);
        this.char.play({
            key: 'idle',
            repeat: -1
        });

        this.anims.create({
            key: 'electricity',
            frames: this.anims.generateFrameNumbers('electricity_big'),
            frameRate: 20,
        });

        // ui block
        this.btn_energy_clickable = true;
        this.add.image(_width/2, 0, 'energy_panel')
                            .setOrigin(0.5, 0)
                            .setScale(_width/527)
        this.btn_energy = this.add.image(_width/2, _height-100, 'btn_green1')
                            .setInteractive()
                            .on('pointerdown', () => {
                                if (!this.btn_energy_clickable) {
                                    return;
                                }
                                this.btn_energy_clickable = false;

                                // animate
                                this.tweens.add({
                                    targets: [this.btn_energy, this.btn_energy_tint, this.label_point],
                                    ease: 'Cubic',
                                    duration: 120,
                                    yoyo: true,
                                    scaleX: 0.95,
                                    scaleY: 0.95,
                                    onComplete: () => {
                                        this.use_energy = true;
                                    }
                                });
                                this.tweens.add({
                                    targets: this.btn_energy_tint,
                                    ease: 'Linear',
                                    duration: 120,
                                    yoyo: true,
                                    tint: 0xffffff,
                                });
                            });
        this.tweens.add({
            targets: this.btn_energy,
            ease: 'Cubic',
            duration: 300,
            repeat: -1,
            repeatDelay: 600,
            scaleX: 1.02,
            scaleY: 1.02,
            yoyo: true,
        });
        // cover tint
        this.btn_energy_tint = this.add.image(_width/2, _height-100, 'btn_green1')
                            .setTintFill(0xffffff)
                            .setAlpha(0);
        this.tweens.add({
            targets: this.btn_energy_tint,
            ease: 'Linear',
            duration: 600,
            repeat: -1,
            alpha: 0.3,
            yoyo: true,
        });
        
        // this.btn_energy.setTint(Phaser.Display.Color.GetColor(250,250,250));
        this.use_energy = false;
        this.energy_used = false;
        this.point = 100;
        this.point_diff = Math.round(this.point / 12);
        this.label_point = this.add.text(this.btn_energy.x, this.btn_energy.y, this.point, this.text_config('40px'))
                        .setOrigin(0.5);
        this.tweens.add({
            targets: this.label_point,
            ease: 'Cubic',
            duration: 300,
            repeat: -1,
            repeatDelay: 600,
            scaleX: 1.02,
            scaleY: 1.02,
            yoyo: true,
        });

        const rect = new Phaser.Geom.Rectangle(80, 46, 252, 30);
        this.progress_bar = this.add.image(81, 61, 'progress_bar')
                            .setOrigin(0, 0.5)
                            .setScale(0, 1);
    }

    update() {
        if (this.use_energy && !this.energy_used) {
            this.point -= this.point_diff;
            if (this.point < 0) {
                this.point = 0;
                this.energy_used = true;

                // change btn to grey
                this.btn_energy.setTexture('btn_grey');
                this.btn_energy_tint.setVisible(false);

                // play electricity
                const electricity_big = this.add.sprite(340, 660, 'electricity_big')
                            .setScale(0.55);
                electricity_big.play({
                    key: 'electricity'
                });

                // play progress bar
                this.tweens.add({
                    targets: this.progress_bar,
                    ease: 'Cubic',
                    duration: 300,
                    scaleX: 1,
                    onComplete: () => {
                        // character jump
                        this.char.setTexture('char_excited');
                        this.char.play({
                            key: 'excited',
                            repeat: -1,
                        });

                        // fade white
                        const white_cover = this.add.image(540/2, 960/2, 'background')
                                            .setTintFill(0xFFFFFF)
                                            .setAlpha(0);
                        this.tweens.add({
                            targets: white_cover,
                            ease: 'Linear',
                            duration: 500,
                            delay: 2000,
                            alpha: 1,
                            onComplete: () => {
                                // change scene
                                this.scene.start('Hatch');
                            }
                        });
                    }
                });
            }
            // "animate" point
            this.label_point.setText(this.point);
        }
    }

    // helper
    text_config(size, color='#fff', align='center') {
        return {
            fontFamily: 'Arial',
            fontSize: size,
            color: color,
            align: align,
        }
    }
}
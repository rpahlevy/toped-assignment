import 'phaser';

export default class HatchScene extends Phaser.Scene {

    constructor() {
        super('Hatch');
    }

    preload() {
        
    }

    create() {
        let _width = 540;
        let _height = 960;

        this.add.image(_width/2, _height/2, 'hatch_background');

        this.add.image(_width/2, _height-100, 'nest')
                            .setScale(2.45);
        this.shine = this.add.image(_width/2, _height-350, 'shine')
                            .setScale(0.35);
        this.tweens.add({
            targets: this.shine,
            ease: 'Sine',
            scale: 0.6,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        });

        this.anims.create({
            key: 'crack',
            frames: this.anims.generateFrameNumbers('egg_crack'),
            frameRate: 30,
        });
        this.anims.create({
            key: 'hatch',
            frames: this.anims.generateFrameNumbers('egg_hatch'),
            frameRate: 30,
        });
        this.egg = this.add.sprite(_width/2, _height-370, 'egg_crack')
                            .setScale(1.35);
        this.egg.play({
            key: 'crack'
        });
        this.egg.on('animationcomplete', () => {
            if (this.egg.anims.getName() == 'crack') {
                // play hatch
                this.egg.setTexture('egg_hatch');
                this.egg.play({
                    key: 'hatch'
                })
            } else {
                this.reward_text_panel.setVisible(false);
                this.show_panel_reward();
            }
        })

        // this.add.image(_width/2, _height/2, '_preview2').setAlpha(0.5);

        // ui block
        this.reward_text_panel = this.add.image(_width/2, 275, 'reward_text_panel');
        this.tweens.add({
            targets: this.reward_text_panel,
            ease: 'Sine',
            duration: 500,
            props: {
                y: 275-8
            },
            yoyo: true,
            repeat: -1
        });
    }

    update() {
        this.shine.rotation += 0.01;
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
    
    show_panel_reward() {
        let _width = 540;
        let _height = 960;

        this.overlay = this.add.image(_width/2, _height/2, 'hatch_background')
                            .setTintFill(0x000000)
                            .setAlpha(0);
        this.tweens.add({
            targets: this.overlay,
            ease: 'Linear',
            alpha: 0.5,
            duration: 300
        });

        
        const popup_asset = this.add.image(_width/2, _height/2-284, 'popup_asset')
                        .setScale(0)
                        .setAlpha(0);
        const panel_reward = this.add.image(_width/2, _height/2-50, 'panel_reward')
                        .setScale(0)
                        .setAlpha(0);
        const label_point = this.add.text(_width/2-110, _height/2+18, 100, this.text_config('40px', '#629EB7'))
                        .setOrigin(0.5)
                        .setScale(0)
                        .setAlpha(0);
        const btn_hatch = this.add.image(_width/2, _height/2+180, 'btn_hatch')
                        .setScale(0)
                        .setAlpha(0)
                        .setInteractive()
                        .on('pointerdown', () => {
                            // change scene
                            this.scene.start('Main');
                        });
        const btn_tokopoint = this.add.image(_width/2, _height/2+280, 'btn_tokopoint')
                        .setScale(0)
                        .setAlpha(0)
                        .setInteractive()
                        .on('pointerdown', () => {
                            // change scene
                            this.scene.start('Main');
                        });
        const panel_tween = this.tweens.add({
            targets: [popup_asset, panel_reward, label_point],
            paused: true,
            ease: 'Cubic',
            duration: 300,
            alpha: 1.0,
            scaleX: 1,
            scaleY: 1,
            onComplete: () => {
                btn_hatch_tween.play();
            }
        });
        const btn_hatch_tween = this.tweens.add({
            targets: btn_hatch,
            paused: true,
            ease: 'Back',
            // delay: 300,
            duration: 300,
            alpha: 1.0,
            scaleX: 1,
            scaleY: 1,
            onComplete: () => {
                btn_tokopoint_tween.play();
            }
        });
        const btn_tokopoint_tween = this.tweens.add({
            targets: btn_tokopoint,
            paused: true,
            ease: 'Back',
            // delay: 300,
            duration: 300,
            alpha: 1.0,
            scaleX: 1,
            scaleY: 1,
        });

        this.price_small = this.add.image(_width/2, _height-370, 'price_small');
        this.tweens.timeline({
            tweens: [{
                targets: this.price_small,
                ease: 'Ease',
                duration: 300,
                props: {
                    y: _height/2-205
                }
            }, {
                targets: this.price_small,
                ease: 'Linear',
                duration: 300,
                scaleX: 1.9,
                scaleY: 1.9,
                onComplete: () => {
                    panel_tween.play();
                }
            }, {
                targets: this.price_small,
                ease: 'Back',
                duration: 440,
                scaleX: 1.5,
                scaleY: 1.5,
            }]
        });
    }
}
function Player(game, level, x, y){
    this.game = game;
    this.level = level;
    this.x = x;
    this.y = y;
    this.init_x = x;
    this.init_y = y;
    this.sprite = null;
    this.health = 3;
	this.jumpTimer = 0;
	this.walking = false;
	this.jumping = false;
	this.attacking = false;
	this.camera = null;
	this.jumpAbility = true;
	this.moveAbility = true;
	this.chestOpen = true;
	this.attack_cd = 0;
	this.armored = false;
	this.armed = false;
	this.greyAvatar = false;
	this.isHit = false;
	this.lastRedFlash = 0;
	this.flashCount = 4;
	this.shop = null;
	this.create();
	
	
}

Player.prototype = {
    //create sprite here
    create: function(){

        this.sprite = this.game.add.sprite(this.x, this.y, 'player');
        this.sprite.smoothed = false;
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 1100;
        this.sprite.body.setSize(18, 64, 38, 0);
        this.camera = this.game.camera.follow(this.sprite);
        this.sprite.animations.add('unarmored_walk', [22, 23, 24, 25]);
		this.sprite.animations.add('unarmored_wepwalk', [28, 29, 30, 31]);
		this.sprite.animations.add('unarmored_wepidle', [26]);
		this.sprite.animations.add('unarmored_jump', [21]);
		this.sprite.animations.add('unarmored_wepjump', [27]);
        this.sprite.animations.add('unarmored_idle', [20]);
		this.sprite.animations.add('unarmored_attack', [16, 17, 18, 19]);
        this.sprite.animations.add('armored_walk', [12, 13, 14, 15]);
		this.sprite.animations.add('armored_wepwalk', [11, 10, 9, 8]);
		this.sprite.animations.add('armored_wepidle', [6]);
		this.sprite.animations.add('armored_jump', [5]);
		this.sprite.animations.add('armored_wepjump', [7]);
        this.sprite.animations.add('armored_idle', [4]);
		this.sprite.animations.add('armored_attack', [0, 1, 2, 3]);
		this.sprite.animations.add('grey_box', [32]);
        this.sprite.scale.setTo(3, 3);
        this.sprite.anchor.setTo(0.5, 0.5);
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.attackButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.openChests = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
		this.elements = [];
        this.inventory = this.game.add.group();
        this.attackbox = this.game.add.sprite(this.sprite.body.x + this.sprite.width * 0.4,
            this.sprite.body.y + this.sprite.body.height * 0.5, null);
        this.attackbox.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.attackbox);
        this.attackbox.body.immovable = true;
        this.attackbox.body.setSize(40, 32);
    },

    update: function(){

        this.game.physics.arcade.collide(this.sprite, this.level.wall);
		this.game.physics.arcade.overlap(this.sprite, this.level.chests, this.interact, null, this);

		this.sprite.body.velocity.x = 0;
		this.movement();
		if (this.attackButton.isDown){
			this.attack();
        }
        if(this.isHit){
            this.getHit();
        } else {
            this.flashCount = 4;
        }
	},

    movement: function(){

        if(this.greyAvatar){
            this.sprite.animations.play('grey_box');
        }

        this.walking = false;
        if (this.moveAbility && !this.attacking ) {
            if (this.cursors.left.isDown) {
                if(!this.armored&& !this.greyAvatar){
                    if(!this.armed){

                        this.sprite.animations.play('unarmored_walk', 5, true);

                    } else {

                        this.sprite.animations.play('unarmored_wepwalk', 5, true);

                    }
                } else if( !this.greyAvatar){
                    if(!this.armed){

                        this.sprite.animations.play('armored_walk', 5, true);

                    } else {

                        this.sprite.animations.play('armored_wepwalk', 5, true);

                    }
                }
                this.sprite.body.velocity.x = -250;
                if (this.sprite.scale.x > 0) {
                    this.sprite.scale.x *= -1;
                }
                this.walking = true;
            } else if (this.cursors.right.isDown) {
                if(!this.armored && !this.greyAvatar){
                    if(!this.armed){

                        this.sprite.animations.play('unarmored_walk', 5, true);

                    } else if(!this.greyAvatar) {

                        this.sprite.animations.play('unarmored_wepwalk', 5, true);

                    }
                } else if (!this.greyAvatar){
                    if(!this.armed){

                        this.sprite.animations.play('armored_walk', 5, true);

                    } else {

                        this.sprite.animations.play('armored_wepwalk', 5, true);

                    }
                }
                this.sprite.body.velocity.x = 250;
                if (this.sprite.scale.x < 0) {
                    this.sprite.scale.x *= -1;
                }
                this.walking = true;
            }

        }


        if(!this.walking && !this.jumping && !this.attacking && !this.greyAvatar){
            if(!this.armored){
                if(!this.armed && !this.greyAvatar){

                    this.sprite.animations.play('unarmored_idle');

                } else if (!this.greyAvatar){

                    this.sprite.animations.play('unarmored_wepidle');

                }
            } else if(!this.greyAvatar){
                if(!this.armed){

                    this.sprite.animations.play('armored_idle');

                } else {

                    this.sprite.animations.play('armored_wepidle');

                }
            }
        }
        if(this.jumping && !this.greyAvatar){
            if(!this.armored){
                if(!this.armed){
                this.sprite.animations.play('unarmored_jump');
                } else {
                    this.sprite.animations.play('unarmored_wepjump');
                }
            } else {
                if(!this.armed){
                this.sprite.animations.play('armored_jump');
                } else {
                    this.sprite.animations.play('armored_wepjump');
                }
            }
        }
        if(!this.sprite.body.onFloor() && !this.sprite.body.blocked.up){
            this.jumping = true;
        } else {
            this.jumping = false;
        }
        if (this.cursors.up.isDown && this.sprite.body.onFloor() && this.jumpAbility) {
            this.sprite.body.velocity.y = -600;
        }
        if (!this.sprite.body.onFloor() && this.cursors.right.isDown && !this.moveAbility){
            this.sprite.body.velocity.x = 250;
        }

        if (!this.sprite.body.onFloor() && this.cursors.left.isDown && !this.moveAbility){
            this.sprite.body.velocity.x = -250;
        }
	},
	
	interact: function(player, chest){
		if (this.openChests.isDown && !chest.isEmpty && this.chestOpen){
			chest.opened = true;
		}
	},
	
	attack: function (enemy){
		if(this.game.time.now - this.attack_cd >= 450 && !this.jumping && this.armed &&!this.greyAvatar){
            this.attack_cd = this.game.time.now;
			this.attacking = true;
			if(!this.armored){
				this.sprite.animations.play('unarmored_attack', 10, false);
			} else {
				this.sprite.animations.play('armored_attack', 10, false);

			}
        }

        this.attackbox.body.x = this.sprite.body.x + this.sprite.width * 0.35;
        this.attackbox.body.y = this.sprite.body.y + this.sprite.body.height * 0.4;
        var self = this;
        this.game.physics.arcade.overlap(this.attackbox, this.level.enemies, function (p, e) {
            e.health--;
            e.isHit = true;
            console.log(e.health);
        }, null, this);

        this.sprite.animations.currentAnim.onComplete.add(function () {
            this.attacking = false;
        }, this);
    },

    getHit: function(){
        if(this.game.time.now - this.lastRedFlash >= 150){
            this.lastRedFlash = this.game.time.now;
            this.sprite.tint = 0xff0000;
            this.flashCount--;
        } else {
            this.sprite.tint = 16777215;
        }
        if(this.flashCount === 0){
            this.isHit = false;
            this.sprite.tint = 16777215;
            if(this.health === 0){
                this.sprite.x = this.init_x;
                this.sprite.y = this.init_y;
                if(this.armored){
                    this.health = 5;
                } else {
                    this.health = 3;
                }
                for(var i=0; i<this.health; i++){
                    this.level.hearts.create(SCREEN_WIDTH * 0.23 + i * 32, SCREEN_HEIGHT*0.03, 'heart');
                }
                this.level.shop = null;
            }
        }
    }
    //all other functionalities here

};




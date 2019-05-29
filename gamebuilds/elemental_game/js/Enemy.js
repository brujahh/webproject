function Enemy(game, level, x, y){
    this.game = game;
    this.level = level;
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.reverse_cd = 0;
    this.hit_cd = 0;
    this.lastRedFlash = 0;
    this.flashCount = 4;
    this.create();
}

//create sprite here
Enemy.prototype = {

    create: function(){
        this.sprite = this.game.add.sprite(this.x, this.y, 'enemy');
        this.sprite.smoothed = false;
        this.sprite.health = 2;
        this.sprite.isHit = false;
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.gravity.y = 500;
        this.sprite.body.immovable = true;
        this.sprite.body.setSize(18, 48, 24, 16);
        this.sprite.scale.setTo(3, 3);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.animations.add('walk', [0, 1, 2, 3]);
        this.sprite.animations.add('attack', [1, 2]);
        this.sprite.animations.add('idle', [0]);

        this.attackbox = this.game.add.sprite(this.sprite.body.x + this.sprite.width * 0.3,
            this.sprite.body.y + this.sprite.body.height * 0.4, null);
        this.attackbox.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(this.attackbox);
        this.attackbox.body.immovable = true;
    },
//collision here
    update: function(player){
        this.sprite.body.velocity.x = 50 * this.sprite.scale.x;
        this.game.physics.arcade.collide(this.sprite, this.level.wall);
        this.game.physics.arcade.overlap(this.sprite, player.sprite);
        //if encountering 'reverse' object,
        this.level.tilemap.objects['spawners'].forEach(function(element) {
            if(element.name === "reverse"){
                if(this.sprite.body.x < element.x + element.width && this.sprite.body.x > element.x ||
                    this.sprite.body.x + this.sprite.body.width > element.x &&
                    this.sprite.body.x + this.sprite.body.width < element.x + element.width){
                        if(this.game.time.now - this.reverse_cd >= 1000){
                            this.reverse_cd = this.game.time.now;
                            this.reverse();
                        }
                }
            }
        }, this);
        //if player left/right of enemy, flip enemy and attack player
        if(Math.abs(this.sprite.body.x - player.sprite.body.x) < 160) {
            this.sprite.body.velocity.x = 0;
            if(this.sprite.body.x + this.sprite.body.width < player.sprite.body.x && this.sprite.scale.x < 0){

                this.sprite.scale.x *= -1;

            } else if(this.sprite.body.x > player.sprite.body.x + player.sprite.body.width && this.sprite.scale.x > 0){

                this.sprite.scale.x *= -1;
            }

            this.attack(player);

        } else {
            this.sprite.animations.play('walk', 5, true);
        }
        if(this.sprite.isHit){
            this.getHit();
        } else {
            this.flashCount = 4;
        }
    },

    reverse: function(){
        this.sprite.body.velocity.x *= -1;
        this.sprite.scale.x *= -1;


    },

    attack: function(player) {
        if (this.game.time.now - this.hit_cd >= 1500) {
            this.hit_cd = this.game.time.now;
            this.sprite.animations.play('attack', 5, false);
            if (this.sprite.animations.currentAnim.frame === 1) {
                var self = this;
                this.attackbox.body.x = this.sprite.body.x + this.sprite.width * 0.35;
                this.attackbox.body.y = this.sprite.body.y + this.sprite.body.height * 0.4;
                //if player hit, kill heart sprite and remove it from memory
                this.game.physics.arcade.overlap(this.attackbox, player.sprite, function (e, p) {
                    if(self.level.hearts.children.length !== 0){
                        player.health--;
                        self.level.hearts.children[self.level.hearts.children.length-1].kill();
                        self.level.hearts.remove(self.level.hearts.children[self.level.hearts.children.length-1]);
                        player.isHit = true;
                    }
                }, null, this);
                this.sprite.animations.currentAnim.onComplete.add(function () {
                    this.sprite.animations.play('idle')
                }, this);
            }
        }
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
            this.sprite.isHit = false;
            this.sprite.tint = 16777215;
            if(this.sprite.health <= 0){
                this.sprite.kill();
                this.level.enemies.remove(this.sprite);
                var index = this.level.enemy_objs.indexOf(this);
                this.level.enemy_objs.splice(index, 1);

            }
        }
    }
};
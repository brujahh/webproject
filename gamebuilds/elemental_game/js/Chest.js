function Chest(game, level, x, y, chesttype, elementname){
    this.game = game;
    this.level = level;
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.opened = false;
    this.isEmpty = false;
    this.element = null;
    this.elements = ['actions', 'avatar', 'balance', 'feedback', 'progress', 'luck', 'art', 'levels', 'challenges'];
	this.elementname = elementname;
    this.points = '250';
    this.chest_type = chesttype;
    this.item = null;
    this.float_cd = 0;
    this.counter = 0;
    this.create();

}

Chest.prototype = {

    create: function(){
        this.sprite = this.game.add.sprite(this.x, this.y, 'chests');
        this.sprite.differentiate = false;
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = 500;
        var rand = Math.floor((Math.random() * 2) + 1);
        //differentiate chests: echest = element chest, chest = score chest
        this.sprite.animations.add('chest', [0]);
        this.sprite.animations.add('chest_open', [1]);
        this.sprite.animations.add('echest', [2]);
        this.sprite.animations.add('echest_open', [3]);
        if(this.chest_type === 'elementchest'){
            if(this.elementname === 'lock' || this.elementname === 'shop' || this.elementname === 'jump' ||
                this.elementname === 'move'){
                this.item = 'actions';
            }
            else if(this.elementname === 'art' || this.elementname === 'text'){
                this.item = 'art';
            }
            else if(this.elementname === 'avatar'){
                this.item = 'avatar';
            }
            else if(this.elementname === 'noArmor' || this.elementname === 'noSword' ||
                this.elementname === 'enemySpawn' || this.elementname === 'armor' || this.elementname === 'sword' ||
                this.elementname === 'getElements'){
                this.item = 'balance';
            }
            else if(this.elementname === 'timer' || this.elementname === 'health' ||
                this.elementname === 'points'){
                this.item = 'feedback';
            }
            else if(this.elementname === 'allempty' || this.elementname === 'zeropoints'){
                this.item = 'progress';
            }
            else if(this.elementname === 'levels'){
                this.item = 'levels';
            }
            else if(this.elementname === 'enemyKill' || this.elementname === 'freeze'){
                this.item = 'challenges';
            }
            else if(this.elementname === 'luck'){
                this.item = 'luck';
            }

            if(this.sprite.differentiate){
                this.sprite.animations.play('echest');
            } else {
                this.sprite.animations.play('chest');
            }
        } else if(this.chest_type === 'scorechest'){
            this.item = this.points;
            this.sprite.animations.play('chest');
        }
        console.log(this.item);
        this.sprite.body.immovable = true;
        this.sprite.locked = false;


    },

    update: function(player){
        this.game.physics.arcade.collide(this.sprite, this.level.wall);
        if(this.sprite.opened && !this.sprite.locked && !this.isEmpty){
            this.sprite.body.gravity.y = 0;
            if(this.item.slice(2, 3) === '0' || this.item.slice(0,1) === '0'){
                this.setScore();
                this.sprite.animations.play('chest_open');
            } else {
                this.giveItem(player);
                if(this.sprite.differentiate){
                    this.sprite.animations.play('echest_open');
                } else {
                    this.sprite.animations.play('chest_open');
                }
            }
                this.isEmpty = true;

        }
        if(this.game.time.now - this.float_cd >= 1000 && this.isEmpty && this.counter <= 1) {
            this.float_cd = this.game.time.now;
            if (this.counter === 1) {
                if(this.item.slice(2, 3) === '0'){
                    this.scoreFloat.kill();
                    this.scoreFloat = null;
                } else {
                    this.element.floatelement.kill();
                    this.element.floatelement = null;
                }
            }
            this.counter = Number(this.counter) + 1;
        }
        /*if(this.sprite.locked){
            if(this.item.slice(2, 3) === '0'){
                this.sprite.animations.play('chest_locked');
            } else {
                if(this.sprite.differentiate){
                    this.sprite.animations.play('echest_locked');
                } else {
                    this.sprite.animation.play('chest_locked');
                }
            }
        } */
        if(!this.sprite.opened && !this.sprite.locked){
            if(this.item.slice(2, 3) === '0' || this.item.slice(0, 1) === '0'){
                this.sprite.animations.play('chest');
            } else {
                if(this.sprite.differentiate){
                    this.sprite.animations.play('echest');
                } else {
                    this.sprite.animations.play('chest');
                }
            }
        }
    },

    setScore: function(){
        SCORE = Number(SCORE) + Number(this.item);
        this.level.scoresprite.setText("Score: " + SCORE);
        this.scoreFloat = this.game.add.text(this.sprite.x + this.sprite.width / 2,
            this.sprite.y, this.item, {fill: '#d5aa00'});
        this.game.physics.arcade.enable(this.scoreFloat);
        this.scoreFloat.body.velocity.y = -150;
    },

    giveItem: function(player){
        this.element = new Element(player.inventory.length * 35 + 35, 100, this.item, this.game, this.level,
            this.elementname, this);
        this.element.floatelement.body.velocity.y = -150;
        player.elements.push(this.element);
        player.inventory.add(this.element.sprite);
    }

};
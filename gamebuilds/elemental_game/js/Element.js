function Element(x, y, name, game, level, elementname, chest){

    this.x = x;
    this.y = y;
    this.category = name;
    this.game = game;
    this.level = level;
	this.elementname = elementname;
	this.chest = chest;
	this.levelCD = 0;
	this.tooltip = null;
    this.create();
	


}

Element.prototype = {

    create: function(){
        console.log(this.elementname);
        this.floatelement = this.game.add.sprite(this.chest.sprite.x + this.chest.sprite.width / 4,
            this.chest.sprite.y, this.category);
        this.game.physics.arcade.enable(this.floatelement);
        this.floatelement.scale.setTo(0.75, 0.75);

        this.sprite = this.game.add.sprite(this.x, this.y, this.category);
        this.sprite.smoothed = false;
        this.sprite.fixedToCamera = true;
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputOver.add(this.over, this);
        this.sprite.events.onInputOut.add(this.out, this);
        this.sprite.scale.setTo(0.5, 0.5);
        if(this.category === 'actions'){
            this.floatelement.animations.add('lock', [0]);
            this.floatelement.animations.add('shop', [1]);
            this.floatelement.animations.add('jump', [2]);
            this.floatelement.animations.add('move', [3]);

            this.sprite.animations.add('lock', [0]);
            this.sprite.animations.add('shop', [1]);
            this.sprite.animations.add('jump', [2]);
            this.sprite.animations.add('move', [3]);
            this.actions();
        } else if(this.category === 'art'){
            this.floatelement.animations.add('art', [0]);
            this.floatelement.animations.add('text', [1]);

            this.sprite.animations.add('art', [0]);
            this.sprite.animations.add('text', [1]);
            this.art();
        } else if(this.category === 'avatar'){
            this.floatelement.animations.add('avatar', [0]);

            this.sprite.animations.add('avatar', [0]);
            this.avatar();
        } else if(this.category === 'balance'){
            this.floatelement.animations.add('armor', [0]);
            this.floatelement.animations.add('noArmor', [1]);
            this.floatelement.animations.add('noSword', [2]);
            this.floatelement.animations.add('enemySpawn', [3]);
            this.floatelement.animations.add('sword',[4]);
            this.floatelement.animations.add('getElements', [5]);

            this.sprite.animations.add('armor', [0]);
			this.sprite.animations.add('noArmor', [1]);
            this.sprite.animations.add('noSword', [2]);
			this.sprite.animations.add('enemySpawn', [3]);
			this.sprite.animations.add('sword',[4]);
			this.sprite.animations.add('getElements', [5]);
            this.balance();
        } else if(this.category === 'feedback'){
            this.floatelement.animations.add('timer', [0]);
            this.floatelement.animations.add('points', [1]);
            this.floatelement.animations.add('health', [2]);

            this.sprite.animations.add('timer', [0]);
            this.sprite.animations.add('points', [1]);
            this.sprite.animations.add('health', [2]);
            this.feedback();
        } else if(this.category === 'levels'){
            this.floatelement.animations.add('levels', [0]);

            this.sprite.animations.add('levels', [0]);
            this.levels();
        } else if(this.category === 'challenges'){
            this.floatelement.animations.add('enemyKill', [0]);
            this.floatelement.animations.add('freeze', [1]);

            this.sprite.animations.add('enemyKill', [0]);
            this.sprite.animations.add('freeze', [1]);
            this.challenge();
        }
        else if(this.category === 'luck'){
            this.floatelement.animations.add('luck', [0]);

            this.sprite.animations.add('luck', [0]);
            this.luck();

        } else if(this.category === 'progress'){
            this.floatelement.animations.add('allempty', [0]);
            this.floatelement.animations.add('zeropoints', [1]);

            this.sprite.animations.add('allempty', [0]);
            this.sprite.animations.add('zeropoints', [1]);
            this.progress();
        } else if(this.category === 'scoreboard'){
            this.scoreboard();
        }

        this.floatelement.animations.play(this.elementname);
	},

    //krister
    actions: function(){
        if (this.elementname === 'move'){
            this.sprite.animations.play('move');
            this.level.player.moveAbility = false;

        } else if (this.elementname === 'jump') {
            this.sprite.animations.play('jump');
            this.level.player.jumpAbility = false;

        } else if(this.elementname === 'lock'){
            this.sprite.animations.play('lock');
            this.level.chests.forEach(function(chest){
                chest.locked = true;
            });

        } else if (this.elementname === 'shop'){
            this.sprite.animations.play('shop');
            this.level.canShop = false;
        }
    },
	//DONE

    art: function(){
        //UI is low quality
		if (this.elementname === 'art') {
			this.level.timeframe.destroy();
			this.level.timesprite.font = 'Times New Roman';
			this.level.scoresprite.font = 'Times New Roman';
			this.level.scoreframe.destroy();
		}
		//DONE
    },
    //krister
    avatar: function(){
	    //low leveled avatar
		if (this.elementname === 'avatar') {
			this.sprite.animations.play('avatar');
			this.level.player.greyAvatar = true;
		}
    },

    balance: function(){
       
		if(this.elementname === 'noArmor'){
		    this.sprite.animations.play('noArmor');
            this.level.player.armored = false;
            if(this.level.player.health > 3){
                for(i = 0; i < this.level.player.health - 3; i++){
                    this.level.hearts.children[this.level.hearts.children.length-1].kill();
                    this.level.hearts.remove(this.level.hearts.children[this.level.hearts.children.length-1]);
                }
                this.level.player.health = 3;

            }
        }
        else if (this.elementname === 'noSword'){
            this.sprite.animations.play('noSword');
            this.level.player.armed = false;

        }
        else if(this.elementname === 'sword'){
            this.sprite.animations.play('sword');
            this.level.player.armed = true;
        }
        else if(this.elementname === 'armor'){
            this.sprite.animations.play('armor');
            this.level.player.armored = true;
            this.level.player.health = Number(this.level.player.health) + 2;
            for(var i=this.level.player.health-2; i<this.level.player.health; i++){
                this.level.hearts.create(SCREEN_WIDTH * 0.23 + i * 32, SCREEN_HEIGHT*0.03, 'heart');
            }
        }
        else if (this.elementname === 'enemySpawn'){
            this.sprite.animations.play('enemySpawn');
            this.level.tilemap.objects['spawners'].forEach(function(element){
                if(element.name === "enemy"){
                    var enemy = new Enemy(this.game, this.level, element.x, element.y);
                    this.level.enemy_objs.push(enemy);
                    this.level.enemies.add(enemy.sprite);

                }
            }, this);
        }
        else if(this.elementname === 'getElements'){
            this.sprite.animations.play('getElements');
            //choose from items displayed in shop (open shop, 0 price??)
        }

    },

    //richard
    challenge: function(){
        if(this.elementname === 'freeze'){
            this.sprite.animations.play('freeze');
            this.level.timerStopped = true;
        } else if (this.elementname === 'enemyKill'){
            this.sprite.animations.play('enemyKill');
            this.level.enemies.destroy();
            this.level.enemies = this.game.add.group();
            this.level.enemy_objs = [];
        }
        //timer is stopped
        //All NPCs removed
		//DONE
		
    },

    feedback: function(){
        // health bar removed
        // timer removed(still ticking)
        // points removed
        if(this.elementname === 'timer'){
            this.sprite.animations.play('timer');
            this.level.timesprite.kill();
        } else if(this.elementname === 'points'){
            this.sprite.animations.play('points');
            this.level.scoresprite.kill();
        } else if(this.elementname === 'health'){
            this.sprite.animations.play('health');
            this.level.hearts.forEachAlive(function(heart){
                heart.kill();
            });
        }
    },

    //richard
    levels: function(){
        this.sprite.animations.play('levels');
        // all levels are same
    },

    luck: function(){
        //chests with points and elements differentiated
		if (this.elementname === 'luck') {
			this.sprite.animations.play('luck');
			this.level.chests.forEachAlive(function(chest){
				chest.differentiate = true;
			});
		}
    },

    //richard
    progress: function(){
		//all chests become empty: DONE
        //no more points awarded: DONE: 
		//Level peab jätkuma. mõlemad suudavad takistada edasi liikumist.

		if(this.elementname === 'allempty'){
            this.sprite.animations.play('allempty');
            this.level.chest_objs.forEach(function(chest){
                if (chest.item.slice(2, 3) === "0") {
                    chest.item = '000';
                } else {
                    chest.item = '';
                }
			
			});
        } else if (this.elementname === 'zeropoints'){
            this.sprite.animations.play('zeropoints');
		    this.level.chest_objs.forEach(function(c){
                if (c.item.slice(2, 3) === "0") {
                    c.item = '000';
                }
			});
			
			setTimeout(function(){ this.game.state.start('Game') }, 5000);
		}
	},

    scoreboard: function(){
        //scoreboard removed
    },

    over: function(){
        console.log(this.level.player.inventory.length);
        if(this.elementname === 'armor'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Player is armored.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'sword'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Player is armed.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'getElements'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Take back elements for free.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'levels'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'All levels become the same.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'enemyKill'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'All enemies are slain.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'freeze'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Timer is stopped.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'luck'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Chests are differentiated', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'lock'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Cannot collect items.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'shop'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Cannot shop.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'jump'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Cannot jump.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'move'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Cannot move.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'art'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'UI becomes uglier', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'avatar'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                "Player's avatar replaced with grey square", {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'text'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Text replaces icons in shop.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'noArmor'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'No armor.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'noSword'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'No sword.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'enemySpawn'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Enemies are spawned.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'timer'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Timer removed from UI.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'health'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Health bar removed from UI.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'points'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Score is removed from UI.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'allempty'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'All chests become empty.', {font:"20px Alagard", fill: '#d5aa00'});
        } else if(this.elementname === 'zeropoints'){
            this.tooltip = this.game.add.text(35, 100 + this.sprite.height,
                'Chests award 0 points.', {font:"20px Alagard", fill: '#d5aa00'});
        }
        this.tooltip.fixedToCamera = true;
    },

    out: function(){
        this.tooltip.kill();
        this.tooltip = null;
    }
};
function Shop(game, level){
	this.game = game;
	this.level = level;
	this.shopgroup = this.game.add.group();
	this.shopgroup.fixedToCamera = true;
	this.shopElements = this.game.add.group();
	this.shopElements.fixedToCamera = true;

	this.goodElements = ['armor', 'sword', 'getElements', 'levels', 'enemyKill', 'freeze', 'luck'];
	this.badElements = ['lock', 'shop', 'jump', 'move', 'art', 'text', 'avatar', 'noArmor', 'noSword', 'enemySpawn',
                        'timer', 'health', 'points', 'allempty', 'zeropoints'];
	this.actionGroup = this.game.add.group();
	this.artGroup = this.game.add.group();
	this.avatarGroup = this.game.add.group();
	this.balanceGroup = this.game.add.group();
	this.challengeGroup = this.game.add.group();
	this.feedbackGroup = this.game.add.group();
	this.levelsGroup = this.game.add.group();
	this.luckGroup = this.game.add.group();
	this.progressGroup = this.game.add.group();
    this.actionGroup.fixedToCamera = true;
    this.artGroup.fixedToCamera = true;
    this.avatarGroup.fixedToCamera = true;
    this.balanceGroup.fixedToCamera = true;
    this.challengeGroup.fixedToCamera = true;
    this.feedbackGroup.fixedToCamera = true;
    this.levelsGroup.fixedToCamera = true;
    this.luckGroup.fixedToCamera = true;
    this.progressGroup.fixedToCamera = true;
	this.create();
}

Shop.prototype = {
	
	create: function(){
        this.shop = this.shopgroup.create(SCREEN_WIDTH*0.1, SCREEN_HEIGHT*-0.1, 'shop');
		this.shop.scale.set(9, 6.5);
		this.exit = this.shopgroup.create(SCREEN_WIDTH*0.813, SCREEN_HEIGHT*0.02, 'exit');
        this.title = this.shopgroup.create(SCREEN_WIDTH*0.45, SCREEN_HEIGHT*0.02, 'shoptitle');
		
		this.action = this.shopElements.create(SCREEN_WIDTH*0.25, SCREEN_HEIGHT*0.17, 'shopbtns');
        this.action.animations.add('action', [0]);
        this.action.animations.play('action');
        this.art = this.shopElements.create(SCREEN_WIDTH*0.45, SCREEN_HEIGHT*0.17, 'shopbtns');
        this.art.animations.add('art', [1]);
        this.art.animations.play('art');
        this.avatar = this.shopElements.create(SCREEN_WIDTH*0.65, SCREEN_HEIGHT*0.17, 'shopbtns');
        this.avatar.animations.add('avatar', [2]);
        this.avatar.animations.play('avatar');
        this.balance = this.shopElements.create(SCREEN_WIDTH*0.25, SCREEN_HEIGHT*0.4, 'shopbtns');
        this.balance.animations.add('balance', [3]);
        this.balance.animations.play('balance');
        this.challenges = this.shopElements.create(SCREEN_WIDTH*0.45, SCREEN_HEIGHT*0.4, 'shopbtns');
        this.challenges.animations.add('challenges', [4]);
        this.challenges.animations.play('challenges');
        this.feedback = this.shopElements.create(SCREEN_WIDTH*0.65, SCREEN_HEIGHT*0.4, 'shopbtns');
        this.feedback.animations.add('feedback', [5]);
        this.feedback.animations.play('feedback');
        this.levels = this.shopElements.create(SCREEN_WIDTH*0.25, SCREEN_HEIGHT*0.62, 'shopbtns');
        this.levels.animations.add('levels', [6]);
        this.levels.animations.play('levels');
        this.luck = this.shopElements.create(SCREEN_WIDTH*0.45, SCREEN_HEIGHT*0.62, 'shopbtns');
        this.luck.animations.add('luck', [7]);
        this.luck.animations.play('luck');
        this.progress = this.shopElements.create(SCREEN_WIDTH*0.65, SCREEN_HEIGHT*0.62, 'shopbtns');
        this.progress.animations.add('progress', [8]);
        this.progress.animations.play('progress');
        /*
        var amount = 1;
        this.level.player.elements.forEach(function(element){
            console.log('element');
            if(this.badElements.indexOf(element.elementname) > -1){
                if(element.elementname === 'lock' || element.elementname === 'shop' || element.elementname === 'jump' ||
                    element.elementname === 'move'){
                    element.sprite.x = SCREEN_WIDTH*0.25 + ((this.actionGroup.length + 1) * element.sprite.width);
                    element.sprite.y = SCREEN_HEIGHT*0.2;
                    this.actionGroup.add(element.sprite);
                }
                else if(element.elementname === 'art' || element.elementname === 'text'){
                    element.sprite.x = SCREEN_WIDTH*0.45 + ((this.artGroup.length + 1) * element.sprite.width);
                    element.sprite.y = SCREEN_HEIGHT*0.2;
                    this.artGroup.add(element.sprite);
                }
                else if(element.elementname === 'avatar'){
                    element.sprite.x = SCREEN_WIDTH*0.65 + ((this.avatarGroup.length + 1) * element.sprite.width);
                    element.sprite.y = SCREEN_HEIGHT*0.2;
                    this.avatarGroup.add(element.sprite);
                }
                else if(element.elementname === 'noArmor' || element.elementname === 'noSword' ||
                    element.elementname === 'enemySpawn'){
                    element.sprite.x = SCREEN_WIDTH*0.25 + ((this.balanceGroup.length + 1) * element.sprite.width);
                    element.sprite.y = SCREEN_HEIGHT*0.45;
                    this.balanceGroup.add(element.sprite);
                }
                else if(element.elementname === 'timer' || element.elementname === 'health' ||
                    element.elementname === 'points'){
                    element.sprite.x = SCREEN_WIDTH*0.65 + ((this.feedbackGroup.length + 1) * element.sprite.width);
                    element.sprite.y = SCREEN_HEIGHT*0.45;
                    this.feedbackGroup.add(element.sprite);
                }
                else if(element.elementname === 'allempty' || element.elementname === 'zeropoints'){
                    element.sprite.x = SCREEN_WIDTH*0.65 + ((this.progressGroup.length + 1) * element.sprite.width);
                    element.sprite.y = SCREEN_HEIGHT*0.65;
                    this.progressGroup.add(element.sprite);
                }
             }
            if(amount !== 0){
                if(this.goodElements.indexOf(element.elementname) > -1){
                    amount--;
                    if(element.elementname === 'armor' || element.elementname === 'sword' ||
                        element.elementname === 'getElements'){

                        element.sprite.x = SCREEN_WIDTH*0.25 + ((this.actionGroup.length + 1) * element.sprite.width);
                        element.sprite.y = SCREEN_HEIGHT*0.2;
                        this.actionGroup.add(element.sprite);
                    }
                    else if(element.elementname === 'levels'){

                        element.sprite.x = SCREEN_WIDTH*0.25 + ((this.levelsGroup.length + 1) * element.sprite.width);
                        element.sprite.y = SCREEN_HEIGHT*0.65;
                        this.levelsGroup.add(element.sprite);
                    }
                    else if(element.elementname === 'enemyKill' || element.elementname === 'freeze'){

                        element.sprite.x = SCREEN_WIDTH*0.45 + ((this.challengeGroup.length + 1) * element.sprite.width);
                        element.sprite.y = SCREEN_HEIGHT*0.45;
                        this.challengeGroup.add(element.sprite);

                    }
                    else if(element.elementname === 'luck'){

                        element.sprite.x = SCREEN_WIDTH*0.45 + ((this.luckGroup.length + 1) * element.sprite.width);
                        element.sprite.y = SCREEN_HEIGHT*0.65;
                        this.luckGroup.add(element.sprite);
                    }
                }
            }
        }, this);
        */
		this.exit.inputEnabled = true;
		this.exit.events.onInputDown.add(this.close, this);
		this.exit.events.onInputOver.add(this.over, this);
		this.exit.events.onInputOut.add(this.out, this);

	},
	over: function(){
		
		this.exit.tint = 0xffffff;
		console.log(this.exit.tint);
	},
	
	out: function(){
		this.exit.tint = 0xffffff;
		console.log(this.exit.tint);
	},
	close: function() {
        this.shopgroup.destroy();
        this.shopElements.destroy();
    }
};
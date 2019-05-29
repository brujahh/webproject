var Elemental = Elemental || {};

Elemental.Menu = function(){
	this.button = null;
	this.button2 = null;
}

Elemental.Menu.prototype = {
	
	create: function(){
		this.game.stage.backgroundColor = "#000000";
		this.logo = this.game.add.sprite(SCREEN_WIDTH*0.37, SCREEN_HEIGHT*0.2, 'logo');
		this.logo.scale.set(5,5);
        this.button = this.game.add.button(SCREEN_WIDTH*0.42, SCREEN_HEIGHT*0.4, 'buttons', this.startGame, this, 0, 1, 1);
        this.button.scale.set(3, 3);
        this.button2 = this.game.add.button(SCREEN_WIDTH*0.44, SCREEN_HEIGHT*0.5, 'buttons2', this.credits, this, 0, 1, 1);
		this.button2.scale.set(3, 3);
		COUNTDOWN = 60;
        SCORE = 0;

        this.cursorText = this.game.add.text(SCREEN_WIDTH*0.05, SCREEN_HEIGHT*0.8, "Move",
            {font: "24px Alagard", fill: '#d5aa00'});
        this.cursorSprite = this.game.add.sprite(SCREEN_WIDTH*0.11, SCREEN_HEIGHT*0.77, 'cursors');
        this.keyZText = this.game.add.text(SCREEN_WIDTH*0.05, SCREEN_HEIGHT*0.85, 'Interact',
            {font: "24px Alagard", fill: '#d5aa00'});
        this.keyZSprite = this.game.add.sprite(SCREEN_WIDTH*0.13, SCREEN_HEIGHT*0.85, 'keyZ');
        this.spaceText = this.game.add.text(SCREEN_WIDTH*0.05, SCREEN_HEIGHT*0.9, 'Attack',
            {font: "24px Alagard", fill: '#d5aa00'});
        this.spaceSprite = this.game.add.sprite(SCREEN_WIDTH*0.11, SCREEN_HEIGHT*0.9, 'space');
        this.cursorSprite.scale.set(1.5, 1.5);
        this.keyZSprite.scale.set(1.5, 1.5);
        this.spaceSprite.scale.set(1.5, 1.5);
    },

    startGame: function(){
        this.game.state.start("Game");
    },

    credits: function(){
        this.game.state.start("Credits");
    }
};
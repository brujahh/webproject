var Elemental = Elemental || {};

Elemental.Boot = function(){};

Elemental.Boot.prototype = {

    preload: function(){
        //load menu assets here
    },

    create: function(){

        this.cache = new Phaser.Cache(this);
        this.load.reset();
        this.load.removeAll();
        //stretch screen
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
		this.game.stage.smoothed = false;
        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Preload');
    }
};

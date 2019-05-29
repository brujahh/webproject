var Elemental = Elemental || {};

Elemental.Credits = function(){
	this.button = null;
}

Elemental.Credits.prototype = {
	create: function(){
		this.button = this.game.add.button(SCREEN_WIDTH*0.05, SCREEN_HEIGHT*0.85, 'backbtn', this.Menu, this, 0, 1, 1);
        this.button.scale.set(2, 2);
		this.programmers = this.game.add.text(SCREEN_WIDTH/2.3, SCREEN_HEIGHT*0.1,
        "Programmers ", {font: "30px Alagard", fill: '#930a0a'});
		this.richard = this.game.add.text(SCREEN_WIDTH/1.99, SCREEN_HEIGHT*0.19,
        "Richard Kajaste", {font: "20px Alagard", fill: '#d5aa00'});
		this.richard.anchor.setTo(0.5,0.5);
		this.krister = this.game.add.text(SCREEN_WIDTH/1.99, SCREEN_HEIGHT*0.25,
        "Krister Tarnamaa", {font: "20px Alagard", fill: '#d5aa00'});
		this.krister.anchor.setTo(0.5,0.5);
		this.Adesigner = this.game.add.text(SCREEN_WIDTH/2.3, SCREEN_HEIGHT*0.3,
        "Art Designers", {font: "30px Alagard", fill: '#930a0a'});
		this.ege = this.game.add.text(SCREEN_WIDTH/1.99, SCREEN_HEIGHT*0.39,
        "Ege-Rita Noor", {font: "20px Alagard", fill: '#d5aa00'});
		this.ege.anchor.setTo(0.5,0.5);
		this.kirke = this.game.add.text(SCREEN_WIDTH/1.99, SCREEN_HEIGHT*0.45,
        "Kirke Gross", {font: "20px Alagard", fill: '#d5aa00'});
		this.kirke.anchor.setTo(0.5,0.5);
		this.Ldesigner = this.game.add.text(SCREEN_WIDTH/2.32, SCREEN_HEIGHT*0.5,
        "Level Designer", {font: "30px Alagard", fill: '#930a0a'});
		this.elias = this.game.add.text(SCREEN_WIDTH/1.99, SCREEN_HEIGHT*0.59,
        "Elías Muñoz Rubiales", {font: "20px Alagard", fill: '#d5aa00'});
		this.elias.anchor.setTo(0.5,0.5);
		this.gameConcept = this.game.add.text(SCREEN_WIDTH/2.38, SCREEN_HEIGHT*0.65,
        "Game Concept by", {font: "30px Alagard", fill: '#930a0a'});
		this.sillaots = this.game.add.text(SCREEN_WIDTH/1.99, SCREEN_HEIGHT*0.74,
        "Martin Sillaots", {font: "20px Alagard", fill: '#d5aa00'});
		this.sillaots.anchor.setTo(0.5,0.5);
		
	},
	
	update: function(){
		this.programmers.setText("Programmers");
		this.richard.setText("Richard Kajaste");
		this.krister.setText("Krister Tarnamaa");
		this.Adesigner.setText("Art Designers");
		this.ege.setText("Ege-Rita Noor");
		this.kirke.setText("Kirke Gross");
		this.Ldesigner.setText("Level Designer");
		this.elias.setText("Elías Muñoz Rubiales");
		this.gameConcept.setText("Game Concept by");
		this.gameConcept.setText("Game Concept by");
		this.sillaots.setText("Martin Sillaots");
	},
	Menu: function(){
		this.game.state.start("Menu");
	}
};

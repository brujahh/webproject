var Elemental = Elemental || {};

Elemental.game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '');

Elemental.game.state.add('Boot', Elemental.Boot);
Elemental.game.state.add('Preload', Elemental.Preload);
Elemental.game.state.add('Menu', Elemental.Menu);
Elemental.game.state.add('Credits', Elemental.Credits);
Elemental.game.state.add('Game', Elemental.Game);

Elemental.game.state.start('Boot');

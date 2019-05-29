
var player = {
	"name":"",
	"pHead":0,
	"pLeftHand":0,
	"pChest":0,
	"pRightHand":0,
	"pLeftLeg":0,
	"pRightLeg":0,
};

var enemy = {
	"name":"",
	"eHead":0,
	"eLeftHand":0,
	"eChest":0,
	"eRightHand":0,
	"eLeftLeg":0,
	"eRightLeg":0,
};

var playerString = {};
var stringToSave = {};
var allPlayers =[];

var colors = ["#ffc0cb", "#b3b3b3", "#966d4f"];// roosa, hõbedane, pruun
var eTypes = ["eHead", "eLeftHand", "eChest", "eRightHand", "eLeftLeg", "eRightLeg"];
var pTypes = ["pHead", "pLeftHand", "pChest", "pRightHand", "pLeftLeg", "pRightLeg"];

window.onload = function(){

	loadServerFn();

	setTimeout(function() {
		loadEnemyList();
	}, 100);

	document.getElementById("inFightButtons").style.display = 'none';

	pHead.addEventListener("click", function() {changeValue(colors, pHead, "pHead");} );
	pHead.addEventListener("mouseover", function() {pointer(pHead);} );

	pLeftHand.addEventListener("click", function() {changeValue(colors, pLeftHand, "pLeftHand");} );
	pLeftHand.addEventListener("mouseover", function() {pointer(pLeftHand);} );

	pChest.addEventListener("click", function() {changeValue(colors, pChest, "pChest");} );
	pChest.addEventListener("mouseover", function() {pointer(pChest);} );

	pRightHand.addEventListener("click", function() {changeValue(colors, pRightHand, "pRightHand");} );
	pRightHand.addEventListener("mouseover", function() {pointer(pRightHand);} );

	pLeftLeg.addEventListener("click", function() {changeValue(colors, pLeftLeg, "pLeftLeg");} );
	pLeftLeg.addEventListener("mouseover", function() {pointer(pLeftLeg);} );

	pRightLeg.addEventListener("click", function() {changeValue(colors, pRightLeg, "pRightLeg");} );
	pRightLeg.addEventListener("mouseover", function() {pointer(pRightLeg);} );

	save.addEventListener("click", function() {saveMonster();} );
	save.addEventListener("mouseover", function() {pointer(save);} );

	document.querySelector('body').addEventListener('click', function(event) {
	  if (event.target.id == 'backButton') {
			back();
	  }
	});

	document.querySelector('body').addEventListener('click', function(event) {
		if (event.target.className == 'fightButton') {
			fight(event.target.id);
		}
	});

};

function back() {
	document.getElementById("opponentList").style.display = 'block';
	document.getElementById("visibleEnemy").style.display = 'none';
	document.getElementById("inFightButtons").style.display = 'none';
}

function fight(enemy) {
	if(checkMonster()==1) {
		document.getElementById("opponentList").style.display = 'none';
		document.getElementById("visibleEnemy").style.display = 'block';
		document.getElementById("inFightButtons").style.display = 'block';
		loadEnemy(parseInt(enemy));
	} else {
		console.log("Make a monster first");
	}
}

function changeValue(list, object, type) {
	for(var i=0; i<list.length; i++);
	player[type] += 1;

	if (player[type] == list.length+1) {
		player[type] = 1;
	}
	object.style.backgroundColor = list[player[type]-1];
}

function pointer(object) {
	object.style.cursor = "pointer";
}

function saveServerFn() {
	$.ajax({
		url: "../server.php?save="+JSON.stringify(player)
	}).done(function(data) {
		console.log('Saved monster to server.');
		console.log(data);
	});
}

function saveMonster() {
	if(checkMonster()==1) {

		document.getElementById("opponentList").style.display = 'block';
		document.getElementById("visibleEnemy").style.display = 'none';
		document.getElementById("inFightButtons").style.display = 'none';

    getName();

    if(player.name !== "") {
      console.log("Will save now");
  		saveServerFn();
			document.getElementById('playerName').innerHTML = player.name;
    } else {
      console.log("Insert a name for the monster");
    }
	} else {
		console.log("Monster not ready to save!");
	}
}

function getName() {
  player.name = document.getElementById('newName').value;
}

function checkMonster() {
	var ready = 1;
	for(var i=0; i<pTypes.length; i++) {
		if(player[pTypes[i]]===0){
			ready = 0;
		}
	}
	return ready;
}

function loadServerFn() {
	$.ajax({
		url: "../database.txt"
	}).done(function(data) {
		allPlayers = JSON.parse(data).players;
		console.log('Loaded monsters from server.');
	});
}

function loadEnemyList() {

	if(allPlayers.length>0) {
		var heading = document.createElement("h3");
		var headingText = document.createTextNode("Choose an Enemy to fight with");
		heading.appendChild(headingText);
		document.getElementById("opponentList").appendChild(heading);
	} else {
		var emptyListHeading = document.createElement("h3");
		var emptyListHeadingText = document.createTextNode("No saved monsters yet, be first!");
		emptyListHeading.appendChild(emptyListHeadingText);
		document.getElementById("opponentList").appendChild(emptyListHeading);
	}

	for(var i=0; i<allPlayers.length; i++) {

		var oneEnemy = document.createElement("div");
		oneEnemy.className = 'oneEnemy';

		var enemyNameSpan = document.createElement("span");
		enemyNameSpan.className = 'enemyName';
		var enemyName = document.createTextNode(allPlayers[i].name);
		enemyNameSpan.appendChild(enemyName);
		oneEnemy.appendChild(enemyNameSpan);
		document.getElementById("opponentList").appendChild(oneEnemy);


		var fightButton = document.createElement("button");
		fightButton.className = 'fightButton';
		fightButton.id = i;
		var buttonName = document.createTextNode("Fight");
		fightButton.appendChild(buttonName);
		oneEnemy.appendChild(fightButton);
		document.getElementById("opponentList").appendChild(oneEnemy);

	}
}


function loadEnemy(chosenEnemy) {
	for(var e=0; e<allPlayers.length; e++){
		if(allPlayers[e].name==allPlayers[chosenEnemy].name){

			enemy.name = allPlayers[e].name;
			document.getElementById('enemyName').innerHTML = enemy.name;
			enemy.eHead = allPlayers[e].pHead;
			document.getElementById('eHead').style.backgroundColor = colors[enemy.eHead-1];
			enemy.eLeftHand = allPlayers[e].pLeftHand;
			document.getElementById('eLeftHand').style.backgroundColor = colors[enemy.eLeftHand-1];
			enemy.eChest = allPlayers[e].pChest;
			document.getElementById('eChest').style.backgroundColor = colors[enemy.eChest-1];
			enemy.eRightHand = allPlayers[e].pRightHand;
			document.getElementById('eRightHand').style.backgroundColor = colors[enemy.eRightHand-1];
			enemy.eLeftLeg = allPlayers[e].pLeftLeg;
			document.getElementById('eLeftLeg').style.backgroundColor = colors[enemy.eLeftLeg-1];
			enemy.eRightLeg = allPlayers[e].pRightLeg;
			document.getElementById('eRightLeg').style.backgroundColor = colors[enemy.eRightLeg-1];

			console.log(enemy.eHead);

		}
	}
}

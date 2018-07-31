const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var rooms = [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];

var litRoom = '\x1b[47m \x1b[0m';
var hero = '\x1b[33mO\x1b[0m';
var acidTrap = '\x1b[30m*\x1b[0m';
var visAcidTrap = '\x1b[32m*\x1b[0m';
var zombieOwl = '\x1b[30m%\x1b[0m';
var visZombieOwl = '\x1b[35m%\x1b[0m';
var wompum = '\x1b[30m#\x1b[0m';
var portal = '\x1b[30m@\x1b[0m';
var visPortal = '\x1b[36m@\x1b[0m';
var pillar = '\x1b[30mX\x1b[0m';
var visPillar = '\x1b[31mX\x1b[0m';
var currentPositionY = Math.floor(Math.random() * 10);
var currentPositionX = 9;
var lastPositionX;
var lastPositionY;
var word = 0;
var dialogue = 0;
var axe = 5;
var dead = 0;
var traps = [portal, zombieOwl, pillar, acidTrap];
rooms[currentPositionX][currentPositionY] = hero;

var talking = ['Hello there young knight, thank you for \naccepting this quest. The Wompum is a terrifying creature\nthat has been eating villagers in the night. We need you \nto infiltrate its lair and kill it. You must \nlight the torches in the cave as you go.\nThe Wompum will not go into a lit room.\n', 'There are many terrible obstacles living in the wompums cave.\nThe acid pit looks like this: ' + visAcidTrap + '\nIt will melt your metal axes or maybe worse.\n', 'There are cursed zombie owls that roam the cave.\nThey look like this: ' + visZombieOwl + '\nIf you disturb them they will attack you and send a gust of wind\nblowing out all of the torches.\n', 'Because of the darkness, walls and pillars might be hidden.\nThey look like this: ' + visPillar + '\nMake sure you\'re wearing your helmet to avoid concussions.\n', 'Portals aren\'t so bad, they send you on\na smooth ride to a random location in the cave.\nThey look like this: ' + visPortal + '\nJust don\'t get too caught up in the fun ride.\n', 'You\'re armor looks pretty cool, like this: ' + hero + '\nNavigate through the maze using the [a], [w], [s], and [d] keys\nThrow you\'re axe using the [r] key.\nTo execute any command, type the key and then press [enter]\n', 'Finally, to slay the wompum you must figure out\nwhich room it is in and throw an axe in there.\nIf you miss, it will run to a different room.\n', 'Good luck! If you get caught in a room with a wompum\nit will devour you in a grousome way.\nType "help" at anytime if you forget any of the commands\n'];

function clear () {
	return process.stdout.write('\033c');
}

function talk (str) {
	process.stdout.write(str[word]);
	word++;
	if (word < str.length) {
		setTimeout(function(){talk(str)}, 50);
	} else {
	rl.question('[Press Enter]', (answer) => {
		if (dialogue < talking.length - 1) {
			printBoard();
			dialogue++;
			word = 0;
			talk(talking[dialogue]);
		} else {
			printBoard();
			moveHero();
		}
		});
	}
}

function printTitle () {
	console.log('\x1b[33m%s\x1b[0m' , '\n /****\\                             /****\\');
	console.log('\x1b[33m%s\x1b[0m' , ' \\****/                             \\****/');
	console.log('\x1b[34m%s\x1b[0m', '  ####                               ####');
	console.log('\x1b[34m%s\x1b[0m', '   ##                                 ##');
	console.log('\x1b[34m%s\x1b[0m', '   ##                                 ##');
	console.log('\x1b[34m%s\x1b[0m', '   ##                                 ##');
	console.log('\x1b[34m%s\x1b[0m', '   ##                                 ##');
	console.log('\x1b[34m%s\x1b[0m', '+=========================================+');
	console.log('\x1b[41m%s\x1b[0m', '              SLAY THE WOMPUM              ');
	console.log('\x1b[34m%s\x1b[0m', '+=========================================+');
}

function printMenu () {
	clear ();
	printTitle();
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
	console.log('\n\n\n\n\n\n\n\n');
	console.log('Do you dare accept this perilous quest?!');
	console.log('\n\n\n\n\n\n\n\n');
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
}

function printBoard () {
	clear ();
	printTitle();
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
	console.log('+---+---+---+---+---+---+---+---+---+---+');
	process.stdout.write('|');
	console.log(' ' + rooms[0][0] + '   ' + rooms[0][1] + '   ' + rooms[0][2] + '   ' 
		+ rooms[0][3] + '   ' + rooms[0][4] + '   ' + rooms[0][5] + '   ' + rooms[0][6] + '   ' + rooms[0][7] 
		+ '   ' + rooms[0][8] + '   ' + rooms[0][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[1][0] + '   ' + rooms[1][1] + '   ' + rooms[1][2] + '   ' 
		+ rooms[1][3] + '   ' + rooms[1][4] + '   ' + rooms[1][5] + '   ' + rooms[1][6] + '   ' + rooms[1][7] 
		+ '   ' + rooms[1][8] + '   ' + rooms[1][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[2][0] + '   ' + rooms[2][1] + '   ' + rooms[2][2] + '   ' 
		+ rooms[2][3] + '   ' + rooms[2][4] + '   ' + rooms[2][5] + '   ' + rooms[2][6] + '   ' + rooms[2][7] 
		+ '   ' + rooms[2][8] + '   ' + rooms[2][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[3][0] + '   ' + rooms[3][1] + '   ' + rooms[3][2] + '   ' 
		+ rooms[3][3] + '   ' + rooms[3][4] + '   ' + rooms[3][5] + '   ' + rooms[3][6] + '   ' + rooms[3][7] 
		+ '   ' + rooms[3][8] + '   ' + rooms[3][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[4][0] + '   ' + rooms[4][1] + '   ' + rooms[4][2] + '   ' 
		+ rooms[4][3] + '   ' + rooms[4][4] + '   ' + rooms[4][5] + '   ' + rooms[4][6] + '   ' + rooms[4][7] 
		+ '   ' + rooms[4][8] + '   ' + rooms[4][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[5][0] + '   ' + rooms[5][1] + '   ' + rooms[5][2] + '   ' 
		+ rooms[5][3] + '   ' + rooms[5][4] + '   ' + rooms[5][5] + '   ' + rooms[5][6] + '   ' + rooms[5][7] 
		+ '   ' + rooms[5][8] + '   ' + rooms[5][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[6][0] + '   ' + rooms[6][1] + '   ' + rooms[6][2] + '   ' 
		+ rooms[6][3] + '   ' + rooms[6][4] + '   ' + rooms[6][5] + '   ' + rooms[6][6] + '   ' + rooms[6][7] 
		+ '   ' + rooms[6][8] + '   ' + rooms[6][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[7][0] + '   ' + rooms[7][1] + '   ' + rooms[7][2] + '   ' 
		+ rooms[7][3] + '   ' + rooms[7][4] + '   ' + rooms[7][5] + '   ' + rooms[7][6] + '   ' + rooms[7][7] 
		+ '   ' + rooms[7][8] + '   ' + rooms[7][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[8][0] + '   ' + rooms[8][1] + '   ' + rooms[8][2] + '   ' 
		+ rooms[8][3] + '   ' + rooms[8][4] + '   ' + rooms[8][5] + '   ' + rooms[8][6] + '   ' + rooms[8][7] 
		+ '   ' + rooms[8][8] + '   ' + rooms[8][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+   +   +   +   +   +   +   +   +   +   +\n');
	process.stdout.write('|');
	console.log(' ' + rooms[9][0] + '   ' + rooms[9][1] + '   ' + rooms[9][2] + '   ' 
		+ rooms[9][3] + '   ' + rooms[9][4] + '   ' + rooms[9][5] + '   ' + rooms[9][6] + '   ' + rooms[9][7] 
		+ '   ' + rooms[9][8] + '   ' + rooms[9][9] + ' \x1b[37m|\x1b[0m');
	process.stdout.write('+---+---+---+---+---+---+---+---+---+---+\n');
	console.log('Number of axes on belt: ' + axe);
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
}

function helpMenu () {
	clear ();
	printTitle();
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
	console.log('\n\n');
	console.log('  CONTROLS:');
	console.log('  w = Move Up');
	console.log('  s = Move Down');
	console.log('  a = Move Left');
	console.log('  d = Move Right');
	console.log('  r = Throw Axe');
	console.log('\n  TRAPS:');
	console.log('  ' + visAcidTrap + ' = Acid Trap');
	console.log('  ' + visZombieOwl + ' = Zombie Owl');
	console.log('  ' + visPillar + ' = Brick Pillar');
	console.log('  ' + visPortal + ' = Portal');
	console.log('\n\n');
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
	rl.question('[Press Enter]', (answer) => {
		if (answer == 'y') {
			printBoard();
			moveHero();
		} else {
			printBoard();
			moveHero();
		}
	});
}

function clearBoard () {
	for (var i = 0; i < rooms.length; i++) {
		for (var k = 0; k < rooms[i].length; k++) {
			rooms[i][k] = ' ';
		}
	}
	currentPositionY = Math.floor(Math.random() * 10);
	currentPositionX = 9;
}

function youWin () {
	clear ();
	printTitle();
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
	console.log('\n\n\n\n\n\n\n\n');
	console.log('\x1b[32m%s\x1b[0m', '         YOU SLAYED THE WOMPUM!');
	console.log('\n\n\n\n\n\n\n\n');
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
	rl.question('Go to the next kingdom and take care of\ntheir wompum problem? [y/n] ', (answer) => {
		if (answer == 'y') {
			clearBoard();
			axe = 5;
			printMenu();
			start();
		} else {
			rl.close();
			return;
		}
	});
}


function gameOver () {
	clear ();
	printTitle();
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
	console.log('\n\n\n\n\n\n\n\n');
	console.log('\x1b[31m%s\x1b[0m', '                GAME OVER');
	console.log('\n\n\n\n\n\n\n\n');
	console.log('\x1b[34m%s\x1b[0m', '*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*');
	rl.question('The wompum ate your arms and legs and put the rest in the freezer.\nShould we send another knight in? [y/n] ', (answer) => {
		if (answer == 'y') {
			clearBoard();
			axe = 5;
			printMenu();
			start();
		} else {
			rl.close();
			return;
		}
	});
}

function randomPosition() {
	currentPositionX = Math.floor(Math.random() * 9);
	currentPositionY = Math.floor(Math.random() * 9);
	if (rooms[currentPositionX][currentPositionY] == ' ') {
		rooms[currentPositionX][currentPositionY] = hero; 
	} else {
		randomPosition();
	}
}

function lightsOut () {
	for (var i = 0; i < rooms.length; i++) {
		for (var k = 0; k < rooms[i].length; k++) {
			if (rooms[i][k] == litRoom) {
				rooms[i][k] = ' ';
			}
		}
	}
	printBoard();
}

function checkMove () {
	if (currentPositionX < 0 || currentPositionX > 9 || currentPositionY < 0 || currentPositionY > 9) {
		return (0);
	} else if (rooms[currentPositionX][currentPositionY] == pillar || rooms[currentPositionX][currentPositionY] == visPillar) {
		rooms[currentPositionX][currentPositionY] = visPillar;
		printBoard();
		console.log('\x1b[31m%s\x1b[0m', 'Ouch! Thats a brick wall. Good thing I\'m wearing this helmet.');
		return (0);
	} else if (rooms[currentPositionX][currentPositionY] == portal || rooms[currentPositionX][currentPositionY] == visPortal) {
		rooms[currentPositionX][currentPositionY] = visPortal;
		console.log('\x1b[36m%s\x1b[0m', 'Woohhhhhh, some sort of teleportation');
		randomPosition();
		return (1);
	} else if (rooms[currentPositionX][currentPositionY] == zombieOwl || rooms[currentPositionX][currentPositionY] == visZombieOwl) {
		rooms[currentPositionX][currentPositionY] = visZombieOwl;
		lightsOut();
		console.log('\x1b[35m%s\x1b[0m', 'Oh no! A zombie owl! Its clawing my eyes out!');
		return (0);
	} else if (rooms[currentPositionX][currentPositionY] == acidTrap || rooms[currentPositionX][currentPositionY] == visAcidTrap) {
		rooms[currentPositionX][currentPositionY] = visAcidTrap;
		if (axe > 0) {
			axe--;
			printBoard();
			console.log('\x1b[32m%s\x1b[0m', 'Acid sprayed out of the floor! My face is melting!\nAlso, one of my axes dissolved.');
			return (0);
		} else {
			printBoard();
			console.log('\x1b[32m%s\x1b[0m', 'Oooohh, my legs are puddles of goo.\nGuess I\'ll just crawl around.');
			return (0);
		}
		return (0);
	} else if (rooms[currentPositionX][currentPositionY] == wompum) {
		dead++;
		gameOver();
		return (2);
	} else {
		return (1);
	}
}

function listen () {
	if ((currentPositionX + 1 < 10 && rooms[currentPositionX + 1][currentPositionY] == wompum) || (currentPositionX - 1 >= 0 && 
		rooms[currentPositionX - 1][currentPositionY] == wompum) || (currentPositionY - 1 >= 0 && rooms[currentPositionX][currentPositionY - 1] == wompum) || 
		(currentPositionY + 1 < 10 && rooms[currentPositionX][currentPositionY + 1] == wompum)) {
		console.log('\x1b[33m%s\x1b[0m', 'Hmm... I feel wompum hair on the walls.');
		return (wompum);
	} if ((currentPositionX + 1 < 10 && rooms[currentPositionX + 1][currentPositionY] == acidTrap) || (currentPositionX - 1 >= 0 && 
		rooms[currentPositionX - 1][currentPositionY] == acidTrap) || (currentPositionY - 1 >= 0 && rooms[currentPositionX][currentPositionY - 1] == acidTrap) || 
		(currentPositionY + 1 < 10 && rooms[currentPositionX][currentPositionY + 1] == acidTrap)) {
		console.log('\x1b[32m%s\x1b[0m', 'I\'m getting a strong acid taste on my tongue.');
	} if ((currentPositionX + 1 < 10 && rooms[currentPositionX + 1][currentPositionY] == zombieOwl) || (currentPositionX - 1 >= 0 && 
		rooms[currentPositionX - 1][currentPositionY] == zombieOwl) || (currentPositionY - 1 >= 0 && rooms[currentPositionX][currentPositionY - 1] == zombieOwl) || 
		(currentPositionY + 1 < 10 && rooms[currentPositionX][currentPositionY + 1] == zombieOwl)) {
		console.log('\x1b[35m%s\x1b[0m', 'Weird, it smells of rotting owl.');
	} if ((currentPositionX + 1 < 10 && rooms[currentPositionX + 1][currentPositionY] == portal) || (currentPositionX - 1 >= 0 && 
		rooms[currentPositionX - 1][currentPositionY] == portal) || (currentPositionY - 1 >= 0 && rooms[currentPositionX][currentPositionY - 1] == portal) || 
		(currentPositionY + 1 < 10 && rooms[currentPositionX][currentPositionY + 1] == portal)) {
		console.log('\x1b[36m%s\x1b[0m', 'I hear a whooshing, portally sound. It is very drafty');
	}
}

function throwAxe () {
	rl.question('Where do you want to throw axe? ', (answer) => {
		if (answer == 'w') {
			axe--;
			if ((currentPositionX - 1) > 0 && rooms[currentPositionX - 1][currentPositionY] == wompum) {
				youWin();
			} else if (listen() == wompum) {
				for (var i = 0; i < rooms.length; i++) {
					for (var k = 0; k < rooms[i].length; k++) {
						if (rooms[i][k] == wompum) {
							rooms[i][k] = ' ';
						}
					}
				}
				printBoard();
				console.log('You scared the wompum, he escaped to another room');
				placeWompum();
				moveHero();
			} else {
				printBoard()
				console.log('Ahhhrrrrgggg... Oops, guess you weren\'t the only knight in here.');
				moveHero();
			}
		} else if (answer == 's') {
			axe--;
			if (currentPositionX + 1 < 10 && rooms[currentPositionX + 1][currentPositionY] == wompum) {
				youWin();
			} else if (listen() == wompum) {
				for (var i = 0; i < rooms.length; i++) {
					for (var k = 0; k < rooms[i].length; k++) {
						if (rooms[i][k] == wompum) {
							rooms[i][k] = ' ';
						}
					}
				}
				printBoard();
				console.log('Grrrr... The wompum ran to another room.');
				placeWompum();
				moveHero();
			} else {
				printBoard();
				console.log('Ting-tang-ting... Your\'re axe bounced off the wall and stuck in your leg.');
				moveHero();
			}
		} else if (answer == 'a') {
			axe--;
			if (currentPositionY - 1 > 0 && rooms[currentPositionX][currentPositionY - 1] == wompum) {
				youWin();
			} else if (listen() == wompum) {
				for (var i = 0; i < rooms.length; i++) {
					for (var k = 0; k < rooms[i].length; k++) {
						if (rooms[i][k] == wompum) {
							rooms[i][k] = ' ';
						}
					}
				}
				printBoard();
				console.log('He he he... The wompum laughed at your terrible aim as he ran to another room.');
				placeWompum();
				moveHero();
			} else {
				printBoard();
				console.log('Ting-tang-ting... You\'re axe flew down a hallway.');
				moveHero();
			}
		} else if (answer == 'd') {
			axe--;
			if (currentPositionY + 1 < 10 && rooms[currentPositionX][currentPositionY + 1] == wompum) {
				youWin();
			} else if (listen() == wompum) {
				for (var i = 0; i < rooms.length; i++) {
					for (var k = 0; k < rooms[i].length; k++) {
						if (rooms[i][k] == wompum) {
							rooms[i][k] = ' ';
						}
					}
				}
				printBoard();
				console.log('The wompum escaped to another room');
				placeWompum();
				moveHero();
			} else {
				printBoard();
				console.log('You\'re axe hit a rat... at least you can eat.');
				moveHero();
			}
		} else {
			console.log('You put your axe away');
			moveHero();
		}
	});
}

function moveHero () {
	lastPositionX = currentPositionX;
	lastPositionY = currentPositionY;
	listen();
	rl.question('What do you want to do? ', (answer) => {
		if (answer == 'w') {
			currentPositionX--;
			if (checkMove() === 1) {
				rooms[currentPositionX][currentPositionY] = hero;
				rooms[lastPositionX][lastPositionY] = litRoom;
				printBoard();
				moveHero();
			} else {
				currentPositionX++;
				if (dead === 0) {
					moveHero();
				}
			}
		} else if (answer == 's') {
			currentPositionX++;
			if (checkMove() === 1) {
				rooms[currentPositionX][currentPositionY] = hero;
				rooms[lastPositionX][lastPositionY] = litRoom;
				printBoard();
				moveHero();
			} else {
				currentPositionX--;
				if (dead === 0) {
					moveHero();
				}
			}
		} else if (answer == 'a') {
			currentPositionY--;
			if (checkMove() === 1) {
				rooms[currentPositionX][currentPositionY] = hero;
				rooms[lastPositionX][lastPositionY] = litRoom;
				printBoard();
				moveHero();
			} else {
				currentPositionY++;
				if (dead === 0) {
					moveHero();
				}
			}
		} else if (answer == 'd') {
			currentPositionY++;
			if (checkMove() === 1) {
				rooms[currentPositionX][currentPositionY] = hero;
				rooms[lastPositionX][lastPositionY] = litRoom;
				printBoard();
				moveHero();
			} else {
				currentPositionY--;
				if (dead === 0) {
					moveHero();
				}
			}
		} else if (answer == 'help' || answer == 'h') {
			helpMenu();
		} else if (answer == 'r') {
			if (axe > 0) {
				throwAxe();
			} else {
				printBoard();
				console.log('Your pants fall to the floor as you reach for an axe but instead throw your belt.\n...Womp, womp, womp.');
				moveHero();
			}
		} else {
			console.log('The acidic fumes might be getting to your head, if you need help type "help"');
			moveHero();
		}
	});
}

function placeWompum () {
	var x = Math.floor(Math.random() * 10);
	var y = Math.floor(Math.random() * 10);
	if (rooms[x][y] == ' ') {
		rooms[x][y] = wompum;
	} else {
		placeWompum();
	}
}

function randomTraps () {
	for (var i = 0; i < 25; i++) {
		var x = Math.floor(Math.random() * 10);
		var y = Math.floor(Math.random() * 10);
		if (rooms[x][y] == ' ') {
			rooms[x][y] = traps[Math.floor(Math.random() * 4)];
		}
	}
}

function start () {
	rl.question('Do you accept? [Yes/No]: ', (answer) => {
		if (answer == 'Yes' || answer == 'yes' || answer == 'y') {
			rooms[currentPositionX][currentPositionY] = hero;
			randomTraps();
			placeWompum();
			printBoard();
			rl.question('Do you want to know how to slay the wompum? [y/n] ', (answer) => {
				if (answer == 'y' || answer == 'yes') {
					printBoard();
					talk(talking[dialogue]);
				} else {
					moveHero();
				}
			});
		} else if (answer == 'No' || answer == 'no' || answer == 'n') {
			rl.close();
			return;
		} else {
			console.log('Ha Ha Ha, even the toughest knights get scared!\nStop stuttering and either take the quest or run away.');
			start();
		}
	});
}

printMenu();
start();

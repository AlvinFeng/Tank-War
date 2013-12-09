// 0 means empty
// 1 means wall
// 2 means destructible wall

var levelmaps = 
[
	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,1,0,0,0],
		[0,0,1,1,1,0,1,0,0,0],
		[0,0,2,2,0,0,2,0,0,0],
		[0,0,2,2,0,0,2,0,0,0],
		[0,0,1,1,1,0,1,0,0,0],
		[0,0,0,0,0,0,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],

	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,1,1,0,0,1,1,0,0],
		[0,0,1,0,0,0,0,1,0,0],
		[0,0,0,0,2,2,0,0,0,0],
		[0,0,0,0,2,2,0,0,0,0],
		[0,0,1,0,0,0,0,1,0,0],
		[0,0,1,1,0,0,1,1,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],

	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,2,0,0,0,0,0,0,0,0],
		[0,2,0,0,0,1,1,2,1,1],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[1,1,2,1,1,0,0,0,2,0],
		[0,0,0,0,0,0,0,0,2,0],
		[0,0,0,0,0,0,0,0,0,0]
	],

	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,1,1,1,1,1,1,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[2,2,1,1,0,0,1,1,2,2],
		[0,0,1,1,0,0,1,1,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],

	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,1,0,0,0],
		[1,2,1,1,0,0,1,1,2,1],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[1,2,1,1,0,0,1,1,2,1],
		[0,0,0,1,0,0,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],
	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,2,2,1,0,0,0],
		[0,0,0,2,2,2,2,0,0,0],
		[0,0,0,2,2,2,2,0,0,0],
		[0,0,0,1,2,2,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],
	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,2,2,1,0,0,0],
		[0,0,1,0,0,0,0,1,0,0],
		[0,0,0,0,0,0,0,2,0,0],
		[0,0,0,0,0,0,0,2,0,0],
		[0,0,1,0,0,0,0,1,0,0],
		[0,0,0,1,2,2,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],
	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,1,0,0,2,0,0],
		[0,0,0,1,1,0,0,0,0,0],
		[0,0,1,1,0,0,0,1,1,0],
		[0,1,1,0,0,0,1,1,0,0],
		[0,0,0,0,0,1,1,0,0,0],
		[0,0,2,0,0,1,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],
	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,1,0,0],
		[0,0,0,0,0,0,0,1,1,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,1,1,0,0,0,0,0,0,0],
		[0,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	],
	//1
	[
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,1,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,1,0,0,0,0,0],
		[0,0,0,0,0,1,0,0,0,0],
		[0,0,0,0,0,0,1,0,0,0],
		[0,0,0,0,0,0,0,1,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	]
];

// player initial position for each level
var levelPlayerTank =
[
	[100,100],
	[100,100],
	[100,100],
	[100,100],
	[100,100],
	[100,100],
	[100,100],
	[100,100],
	[100,100],
	[100,100]
];

// enemies initial position for each level
// [x,y,type]
var levelEnemyTanks = 
[
	[[200,100,0],[300,100,0],[400,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]],
	[[100,100,0],[200,100,0],[300,100,0]]
];

var levelsColors =
[
	["yellow","red"],
	["yellow","red"],
	["orange","red"],
	["orange","red"],
	["green","red"],
	["green","red"],
	["blue","red"],
	["blue","red"],
	["cyan","red"],
	["cyan","red"]
];

//[x, y, upgradeLevel]
var bulletUpgrades = 
[
	[],
	[],
	[300, 100, 2],
	[],
	[],
	[200, 100, 3],
	[],
	[],
	[],
	[]
]
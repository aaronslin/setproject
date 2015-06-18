

var ALPHABET = 'abcdefghijklmnopqrstu';
var MAXCARDS = 12;
var g_cardsDealt = 0;
var g_cardSequence;
var g_tilesSelected = [];
var g_cardsOnBoard = new Array(21);
var g_numSelected = 0;
var g_vNum = 0; // Set to 0 when no game in session

function reset_globals() {
	g_cardsDealt = 0;
	g_cardSequence;
	g_tilesSelected = [];
	g_cardsOnBoard = new Array(21);
	g_numSelected = 0;
	g_vNum = 0; 
}

function load_new_cards() {
	var cards = new Array();
	
	// Initialize array to 81 numbers
	for(var n=1; n<=9; n++) {
		cards.push("0"+n.toString());
	}
	for(var n=10; n<=81; n++) {
		cards.push(n.toString());
	}

	// Shuffle cards
	for(var i=0; i<80; i++) {
		var random = Math.floor(Math.random()*(81-i))+i;
		var tmp = cards[i];
		cards[i] = cards[random];
		cards[random] = tmp;
	}
	return cards;
}

function one_more_row() {
	// Not generalizable
	var newRowID = Math.floor(g_vNum/3)+1;
	$("#row"+newRowID.toString()).css("display", "table-row");
	g_vNum = g_vNum + 3;
}

function isSet(cardNos) {
	card = new Array(3);
	mod = new Array(3);
	for(var i=0; i<3; i++) {
		card[i] = parseInt(cardNos[i])-1;
	}

	while(!(card[0]==0 && card[1]==0 && card[2]==0)) {
		for(var i=0; i<3; i++) {
			mod[i] = card[i]%3;
			card[i] = (card[i]-mod[i])/3;
		}
		if ((mod[0] + mod[1] + mod[2])%3!=0) {
			return false;
		}
	}
	return true;
}

function findAllSets() {
	allSets = [];
	for(var m=0; m<g_vNum; m++) {
		for(var n=m+1; n<g_vNum; n++) {
			for(var p=n+1; p<g_vNum; p++) {
				tileNos=[m,n,p];
				cardNos=[g_cardsOnBoard[m],g_cardsOnBoard[n],g_cardsOnBoard[p]];
				if(isSet(cardNos)){ 
					allSets.push(tileNos);
				}
			}
		}
	}
	return allSets;
}

function doesSetExist() {
	return findAllSets().length>0;
}

function shift_cards_up(tile_list) {
	rowNum = g_vNum/3;
	g_vNum = g_vNum - 3;
	$("#row"+rowNum.toString()).css("display","none");
	var card_list = [];
	for(var i=0; i<3; i++) {
		var index = tile_list.indexOf(intToTile(i+g_vNum));
		if(index == -1) { // Case: Card to fill empty spot
			card_list.push(g_cardsOnBoard[i+g_vNum]);
		}
		else { // Case: Card was selected
			tile_list.splice(index,1);
		}
	}

	for(var i=0; i<card_list.length; i++) {
		deal_card_to_tile(card_list[i], tile_list[i]);
	}
}

function deal_three_more(tile_list) {
	for(var i=0; i<3; i++) {
		deal_card(tile_list[i]);
	}
}

function deal_card(tile) {
	deal_card_to_tile(g_cardSequence[g_cardsDealt], tile);
	g_cardsDealt++;
}

function deal_card_to_tile(card, tile) {
	img_path = "url(./cardimgs/"+card+".gif)";
	$("#card_"+tile).css("background-image", img_path);
	g_cardsOnBoard[tileToInt(tile)] = g_cardSequence[g_cardsDealt];
}

function tileToInt(tile) {
	return tile.charCodeAt() - 'a'.charCodeAt();
}

function intToTile(num) {
	return String.fromCharCode(num+'a'.charCodeAt());
}

function end_game() {
	
}

function on_V_press() {
	if(!doesSetExist()) {
		if (g_cardsDealt>=81) {
			end_game();
			return;
		}
		n = g_vNum;
		tile_list = [intToTile(n), intToTile(n+1), intToTile(n+2)];
		deal_three_more(tile_list);
		one_more_row();
	}
	else {
		// Replace later
		console.log("Set exists!");
	}
}

function select_tile(tile) {
	$("#card_"+tile).toggleClass("selected_card");

	if(g_tilesSelected.length<3) {
		index = g_tilesSelected.indexOf(tile)
		if(index != -1) {
			g_tilesSelected.splice(index,1);
		}
		else {
			g_tilesSelected.push(tile);
		}
	}
	if(g_tilesSelected.length==3) {
		three_tiles_selected();
	}
}

function three_tiles_selected() {
	// Unselect everything; this is fragile
	cardNos = [];
	for(var i=0; i<3; i++) {
		tile = g_tilesSelected[i];
		$("#card_"+tile).toggleClass("selected_card");
		cardNos.push(g_cardsOnBoard[tileToInt(tile)]);
	}

	selectedTiles = g_tilesSelected;
	if (isSet(cardNos)) {
		if(g_cardsDealt<81 && g_vNum==MAXCARDS) {
			deal_three_more(selectedTiles);
		}
		else {
			shift_cards_up(selectedTiles);
		}
	}
	else {
		// not a set
	}

	g_tilesSelected = [];
}

$(document).ready(function() {
	$("#startGame").click(function() {
		reset_globals();
		g_cardSequence = load_new_cards();

		for(var i=0; i<MAXCARDS/3; i++) {
			one_more_row();
			console.log(g_vNum);
		}
		alphabet = ALPHABET.substring(0,g_vNum).split("");
		for(var i=0; i<alphabet.length; i++) {
			deal_card(alphabet[i]);
		}
	});

	$(document).keypress(function(press) {
		tile = String.fromCharCode(press.which).toLowerCase();
		if (ALPHABET.substring(0,g_vNum).indexOf(tile) != -1) {
			select_tile(tile);
		}
		else if(tile=='v') {
			on_V_press();
		}
	});
});










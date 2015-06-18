

var ALPHABET = 'abcdefghijklmnopqrstu';
var g_cardsDealt = 0;
var g_cardSequence;
var g_tilesSelected = [];
var g_cardsOnBoard = new Array(21);
var g_numSelected = 0;
var g_vNum = 12;

function loadNewCards() {
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

function deal_three_more(tile_list) {
	for(var i=0; i<3; i++) {
		deal_card(tile_list[i]);
	}
}

function deal_card(tile) {
	img_path = "url(./cardimgs/"+g_cardSequence[g_cardsDealt]+".gif)";
	$("#card_"+tile).css("background-image", img_path);
	g_cardsOnBoard[tileToInt(tile)] = g_cardSequence[g_cardsDealt];
	g_cardsDealt++;
}

function tileToInt(tile) {
	return tile.charCodeAt() - 'a'.charCodeAt();
}

$(document).ready(function() {
	$("#thebutton").click(function() {
		g_cardsDealt++;
		alert(g_cardsDealt);
	});

	$("#startGame").click(function() {
		g_cardsDealt = 0;
		g_cardSequence = loadNewCards();

		alphabet = ALPHABET.substring(0,g_vNum).split("");
		for(var i=0; i<alphabet.length; i++) {
			deal_card(alphabet[i]);
		}
	});

	$(document).keypress(function(press) {
		key = String.fromCharCode(press.which).toLowerCase();
		if (ALPHABET.substring(0,g_vNum).indexOf(key) != -1) {
			selected = $("#card_"+key);
			selected.toggleClass("selected_card");
			var bool_selected = selected.hasClass("selected_card");


			if(g_tilesSelected.length<3) {
				index = g_tilesSelected.indexOf(key)
				if(index != -1) {
					g_tilesSelected.splice(index,1);
				}
				else {
					g_tilesSelected.push(key);
				}
			}
			
			if(g_tilesSelected.length==3) {
				// Unselect everything; this is fragile
				cardNos = [];
				for(var i=0; i<3; i++) {
					tile = g_tilesSelected[i];
					$("#card_"+tile).toggleClass("selected_card");
					cardNos.push(g_cardsOnBoard[tileToInt(tile)]);
				}

				if (isSet(cardNos)) {
					deal_three_more(g_tilesSelected);
				}
				else {
					// not a set
				}

				g_tilesSelected = [];
			}
		}
	});
});













var g_cardsDealt = 0;
var g_cardsList;

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

$(document).ready(function() {
	$("#thebutton").click(function() {
		g_cardsDealt++;
		alert(g_cardsDealt);
	});
	$("#startGame").click(function() {
		g_cardsDealt = 0;
		g_cardsList = loadNewCards();

		var alphabet = "abcdefghijkl";
		alphabet = alphabet.split("");
		for(var i=0; i<alphabet.length; i++) {
			img_path = "url(./cardimgs/"+g_cardsList[g_cardsDealt]+".gif)";
			td_selector = $("#card_"+alphabet[i]);
			g_cardsDealt++;

			td_selector.css("background-image", img_path);
		}
	});
});










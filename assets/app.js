var fruitTitle = ['Lemon', 'Apple', 'Tomato', 'Avocado', 'Mango', 'Orange', 'Kiwi', 'Strawberry', 'Banana', 'Peach', 'Grape', 'Blueberry', 'Pear', 'nectarine', 'apricot', 'passionfruit', 'Melon']
var currentGif; var pausedGif; var animatedGif; var stillGif;

//creates buttons
function createButtons(){
	$('#fruitButtons').empty();
	for(var i = 0; i < fruitTitle.length; i++){
		var fruitBtn = $('<button>').text(fruitTitle[i]).addClass('fruitBtn').attr({'data-name': fruitTitle[i]});
		$('#fruitButtons').append(fruitBtn);
	}

	//displays gifs on click
	$('.fruitBtn').on('click', function(){
		$('.display').empty();

		var thisFruit = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + thisFruit + "&limit=10&api_key=g5wMBk37USKYyFLHIyIxU4PvczPr28Qi";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
});
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
});

//sets a button from input
$('#addFruit').on('click', function(){
	var newFruit = $('#newFruitInput').val().trim();
	fruitTitle.push(newFruit);
	createButtons();
	return false;
});

createButtons();
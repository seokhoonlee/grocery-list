$(function() {

var remaining_items = [
	{ title: "Tuna", content: "Buy 2 cans of Tuna. Make sure the brand is American Tuna." },
	{ title: "Pasta", content: "Buy 2 bags of Pasta. Jake prefers Gemelli type."}
];

for (var i = 0; i < remaining_items.length; i++) {
	remaining_listNode(i);
}

function remaining_listNode(id) {
	$("#remaining_list").append("<li class='nav' data-id='" + id + "'>" +
		"<h3>" + remaining_items[id].title + "</h3> "+ "</li>");

	$("#remaining_panel").append("<li class='nav'>" + "<h3>" + remaining_items[id].title + "</h3>" + "</li>");
	$("#total_panel").append("<li class='nav'>" + "<h3>" + remaining_items[id].title + "</h3>" + "</li>"); 
}

$("#remaining_list").on("singletap", "li", function() {
	var id = $(this).data("id"); // read the data-id from note item
	remaining_viewItem(id);
});

function remaining_viewItem(id) {
	$("#remaining_item_view").data("id", id);
	$("#remaining_item_view .item_title").text(remaining_items[id].title); // change title
	$("#remaining_item_view .item_content").html(remaining_items[id].content); // change content
	$.UIGoToArticle("#remaining_item_view");
}

$("#item_save").on("singletap", function() {
	var title = $("#item_title").val();
	var content = $("#item_content").val();
	
	// if content is empty, display a popup dialog
	if (title.length < 1) {
		$.UIPopup({
			id: "blank_item_warning",
			title: 'Error',
			message: 'You are required to fill up the item name!',
			cancelButton: 'Cancel',
		});
	} else {
		addItem(title, content);
	}
});

function addItem(title, content) {
	// push the new note to notes array
	remaining_items.push({title: title, content: content});
	// display to note we just added
	remaining_listNode(remaining_items.length - 1);
	// clear the form values
	$("#item_title").val("");
	$("#item_content").val("");
	// view the note
	$("#remaining_counter").text(remaining_items.length);
	added_viewItem(remaining_items.length - 1);
}

$("#goto_remaining").on("singletap", function() {
	$.UIGoToArticle("#remaining");
});

$("#goto_home").on("singletap", function() {
	$.UIGoToArticle("#home");
});

$(function() {
   $('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});
});

$("#remaining_counter").text(remaining_items.length);

var purchased_items = [

];

for (var i = 0; i < purchased_items.length; i++) {
	purchased_listNode(i);
}

function purchased_listNode(id) {
	$("#purchased_list").append("<li class='nav' data-id='" + id + "'>" +
	"<h3>" + purchased_items[id].title + "</h3>" + "</li>");

	$("#purchased_panel").append("<li class='nav'>" + "<h3>" + purchased_items[id].title + "</h3>" + "</li>");
	$("#total_panel").append("<li class='nav'>" + "<h3>" + purchased_items[id].title + "</h3>" + "</li>"); 
}

$("#purchased_list").on("singletap", "li", function() {
	var id = $(this).data("id"); // read the data-id from note item
	purchased_viewItem(id);
});

function purchased_viewItem(id) {
	$("#purchased_item_view").data("id", id);
	$("#purchased_item_view .item_title").text(purchased_items[id].title); // change title
	$("#purchased_item_view .item_content").html(purchased_items[id].content); // change content
	$.UIGoToArticle("#purchased_item_view");
}

$("#purchased_counter").text(purchased_items.length);

function added_viewItem(id) {
	$("#added_item_view").data("id", id);
	$("#added_item_view .item_title").text(remaining_items[id].title); // change title
	$("#added_item_view .item_content").html(remaining_items[id].content); // change content
	$.UIGoToArticle("#added_item_view");
}

$('#complete_switch').on('singletap swipeleft swiperight', function() {
	if (this.classList.contains('on')) {
		$('#response').html($(this).find('input').val());
		$('nav').css({"background-color":"green", "color":"white"});
	} else {
		$('#response').empty();
		$('nav').css({"background-color":"#f7f7f7", "color":"black"});
	}
});

$("#purchase_button").on("singletap", function() {

	var button = $(this);

	$("#remaining_item_view").find("ul").toggleClass("select");
	
	if($(button).text() === "Purchase"){
		$(button).text("Cancel");
	}
	else {
		$(button).text("Purchase");
	}
});

$("#remaining_view_list").on("singletap", "li", function() {
	var title = $("#remaining_title").text();
	var content = $("#remaining_content").text();
	
	if($("#purchase_button").text() === "Cancel") {
		purchased_items.push({title: title, content: content});
		purchased_listNode(purchased_items.length - 1);
		$("#purchased_counter").text(purchased_items.length);

		$("#purchase_button").text("Purchase");
		$("#remaining_item_view").find("ul").removeClass("select");
	}
});

});
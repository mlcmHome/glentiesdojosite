


jQuery(window).load(function () {
jQuery('.flexslider').flexslider({
    animation: "slide"
  });
});

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getAnchorName(){
	var regex = new RegExp("([^#]*)$");
	return(regex.exec(window.location.href)[0]);
}

function menuSelect() {
	var a = event.target;
	var parent = a.parentElement;

	jQuery('.nav.navbar-nav > li').each(function () {
		jQuery(this).removeClass('active');
	});

	jQuery(parent).addClass('active');
	var page = a.innerHTML.replace(/ /g, '_').toLowerCase();
	if(page != getAnchorName()){
		moveToPage(page);
	}
}

function moveToPage(page)
{
	jQuery('#pageMainContent').addClass('fadeOut');
	var startScript = setInterval(function (){ 
		getContent(page);
		jQuery('#pageMainContent').removeClass('fadeOut');
		 clearInterval(startScript);
	  }, 500);
}

function getContent(page){

	jQuery.get('./pages/' + page + '.html', function (data) {
		document.getElementById('pageMainContent').innerHTML = data;
	}).done(function(){ 
		
	}).fail(function(){
		jQuery.get('./pages/home.html', function (data) {
			document.getElementById('pageMainContent').innerHTML = data;
		})
	});
}

jQuery(document).ready(function () {

	var currentPage = getAnchorName();
	jQuery('.nav.navbar-nav a.menuLink').each(function(){
		jQuery(this).on("click", menuSelect);
		console.log(this.innerHTML.replace(/ /g, '_').toLowerCase() + "==" + currentPage);
		var currentObj = this;
		// if (this.innerHTML.replace(/ /g, '_').toLowerCase() == currentPage)
		// {
			
			// var parent = jQuery(currentObj).parent;
			// console.log(parent.length);
			// jQuery(parent).addClass('active');
		// }
	});
	getContent(currentPage);
});










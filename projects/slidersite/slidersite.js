$(document).ready(function () {

	/*gallery images*/
	addNihaImageData('forum2013');
	addMainEventImageData('forum20110120');
	addMainEventImageData('miniSymp2009');
	addMainEventImageData('workshop20110609');
	addMainEventImageData('workshop20101013');
	addMainEventImageData('workshop20100811');
	addMainEventImageData('workshop20100617');
	addMainEventImageData('speaker20110601Siegel');
	addMainEventImageData('speaker20110414Fainstein');
	addMainEventImageData('speaker20110329Rogers');
	addMainEventImageData('speaker20110214Viswanadham');
	addMainEventImageData('speaker20110128Warner');
	addMainEventImageData('speaker20110107Robinson');
	addMainEventImageData('speaker20101109Cassim');
	addMainEventImageData('speaker20100902Muralidharan');
	addMainEventImageData('speaker20100820Ostrom');
	addMainEventImageData('speaker20100804Bardhan');
	addMainEventImageData('speaker20100709Douglass');
	addMainEventImageData('speaker20100526Mukhopadhava');
	addMainEventImageData('speaker20100427Richardson');
	addMainEventImageData('speaker20100405Hayashi');


	$(window).on("load resize scroll", function () {
		var $el = $('#sideNavMenu');
		if (window.innerWidth < 768) {
			if (document.getElementById("mySidenav").style.width == "200px") {
				$el.css({
					'display': 'none'
				});
			} else {
				$el.css({
					'display': 'block'
				});
			}
		} else if ($(this).scrollTop() > 145) {
			if (document.getElementById("mySidenav").style.width == "200px") {
				$el.css({
					'display': 'none'
				});
			} else {
				$el.css({
					'display': 'block'
				});
			}
		} else {
			$el.css({
				'display': 'none'
			});
		}
	});


	/*lazyload all image*/
	$("#scrollingNiha img.lazy").lazyload({
		container: $("#scrollingNiha")
	});
	$("div.lazy").lazyload();
	$("img.lazy").lazyload();

	/*on load*/
	$(window).on('load', function () {

		/*for event dropdown*/
		handleSelectEvent();

		/*for dropdown width and employees*/
		var element = document.getElementsByClassName('dropdown bootstrap-select');
		for (var k = 0; k < element.length; k++) {
			element[k].classList.add('dropDownWidth');
			console.log(element[k].className);
		};

		/*read more button */
		$("#readMoreBtn").click(function () {
			var text = $("#readMoreBtn").text();
			if (text === "Read more") {
				$(this).text("Read less");
        $("#more").removeClass("moreText");
			} else {
				//Stuff to do when btn is in the read less state
				$(this).text("Read more");
        $("#more").addClass("moreText");
			}
		});

		var employeeList = '{ "employees" : [' +
			'{ "name": "Prof XXX" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof AAA" , "position": "A position", "email": "AAA@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof BBB" , "position": "A position", "email": "BBB@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof CCC" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof DDD" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof EEE" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof FFF" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof GGG" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof HHH" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof III" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof JJJ" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof KKK" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof LLL" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof MMM" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof NNN" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof OOO" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof PPP" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"},' +
			'{ "name": "Prof QQQ" , "position": "A position", "email": "XXX@nus.edu.sg", "bg": "PHD IN XXX", "role": "Management"}]}';
		var obj = JSON.parse(employeeList);
		var people = document.getElementsByClassName('rectangle');
		for (var i = 0; i < people.length; i++) {
			var staffInfo = document.getElementById("staff" + (i + 1));
			var bg = document.getElementById("bg" + (i + 1));
			var modalTitle = document.getElementById("staffModal" + (i + 1));
			var role = document.getElementById("role" + (i + 1));
			var node1 = document.createTextNode(obj.employees[i].name);
			var node2 = document.createTextNode(obj.employees[i].position);
			var node3 = document.createTextNode(obj.employees[i].email);
			var node4 = document.createTextNode(obj.employees[i].bg);
			var node5 = document.createTextNode(obj.employees[i].name);
			var node6 = document.createTextNode(obj.employees[i].role);
			var br1 = document.createElement("br");
			var br2 = document.createElement("br");
			/*basic info*/
			var dF1 = document.createDocumentFragment();
			dF1.appendChild(node1);
			dF1.appendChild(br1);
			dF1.appendChild(node2);
			dF1.appendChild(br2);
			dF1.appendChild(node3);
			staffInfo.appendChild(dF1);
			/*additional info*/
			var dF2 = document.createDocumentFragment();
			dF2.appendChild(node4);
			bg.appendChild(dF2);
			/*for modal title*/
			var dF3 = document.createDocumentFragment();
			dF3.appendChild(node5);
			modalTitle.appendChild(dF3);
			/*for role*/
			var dF4 = document.createDocumentFragment();
			dF4.appendChild(node6);
			role.appendChild(dF4);
		};
	});

	/*for people info slide-in*/
	$(".rectangle").each(function () {
		$(this).mouseover(function () {
			//var k= $(this).attr('id').slice(-1);
			$(this).animate({
				width: '0%',
				opacity: '1'
			}, "slow");
			var k = $(this).attr('id').slice(-1);
			var div = $('#rect' + k);
			setTimeout(mouseOut, 3000, div);
		});
	});
	$(".anotherRect").each(function () {
		$(this).mouseout(function () {
			var k = $(this).attr('id').slice(-1);
			var div = $('#rect' + k);
			mouseOut(div);
		});
	});

	function mouseOut(div) {
		div.animate({
			width: '100%',
			opacity: '1'
		}, "slow");
	}

	/*for carousel*/
	$('.myCarousel').on('init', function (event, slick) {
		var $items = slick.$dots.find('li');
		$items.addClass('circleIndicator');
		$items.find('button').remove();
		var el = document.getElementById("msg0");
		el.classList.remove('noWords');
		el.classList.add('displayWords');
	});

	/*display div messages on slide change*/
	$('.myCarousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		var el = document.getElementById("msg" + currentSlide);
		el.classList.remove('displayWords');
		el.classList.add('noWords');
	});

	$('.myCarousel').on('afterChange', function (event, slick, currentSlide) {
		var el = document.getElementById("msg" + currentSlide);
		el.classList.remove('noWords');
		el.classList.add('displayWords');
	});

	$('.myCarousel').slick({
		dots: true,
		infinite: true,
		speed: 1000,
		autoplay: true,
		slidesToShow: 1,
		adaptiveHeight: true,
		prevArrow: false,
		nextArrow: false
	});

	/*for loading page event photos*/
	$('.myPhotos').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		infinite: true,
		fade: true,
		cssEase: 'linear',
		adaptiveHeight: true
	});

	$('.myNihaPhotos').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		infinite: true,
		fade: true,
		cssEase: 'linear',
		adaptiveHeight: true
	});

	/*for selecting event photos*/
	$('form.filter select').on('change', function () {
		handleSelectEvent();
	});

	function handleSelectEvent() {
		console.log('handleEventWorks');
		var e = document.getElementById('selectEvent');
		var optList = e.options;
		var selected = optList[e.selectedIndex].attributes[2].value;
		var filterClass = e.value;
		var selectText = document.getElementById("eventText");
		selectText.innerHTML = selected;
		$('.filter-class').text(filterClass);
		$('.myPhotos').slick('slickUnfilter');
		$('.myPhotos').slick('slickFilter', filterClass);

	}

	/*event dropdown*/
	$('#selectEvent').selectpicker({
		dropupAuto: false
	});
	/*project dropdown*/
	$('#selectProject').selectpicker({
		dropupAuto: false
	});
	/*for navbar dropdown*/
	$('ul.nav li.dropdown').hover(function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(300);
	}, function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
	});

	/*project by year selection*/
	$('form.projectFilter select').on('change', function (event) {
		var items = document.getElementsByClassName("projDetails");
		var e = document.getElementById("selectProject").value;
		for (var i = 0; i < items.length; i++) {
			items[i].style.display = "none";
		};
		$('#projectDiv' + e).css({
			'display': 'block'
		});
	});


	/*collapsible*/
	var collapse = document.getElementsByClassName("collapsible");
	var i;
	for (i = 0; i < collapse.length; i++) {
		collapse[i].addEventListener("click", function () {
			this.classList.toggle("activeOutline");
			var outLine = this.nextElementSibling;
			if (outLine.style.maxHeight) {
				outLine.style.maxHeight = null;
			} else {
				outLine.style.maxHeight = outLine.scrollHeight + "px";
			}
		});
	};

	/*researchCards mouseover mouseleave effect*/
	$(".cardResearchExpand").each(function () {
		$(this).mouseover(function () {
			$("#overlay" + $(this).attr("id").slice(-1)).stop().fadeIn(500);
			$(this).mouseleave(function () {
				$("#overlay" + $(this).attr("id").slice(-1)).stop().fadeOut(500);
			});
		});
	});

});


/*open and close sideNav*/
function openNav() {
	document.getElementById("mySidenav").style.width = "200px";
	document.getElementById("sideNavMenu").style.display = "none";
};

function closeNav() {
	document.getElementById("mySidenav").style.width = 0;
	if ($(window).scrollTop() > 145) {
		document.getElementById("sideNavMenu").style.display = "block";
	} else {
		if (window.innerWidth < 768) {
			document.getElementById("sideNavMenu").style.display = "block";
		} else {
			document.getElementById("sideNavMenu").style.display = "none";
		}
	}
};

function addNihaImageData(el) {
	var elem = document.getElementsByClassName(el);
	for (var k = 0; k < elem.length; k++) {
		if (k < 9) {
			elem[k].setAttribute("data-original", "http://www.gai.nus.edu.sg/images/niha/" + el + "/00" + (k + 1) + ".jpg");
		} else if (k < 99) {
			elem[k].setAttribute("data-original", "http://www.gai.nus.edu.sg/images/niha/" + el + "/0" + (k + 1) + ".jpg");
		} else {
			elem[k].setAttribute("data-original", "http://www.gai.nus.edu.sg/images/niha/" + el + "/" + (k + 1) + ".jpg");
		}
	};
};

function addMainEventImageData(el) {
	var elem = document.getElementsByClassName(el);
	for (var k = 0; k < elem.length; k++) {
		if (k < 9) {
			elem[k].setAttribute("data-original", "http://www.gai.nus.edu.sg/images/mainEvents/" + el + "/00" + (k + 1) + ".jpg");
		} else if (k < 99) {
			elem[k].setAttribute("data-original", "http://www.gai.nus.edu.sg/images/mainEvents/" + el + "/0" + (k + 1) + ".jpg");
		} else {
			elem[k].setAttribute("data-original", "http://www.gai.nus.edu.sg/images/mainEvents/" + el + "/" + (k + 1) + ".jpg");
		}
	};
};
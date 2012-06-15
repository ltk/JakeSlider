
var slider = {
	self : this,

	// Our slides
	slides : new Array(),
	container : null,

	// Some Options
	interval: 3000, // in ms
	delay: 1000, // in ms

	// Internal Properties
	current_slide : null,
	total_slides : null,
	last_slide : null,
	first_slide : null,

	// Internal Methods
	add_slide : function (slide) {
		this.slides.push(slide);

		if(this.current_slide == null) { slider.set_current_slide(); }

		slider.total_slides = slider.slides.length;
		slider.last_slide = slider.slides[slider.total_slides-1];
		slider.first_slide = slider.slides[0];
	},

	set_current_slide : function(slide){
		if (slide == undefined) {
			this.current_slide = this.slides[0]
		} else {
			this.current_slide =  slide
		}
	},

	next_slide : function() {
		if (this.current_slide == this.last_slide) {
			return this.first_slide;
		} else {
			return this.slides[this.slides.indexOf(this.current_slide) + 1] 
		}
	},

	prev_slide : function() {
		if (this.current_slide == this.first_slide) {
			return this.last_slide;
		} else {
			return this.slides[this.slides.indexOf(this.current_slide) - 1] 
		}
	},

	go_to : function(animation, slide) {
		window["slider"][animation](this.current_slide);
		this.set_current_slide(slide);
		return slide;
	}, 

	animate_left : function(slide){
		var distance = this.container.outerWidth();
		this.next_slide().dom_el.css({
			left : distance,
			display : 'block'
		})
		.stop().animate({
			left:0
		}, 'slow');
		slide.dom_el.stop().animate({
			left: distance*-1
		}, 'slow', function() {
			$(this).css('left', distance);
		});
	},

	animate_right : function(slide){
		var distance = this.container.outerWidth();
		this.next_slide().dom_el.css({
			left : distance*-1,
			display : 'block'
		})
		.stop().animate({
			left:0
		}, 'slow');
		slide.dom_el.stop().animate({
			left: distance
		}, 'slow', function() {
			$(this).css('left', distance*-1);
		});
	},

	animate_split_vertical : function(){
	var img_html = this.next_slide().dom_el;
	this.next_slide().dom_el.wrap('<div class="holder top">');
	this.next_slide().dom_el.clone().insertAfter(".holder").wrap('<div class="holder bottom">');
	this.current_slide.dom_el.addClass("current");


		var i = 0;
		$(".holder").animate({
			height : "50%",
			opacity: 1
		}, "slow", function() {
			i++;
			console.log(i);
			if (i == 2) {
				slider.current_slide.dom_el.unwrap().addClass("current");
				$(".holder.bottom").remove()
				slider.prev_slide().dom_el.removeClass("current");
			}
		});


	},

	scrape_slides_from : function(containing_id) {

	},

	run : function(params){
		this.current_slide.dom_el.fadeIn();
		// setInterval('slider.go_to("animate_right", slider.next_slide())', this.interval);
		// setInterval(window["slider"]["go_to"]("animate_right", slider.next_slide()), this.interval);
		setInterval(function() { slider.go_to("animate_split_vertical", slider.next_slide()) }, this.interval);
	}


}

$(function() {
	//	Add our slides to the slider
	slider.container = $('#container');
	slider.add_slide({ 
		dom_el : $('#slide1'),
		title : "Slide 1"
	});
	slider.add_slide({
		dom_el : $('#slide2'),
		title : "Slide 2"
	});
	slider.add_slide({
		dom_el : $('#slide3'),
		title : "Slide 3"
	});

	params = {

	};

	slider.run(params);



	/*slider.slides.push(
	{
		img : 'http://www.placekitten.com/100/100/',
		link : 'http://www.thejakegroup.com/',
		title : 'Slide 1',
		duration: null,
		dom_el : $('#slide1')
	},
	{
		img : 'http://www.placekitten.com/101/101/',
		link : 'http://www.thejakegroup.com/',
		title : 'Slide 2',
		duration: null,
		dom_el : $('#slide2')
	},
	{
		img : 'http://www.placekitten.com/102/102/',
		link : 'http://www.thejakegroup.com/',
		title : 'Slide 3',
		duration: null,
		dom_el : $('#slide3')
	});*/



/*	slider.next_slide().dom_el.stop().animate({
		left: 0
	}, 'slow');
*/






});



/*
	.holder {
		overflow:hidden;
		height:0;
		opacity:0;
	}

	.current {	}

	.holder img { position: absolute;}

	.holder.top {bottom:50%;}
	.holder.bottom {top:50%;}

	.holder.top img {bottom: 50%;}
	.holder.bottom img {top: 50%;}
*/

/*
	<div id="container">
		<div class="holder top">
			<img src="http://www.placekitten.com/100/100" />
		</div>
		<div class="holder bottom">
			<img src="http://www.placekitten.com/100/100" />
		</div>
		<div class="current">
			<img src="http://www.placekitten.com/101/101" />
		</div>
	</div>
*/

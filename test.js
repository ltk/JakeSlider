
var slider = {
	self : this,

	// Our slides
	slides : new Array(),
	container : null,
	nav_container : null,

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
		this.remove_indicator();
		this.set_indicator(slide);

		return slide;
	}, 

	animate_slide_left : function(slide){
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

	animate_slide_right : function(slide){
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
		this.next_slide().dom_el.wrap('<div class="holder top">');
		this.next_slide().dom_el.clone().insertAfter(".holder").wrap('<div class="holder bottom">');
		this.current_slide.dom_el.addClass("current");
		var i = 0;
		$(".holder").animate({
			height : "50%",
			opacity: 1
		}, "slow", function() {
			i++;
			if (i == 2) {
				slider.current_slide.dom_el.unwrap().addClass("current");
				$(".holder.bottom").remove()
				slider.prev_slide().dom_el.removeClass("current");
			}
		});
	},

	set_indicator : function(slide) {
		 slide.nav_tab.addClass("current-nav");
	},

	remove_indicator : function() {
		for(slide in this.slides) {
			if(this.slides[slide] != this.current_slide){
				this.slides[slide].nav_tab.removeClass("current-nav");
			}
		}
		
	},

	scrape_slides_from : function(containing_id) {

	},

	run : function(params){
		this.current_slide.dom_el.fadeIn();
		this.nav_container = params.nav_container;

		$.each(this.slides, function(index, value) {
			slider.nav_container.append('<li id="jake-nav-slide-' + index + '" ' + (index == 0 ? 'class="current-nav"' : '') + '><a href="'+this.link+'">'+this.title+'</a></li>');
			slider.slides[index].nav_tab = $("#jake-nav-slide-" + index);
			$("#jake-nav-slide-0").addClass("current-nav")
		});

		setInterval(function() { slider.go_to("animate_split_vertical", slider.next_slide()) }, this.interval);
	}


}

$(function() {
	//	Add our slides to the slider
	slider.container = $('#container');
	slider.add_slide({ 
		dom_el : $('#brick'),
		title : "Glazed Brick",
		link : "#"
	});
	slider.add_slide({
		dom_el : $('#tile'),
		title : "Strucural Glazed Tile",
		link : "#"
	});
	slider.add_slide({
		dom_el : $('#trim'),
		title : "Trim Units",
		link : "#"
	});
	slider.add_slide({
		dom_el : $('#solar'),
		title : "Solar Screen",
		link : "#"
	});
	slider.add_slide({
		dom_el : $('#quikbase'),
		title : "Quik-Base",
		link : "#"
	});
	slider.add_slide({
		dom_el : $('#covebase'),
		title : "Cove Base",
		link : "#"
	});
	slider.add_slide({
		dom_el : $('#cerrastone'),
		title : "Cerrastone",
		link : "#"
	});

	params = {
		nav_container : $('#flash-nav')
	};

	slider.run(params);

});


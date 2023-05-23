(function() {
	'use strict';

	AOS.init({
		offset: 150,
		delay: 500,
		once: true
	});

	const portfolioClick = document.querySelector('.portfolio__item-click'),
		portfolioClickFollower = document.querySelector(".portfolio__item-click-follower");
	if ( portfolioClick && portfolioClickFollower ) {
		let imgs = document.querySelectorAll(".portfolio__item-img"),
			servicesItems = document.querySelectorAll('.services__item'),
			posX = 0,
			posY = 0,
			mouseX = 0,
			mouseY = 0;

		setInterval(function () {
			posX += (mouseX - posX) / 9;
			posY += (mouseY - posY) / 9;
			TweenMax.set(portfolioClickFollower, {
				css: {
					left: posX - 20,
					top: posY - 20
				}
			});
			TweenMax.set(portfolioClick, {
				css: {
					left: mouseX,
					top: mouseY
				}
			});

		}, 15);

		document.querySelector('body').addEventListener('mousemove', e => {
			mouseX = e.pageX;
			mouseY = e.pageY;
		});

		if (imgs.length > 0) {
			imgs.forEach(function (elem, index) {
				elem.addEventListener('mouseenter', e => {
					portfolioClickFollower.classList.add('_active');
				});
				elem.addEventListener('mouseleave', e => {
					portfolioClickFollower.classList.remove('_active');
				});
			});
		}

		if (servicesItems.length > 0) {
			servicesItems.forEach(function (elem, index) {
				elem.addEventListener('mouseenter', e => {
					let dataItem = elem.getAttribute('data-item'),
						dataSwipers = document.querySelectorAll('.services__follower-swiper');

					portfolioClickFollower.classList.add('_active');

					if ( dataSwipers.length > 0 ) {
						dataSwipers.forEach(item => {
							let dItem = item.getAttribute('data-item');
							if ( dItem === dataItem ) {
								item.classList.add('_active');
							} else {
								item.classList.remove('_active');
							}
						});
					}
				});
				elem.addEventListener('mouseleave', e => {
					portfolioClickFollower.classList.remove('_active');
				});
			});
		}
	}

	let typeSplit = new SplitType('.btn__title', {
		types: 'words, chars, lines',
		tagName: 'span'
	});

	function mainButtonHover() {
		$(".btn").each((function(e) {
			let o = $(this).find("._title1 .char"),
				t = $(this).find("._title2 .char"),
				i = gsap.timeline({
					paused: !0,
					defaults: {
						duration: .6,
						ease: "power4.inOut"
					}
				});
			i.to(o, {
				y: "-100%",
				stagger: {
					each: .03
				}
			}),
				i.from(t, {
					y: "100%",
					stagger: {
						each: .03
					}
				}, .1),
				$(this).on("mouseenter", (function() {
					i.isActive() || i.restart()
				}))
		}))
	}

	let mm = gsap.matchMedia();

	mm.add("(min-width: 992px)", (() => (mainButtonHover(), () => {})));

	const servicesItems = document.querySelectorAll('.services__item');
	if ( servicesItems.length > 0 ) {
		servicesItems.forEach(item => {
			$(item).on( "click", function() {
				item.classList.toggle('_active');
				$(this).find('.services__item-content').slideToggle('1500');
			});
		});
	}

	const servicesFollowersSwiper = document.querySelectorAll('.services__follower-swiper');
	if ( servicesFollowersSwiper.length > 0 ) {
		servicesFollowersSwiper.forEach((item) => {
			new Swiper(item, {
				effect: 'fade',
				speed: 500,
				fadeEffect: {
					crossFade: true
				},
				autoplay: {
					delay: 500,
					disableOnInteraction: false
				}
			});
		});
	}

	$(".services__item-link").mouseenter(function (e) {
		var parentOffset = $(this).offset();

		var relX = e.pageX - parentOffset.left;
		var relY = e.pageY - parentOffset.top;
		$(this).find(".services__item-link-circle").css({
			left: relX,
			top: relY,
		});
		$(this).find(".services__item-link-circle").removeClass("desplode-circle");
		$(this).find(".services__item-link-circle").addClass("explode-circle");
	});

	$(".services__item-link").mouseleave(function (e) {
		var parentOffset = $(this).offset();

		var relX = e.pageX - parentOffset.left;
		var relY = e.pageY - parentOffset.top;
		$(this).find(".services__item-link-circle").css({
			left: relX,
			top: relY,
		});
		$(this).find(".services__item-link-circle").removeClass("explode-circle");
		$(this).find(".services__item-link-circle").addClass("desplode-circle");
	});
})();
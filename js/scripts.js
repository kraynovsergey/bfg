(function() {
	'use strict';

	AOS.init({
		offset: 300,
		delay: 1000,
		once: true
	});

	const portfolioClick = document.querySelector('.portfolio__item-click'),
		portfolioClickFollower = document.querySelector(".portfolio__item-click-follower");
	if ( portfolioClick && portfolioClickFollower ) {
		let imgs = document.querySelectorAll(".portfolio__item-img"),
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

		imgs.forEach(function(elem, index){
			elem.addEventListener('mouseenter', e => {
				portfolioClickFollower.classList.add('_active');
			});
			elem.addEventListener('mouseleave', e => {
				portfolioClickFollower.classList.remove('_active');
			});
		});
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
})();
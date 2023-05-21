(function() {
	'use strict';

	const lazyLoadInstance = new LazyLoad();

	const portfolioItemsImg = document.querySelectorAll('.portfolio__item-img');
	if ( portfolioItemsImg.length > 0 ) {
		portfolioItemsImg.forEach(item => {
			let cl = item.querySelector('.portfolio__item-click')
			if ( cl ) {
				item.addEventListener('mousemove', (e) => {
					let rect = e.target.getBoundingClientRect();
					cl.style.left = e.clientX - rect.left - 60 + 'px';
					cl.style.top = e.clientY - rect.top - 60 + 'px';
				});
			}
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
import './scss/main.scss';

import $ from 'jquery';
import Inputmask from "inputmask";
import validate from 'jquery-validation';

import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm.js';

$(function() {

	$(document).ready(function() {

		$('.top-background-section :nth-of-type(2)').css('transform', 'rotate(30deg) translate(193px, -12px)');
		$('.top-background-section :nth-of-type(3)').css('transform', 'rotate(-15deg) translate(-1132px, -154px)');
		$('.top-background-section :nth-of-type(4)').css('transform', 'rotate(15deg) translate(290px, -35px)');
		$('.top-background-section :nth-of-type(5)').css('transform', 'rotate(20deg) translate(-908px, 300px)');
		$('.top-background-section :nth-of-type(6)').css('transform', 'rotate(-21deg) translate(404px, 121px)');
		$('.top-background-section :nth-of-type(7)').css('transform', 'rotate(15deg) translate(478px, -87px)')

		$(window).scroll(function() {
			const animatePoint = $(document).scrollTop() + $(window).height() / 2;
			const descriptionBlockTop = $('.description-block').offset().top - 200;

			if (animatePoint >= descriptionBlockTop) {
				$('.description-block div:nth-child(2)').css('transform', 'rotate(27deg) translate(165px, -57px)');
				$('.description-block div:nth-child(3)').css('transform', 'rotate(15deg) translate(290px, -28px)');
				$('.description-block div:nth-child(4)').css('transform', 'rotate(20deg) translate(-525px, -30px)');
				$('.description-block div:nth-child(5)').css('transform', 'rotate(-20deg) translate(-170px, -55px)');
				$('.description-block div:nth-child(6)').css('transform', 'rotate(-21deg) translate(-280px, -48px)');
			}
		});

		Inputmask({"mask": "+7 (999) 999-9999"}).mask($('input[type="tel"]'));

		$('form').each(function() {
			$(this).validate({
				errorPlacement(error, element) {
					return true;
				},
				focusInvalid: false,
				rules: {
					Имя: {
						required: true
					},
					Телефон: {
						required: true,
					},
					Почта: {
						required: true,
						email: true
					}
				},
				submitHandler(form) {
					const th = $(form);
	
					$.ajax({
						type: 'POST',
						url: '/assets/php/mail.php',
						data: th.serialize(),
					}).done(() => {
	
						th.trigger('reset');
						$('html, body').removeClass('hidden');
						$('.popup-container').fadeOut();
						
					});
	
					return false;
				}
			});
		});

		Swiper.use([Navigation, Pagination]);
		
		var mySwiper = new Swiper ('.examples-section__swiper-container', {
			direction: 'horizontal',
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			navigation: {
				nextEl: '.examples-section__button-slider_next',
				prevEl: '.examples-section__button-slider_prev'
			},
			pagination: {
				el: '.examples-section__pagination',
				type: 'bullets',
				clickable: true
			},
			breakpoints: {
				599: {
					slidesPerView: 2,
					spaceBetween: 35
				},
				1042: {
					slidesPerView: 3
				}
			}
		});

		$('body').on('click', '.header-left__link, .footer-top__link-left', function(event) {
			event.preventDefault();
			const currentSection = $(this).attr('href');
			const offset = $(currentSection).offset().top;

			$('body, html').animate({
				scrollTop: offset
			}, 1200);
		});

		$('body').on('click', '.top-background-section__button', function() {
			const offset = $('.what-i-to-do-section').offset().top;

			$('body, html').animate({
				scrollTop: offset
			}, 1200);
		});

		const buttonCallArray = Object.values($('.button-call'));

		$('body').on('click', '.button-call, .examples-section__button, .what-i-to-do-section__button', function(e) {
			$('html, body').addClass('hidden');
			$('.popup-container__input').val('');
			$('.popup-container__input').removeClass('error');

			if (buttonCallArray.includes(e.target)) {
				$('.popup-container_call').fadeIn();
			} else {
				$('.popup-container_project').fadeIn();
			}
		});

		$('body').on('click', '.popup-container_call, .popup-container_project, .popup-container__button_close, .popup-container__span', function(e) {
			if (e.target === this) {
				$('html, body').removeClass('hidden');
				$('.popup-container').fadeOut();
			}
		});

		$('body').on('click', '.header-left__button_open-menu', function() {
			$('.header-left__button_close-menu').show();
			$('.header-left__nav').show();
			$('.header-left__button_open-menu').hide();
			$('.header-right').addClass('flex-start');
		});

		$('body').on('click', '.header-left__button_close-menu', function() {
			$('.header-left__button_close-menu').hide();
			$('.header-left__nav').hide();
			$('.header-left__button_open-menu').show();
			$('.header-right').removeClass('flex-start');
		});
        
	});
});

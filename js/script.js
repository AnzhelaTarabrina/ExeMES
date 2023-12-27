// Меню бургер
const iconMenu = document.querySelector(".header__burger");
const menuBody = document.querySelector(".header__menu");
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        iconMenu.classList.toggle('open');
        menuBody.classList.toggle('open');
        document.body.classList.toggle('page__body--lock');
    })
}

window.onload = function () {
    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;
        if (targetElement.closest('.nav__item') && document.querySelector('.header__menu.open')) {
                document.querySelector('.header__menu').classList.remove('open');
                document.querySelector('.header__burger').classList.remove('open');
                document.body.classList.remove('page__body--lock');
        };
    }
}

// popup
const $popups = document.querySelectorAll('.popup');
$popups.forEach($popup => {
    $popup.addEventListener('click', e => {
    if (e.target === $popup) {
        close($popup);
    }

    if (e.target.classList.contains('popup__btn')) {
        close($popup);
    }

    if (e.target.classList.contains('js-close-popup')) {
        close($popup);
    }
    });
});

const $openBtns = document.querySelectorAll('.js-open-popup');
$openBtns.forEach($btn => {
    const name = $btn.dataset.popupName;
    $btn.addEventListener('click', () => {
        const $popup = document.querySelector(`.popup[data-popup-name="${name}"]`);
        open($popup);
    });
});

function open($popup) {
    $popup?.classList.add('popup--show');
    document.body.classList.add('page__body--lock');
}

function close($popup) {
    $popup?.classList.remove('popup--show');
    document.body.classList.remove('page__body--lock');
}

// Слайдер 
const swiper = new Swiper('.slider__swiper', {
    navigation: {
        nextEl: '.slider__btn--next',
        prevEl: '.slider__btn--prev',
    },
    slidesPerView: 1,
    spaceBetween: 20,
    });
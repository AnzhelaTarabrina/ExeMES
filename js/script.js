// Валидация
const validateForms = (selector, rules, afterSend) => {
    const form = document?.querySelector(selector);
    const telSelector = form?.querySelector('input[type="tel"]');

    if (!form) {
        console.error('Нет такого селектора!');
        return false;
    }

    if (!rules) {
        console.error('Вы не передали правила валидации!');
        return false;
    }

    if (telSelector) {
        const inputMask = new Inputmask('+7 (999) 999-99-99');
        inputMask.mask(telSelector);

        for (let item of rules) {
        if (item.tel) {
            item.rules.push({
            rule: 'function',
            validator: function() {
                const phone = telSelector.inputmask.unmaskedvalue();
                return phone.length === 10;
            },
            errorMessage: item.telError
            });
        }
        }
    }

    const validation = new JustValidate(selector);

    for (let item of rules) {
        validation
        .addField(item.ruleSelector, item.rules);
    }

    validation.onSuccess((ev) => {
        let formData = new FormData(ev.target);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            if (afterSend) {
                afterSend();
            }
            console.log('Отправлено');
            }
        }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        ev.target.reset();
    })
};

const rules = [
    {
        ruleSelector: '.input-name',
        rules: [
        {
            rule: 'minLength',
            value: 3
        },
        {
            rule: 'required',
            value: true
        }
        ]
    },
    {
        ruleSelector: '.input-email',
        rules: [
        {
            rule: 'email',
            value: true,
            errorMessage: 'Введите корректтные email!'
        },
        {
            rule: 'required',
            value: true
        }
        ]
    },
    {
        ruleSelector: '.input-tel',
        tel: true,
        telError: 'Введите корректный телефон',
        rules: [
            {
                rule: 'required',
                value: true
            }
        ]
    },
    {
        ruleSelector: '.input-checkbox',
        rules: [
        {
            rule: 'required',
            value: true
        }
        ]
    },
    ];

    const afterForm = () => {
        console.log('Произошла отправка');
        sendAnimation();
    };
    
    validateForms('.contact-us__form', rules, afterForm);


// Анимация отправки сообщения
const sendAnimation = () => {
    document.querySelector('.form__btn-message').classList.add("form__btn-message--active");
    document.querySelector('.animation-form').classList.add("animation-form--active");
}


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
    loop: true,
    });
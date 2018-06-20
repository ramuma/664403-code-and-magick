'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardAmount = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var userDialog = document.querySelector('.setup');

// Находим блок с похожими персонажами, шаблон и элемент, куда будем вставлять похожих персонажей

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

// Случайный элемент массива

var getRandomElement = function (arr) {
  var randomElement = Math.floor(Math.random() * arr.length);

  return arr[randomElement];
};

// Создаём массив персонажей со случайными параметрами

var generateWizards = function (amount) {
  var similarWizards = [];

  for (var i = 0; i < amount; i++) {
    var wizardFeatures = {};

    wizardFeatures.name =
      getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES);
    wizardFeatures.coatColor = getRandomElement(COAT_COLORS);
    wizardFeatures.eyesColor = getRandomElement(EYES_COLORS);

    similarWizards.push(wizardFeatures);
  }

  return similarWizards;
};

// Отрисуем шаблон в документ и вставим данные

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = generateWizards(wizardAmount);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizardAmount; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Открытие/закрытие окна настройки персонажа
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var nameForm = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (nameForm === document.activeElement) {
    return evt;
  } else {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
    return evt;
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Изменение цвета мантии, глаз, фаербола персонажа по нажатию
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var inputWizardCoat = setup.querySelector('input[name="coat-color"]');
var inputWizardEyes = setup.querySelector('input[name="eyes-color"]');
var inputFireball = setup.querySelector('input[name="fireball-color"]');

var changeWizard = function (array, element, property, input) {
  var color = getRandomElement(array);
  element.style[property] = color;
  input.setAttribute('value', color);
};

wizardCoat.addEventListener('click', function () {
  changeWizard(COAT_COLORS, wizardCoat, 'fill', inputWizardCoat);
});

wizardEyes.addEventListener('click', function () {
  changeWizard(EYES_COLORS, wizardEyes, 'fill', inputWizardEyes);
});

wizardFireball.addEventListener('click', function () {
  changeWizard(FIREBALL_COLORS, wizardFireball, 'backgroundColor', inputFireball);
});

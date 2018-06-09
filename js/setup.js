'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardAmount = 4;

// Показываем окно настроек

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Находим блок с похожими персонажами, шаблон и элемент, куда будем вставлять похожих персонажей

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

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

    wizardFeatures.name = getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES);
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

userDialog.querySelector('.setup-similar').classList.remove('hidden');

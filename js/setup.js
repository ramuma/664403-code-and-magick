'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Показываем окно настроек

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Находим блок с похожими персонажами, шаблон и элемент, куда будем вставлять похожих персонажей

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// Тасование Фишера-Йетса

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

shuffleArray(WIZARD_NAMES);
shuffleArray(WIZARD_SURNAMES);
shuffleArray(COAT_COLORS);
shuffleArray(EYES_COLORS);

// Массив объектов с персонажами

var wizards = [{
  name: WIZARD_NAMES[0] + ' ' + WIZARD_SURNAMES[0],
  coatColor: COAT_COLORS[0],
  eyesColor: EYES_COLORS[0]
},
{
  name: WIZARD_NAMES[1] + ' ' + WIZARD_SURNAMES[1],
  coatColor: COAT_COLORS[1],
  eyesColor: EYES_COLORS[1]
},
{
  name: WIZARD_NAMES[2] + ' ' + WIZARD_SURNAMES[2],
  coatColor: COAT_COLORS[2],
  eyesColor: EYES_COLORS[2]
},
{
  name: WIZARD_NAMES[3] + ' ' + WIZARD_SURNAMES[3],
  coatColor: COAT_COLORS[3],
  eyesColor: EYES_COLORS[3]
}
];

// Отрисуем шаблон в документ и вставим данные

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

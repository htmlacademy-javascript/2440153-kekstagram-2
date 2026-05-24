const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const EFFECTS_CONFIG = {
  none: {
    min: 0,
    max: 0,
    step: 0,
    style: '',
    unit: '',
  },
  chrome: {
    min: 0.1,
    max: 1,
    step: 0.1,
    style: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    style: 'brightness',
    unit: '',
  },
};

const imageUploadWrapper = document.querySelector('.img-upload__wrapper');
const imageEffectLevel = imageUploadWrapper.querySelector('.img-upload__effect-level');
const imageEffectSlider = imageUploadWrapper.querySelector('.effect-level__slider');
const effectLevelValue = imageUploadWrapper.querySelector('.effect-level__value');
const effectsList = imageUploadWrapper.querySelector('.effects__list');
const imageUploadScale = imageUploadWrapper.querySelector('.img-upload__scale');
const scaleControlValue = imageUploadScale.querySelector('.scale__control--value');

const imageUploadPreview = imageUploadWrapper.querySelector('.img-upload__preview');
const previewImage = imageUploadPreview.querySelector('img');

let currentEffect = 'none';
imageEffectLevel.classList.add('hidden');

imageUploadScale.addEventListener('click', (evt) => {
  let currentValue = parseInt(scaleControlValue.value, 10);

  if (evt.target.classList.contains('scale__control--smaller')) {
    currentValue = Math.max(MIN_SCALE, currentValue - SCALE_STEP);
  } else if (evt.target.classList.contains('scale__control--bigger')) {
    currentValue = Math.min(MAX_SCALE, currentValue + SCALE_STEP);
  } else {
    return;
  }

  scaleControlValue.value = `${currentValue}%`;
  previewImage.style.transform = `scale(${currentValue / 100})`;
});

noUiSlider.create(imageEffectSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

imageEffectLevel.classList.add('hidden');

imageEffectSlider.noUiSlider.on('update', () => {
  const modelSlider = imageEffectSlider.noUiSlider.get(true);
  const effectData = EFFECTS_CONFIG[currentEffect];

  if (currentEffect !== 'none') {
    effectLevelValue.value = modelSlider;
    imageUploadPreview.style.filter = `${effectData.style}(${modelSlider}${effectData.unit})`;
  } else {
    imageUploadPreview.style.filter = '';
    effectLevelValue.value = '';
  }
});

effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    imageEffectLevel.classList.add('hidden');
    imageUploadPreview.style.filter = '';
  } else {
    imageEffectLevel.classList.remove('hidden');

    const effectData = EFFECTS_CONFIG[currentEffect];

    imageEffectSlider.noUiSlider.updateOptions({
      range: {
        min: effectData.min,
        max: effectData.max,
      },
      start: effectData.max,
      step: effectData.step,
    });
  }
});



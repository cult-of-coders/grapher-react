import defaults from './defaults';

export default function setDefaults(newDefaults) {
  Object.assign(defaults, newDefaults);
}

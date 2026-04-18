// src/shared/lib/abilities.js

export function can(abilities, ability) {
  return Array.isArray(abilities) && abilities.includes(ability);
}
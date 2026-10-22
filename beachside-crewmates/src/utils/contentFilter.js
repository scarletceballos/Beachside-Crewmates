
import Filter from 'bad-words';

const filter = new Filter();

const MAX_LENGTHS = {
  name: 40,
  specialty: 100,
  personality: 100,
  favorite_activity: 150,
  favorite_phrase: 150,
};

export function validateVillager(villager) {
  for (const [field, maxLength] of Object.entries(MAX_LENGTHS)) {
    const value = String(villager[field] ?? '').trim();

    if (value.length > maxLength) {
      return `${field.replaceAll('_', ' ')} is too long.`;
    }

    if (filter.isProfane(value)) {
      return 'Please remove inappropriate language before submitting.';
    }
  }

  return null;
}

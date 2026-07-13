// Генерация bcrypt-хеша пароля для ADMIN_PASSWORD_HASH.
// Использование: npm run hash -- "мой-пароль"
import * as bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password) {
  console.error('Usage: npm run hash -- "<password>"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log('\nADMIN_PASSWORD_HASH=' + hash + '\n');
console.log('Вставьте строку выше в backend/.env (заменит ADMIN_PASSWORD).');

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
// загружаем переменные из файла .env
dotenv.config();
async function fetchTableSupabase() {
  try {
    // Выполняем запрос к таблице test_table
    const { data, error } = await supabase
      .from(supabaseTableName) // Имя таблицы
      .select('*'); // Выбираем все столбцы

    if (error) {
      console.error('Ошибка при получении данных:', error);
      return;
    }

    console.log('Данные таблицы :', data);
  } catch (err) {
    console.error('Неожиданная ошибка:', err);
  }
}

console.log('\n== SUPABASE ==');
await fetchTableSupabase();

# Автоматично обновяване на резултати от api-football.com

Този скрипт тегли резултатите от мачовете на FIFA World Cup 2026 от
[api-football.com](https://www.api-football.com/) (Free план) и записва
`results.json` / `data/results.json` във формата, който приложението
вече използва. Приложението автоматично презарежда тези файлове на
всеки 60 секунди — не трябва да правиш нищо допълнително.

## Еднократна настройка

1. **Инсталирай Node.js** (ако нямаш): https://nodejs.org (LTS версия)

2. **Копирай `.env.example` като `.env`** в папка `scripts/`:
   ```
   copy .env.example .env
   ```

3. **Отвори `.env`** и сложи своя API ключ от api-football.com:
   ```
   API_FOOTBALL_KEY=твоят_истински_ключ
   SEASON=2026
   LEAGUE_ID=1
   ```

   Ключът се намира в твоето табло (Dashboard) на api-football.com /
   RapidAPI, в секция "My Apps" / "API Key".

   ⚠️ **LEAGUE_ID = 1** е стандартният ID за "World Cup" в api-football.com.
   Ако скриптът не намира мачове, провери в API документацията дали
   World Cup 2026 има друг league ID за твоя план.

## Ръчно стартиране

Двукратно кликни на `update-results.bat` или изпълни:

```
cd scripts
node update-results.js
```

Ще видиш съобщение колко мача са открити и записани.

## Автоматично на всеки X минути (Windows Task Scheduler)

1. Отвори **Task Scheduler** (Програмен планировчик)
2. **Create Task** (Създай задача)
3. **General**: дай име напр. "FIFA Results Update"
4. **Triggers** → New → "Daily", повтори на всеки **30 минути**
   (или по-малко, имай предвид лимита от 100 заявки/ден за Free план —
   30 мин = 48 заявки/ден, безопасно)
5. **Actions** → New → Start a program:
   - Program/script: пълният път до `update-results.bat`
     (напр. `C:\fifa-main\scripts\update-results.bat`)
   - Start in: папката `scripts` (напр. `C:\fifa-main\scripts`)
6. Save

Готово — резултатите ще се обновяват автоматично, а приложението вече
ги показва само от `results.json`.

## Лимити на Free плана

Free планът на api-football.com позволява **100 заявки на ден**.
Скриптът прави **само 1 заявка** на стартиране (тегли всички мачове
наведнъж), така че можеш да го пускаш до ~90 пъти дневно безопасно.
На всеки 30 минути = 48 пъти/ден — добра честота за live резултати.

## Проблеми

- **"Липсва API ключ"** → провери дали `.env` файлът съществува в `scripts/`
  и съдържа правилния ключ.
- **"Намерени резултати за 0 мача"** → провери `LEAGUE_ID` и `SEASON`,
  възможно е World Cup 2026 да има друг league ID в твоя план. Виж
  отговора от API през `https://v3.football.api-sports.io/leagues?search=world cup`.
- **Имената на отборите не съвпадат** → ако API връща различно име от
  очакваното (напр. "Czech Republic" вместо "Czechia"), добави го в
  `nameAliases` в `update-results.js`.

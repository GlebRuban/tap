import {Telegraf, Markup} from 'telegraf'

const token = '7703225551:AAG70_9QZWMvkH3Fw6RQFX8OSXOWn9bI42k'
const webAppUrl = 'https://clicker-pro-d9590.web.app'
const bot = new Telegraf(token);

(function() {
  // Проверяем, доступен ли Telegram WebApp API
  if (typeof window.Telegram === "undefined" || !window.Telegram.WebApp) {
      document.body.innerHTML = `
          <div style="text-align: center; margin-top: 50px;">
              <h1>Эта страница должна быть открыта через Telegram Mini App.</h1>
          </div>
      `;
      return;
  }

  const webApp = window.Telegram.WebApp;

  // Получаем платформу, на которой запущено приложение
  const platform = webApp.platform; // "mobile", "desktop", "web"

  if (platform === "desktop") {
      // Если приложение запущено на десктопной версии Telegram
      document.body.innerHTML = `
          <div style="text-align: center; margin-top: 50px;">
              <h1>Это приложение нельзя запускать на ПК.</h1>
              <p>Пожалуйста, откройте мини-приложение через Telegram на мобильном устройстве.</p>
          </div>
      `;
      webApp.close(); // Закрываем мини-приложение
      return;
  }

  if (platform !== "mobile") {
      // Если приложение не запущено на мобильном устройстве
      document.body.innerHTML = `
          <div style="text-align: center; margin-top: 50px;">
              <h1>Это приложение доступно только на мобильных устройствах.</h1>
          </div>
      `;
      webApp.close(); // Закрываем мини-приложение
      return;
  }

  // Если всё в порядке, инициализируем приложение
  initApp();
  function initApp() {
    bot.command('start', (ctx) => {
      ctx.reply(
        'Open app ', Markup.inlineKeyboard([
          Markup.button.webApp(
            'Clicker app', `${webAppUrl}?ref=${ctx.payload}`
          )
        ])
      )
    })
    bot.launch()
  }
})();
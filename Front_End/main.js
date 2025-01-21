
document.addEventListener("DOMContentLoaded", () => {
    // Функция для вывода времени
    function updateTime() {
        const now = new Date(); // Получаем текущее время
        const hours = now.getHours().toString().padStart(2, '0'); // Часы (с ведущим нулем)
        const minutes = now.getMinutes().toString().padStart(2, '0'); // Минуты (с ведущим нулем)
    
        // Получаем смещение временной зоны в минутах и преобразуем его в часы
        const timezoneOffset = now.getTimezoneOffset();
        console.log(timezoneOffset);
        const sign = timezoneOffset > 0 ? '-' : '+'; // Определяем знак (минус для восточного времени, плюс для западного)
        const hoursOffset = Math.abs(timezoneOffset) / 60; // Переводим смещение в часы
        const offsetString = `(UTC${sign}${hoursOffset})`; // Форматируем смещение без ведущих нулей
    
        const timeString = `${hours}:${minutes}`; // Формируем строку времени в локальном часовом поясе
    
        // Обновляем содержимое элемента, добавляя время и временную зону
        document.getElementById('TimeBoxItem').textContent = `${timeString} ${offsetString}`;
    }
    updateTime()
});

// Устанавливаем сегодняшнюю дату по умолчанию
document.getElementById('entryDate').valueAsDate = new Date();

// Открытие модального окна
document.getElementById('addEntryBtn').addEventListener('click', function() {
    const modal = document.getElementById('addEntryModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Закрытие модального окна
document.querySelectorAll('.modal-close, .modal-close-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Обработчик сохранения записи
document.getElementById('saveEntryBtn').addEventListener('click', function() {
    const date = document.getElementById('entryDate').value;
    const description = document.getElementById('entryDescription').value;
    const status = document.getElementById('entryStatus').value;

    if (!date || !description) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }

    // Форматируем дату
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
    });

    // Создаем элемент для новой записи
    const newEntry = document.createElement('div');
    newEntry.className = 'diary-entry';
    
    // Определяем иконку статуса
    let statusIcon = '';
    switch(status) {
        case 'completed':
            statusIcon = '<span class="status-completed">✓</span>';
            break;
        case 'in-progress':
            statusIcon = '<span class="status-in-progress">🔄</span>';
            break;
        case 'planned':
            statusIcon = '<span class="status-planned">📅</span>';
            break;
    }

    newEntry.innerHTML = `
        <span>${formattedDate}</span>
        <span>${description}</span>
        ${statusIcon}
    `;

    // Добавляем новую запись в начало списка
    const diaryEntries = document.getElementById('diaryEntries').querySelector('.card-content');
    diaryEntries.insertBefore(newEntry, diaryEntries.firstChild);

    // Закрываем модальное окно и очищаем форму
    const modal = document.getElementById('addEntryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('newEntryForm').reset();
    document.getElementById('entryDate').valueAsDate = new Date();
});

// Закрытие модального окна при клике вне его
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
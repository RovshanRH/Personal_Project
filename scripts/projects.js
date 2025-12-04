let previousActiveElement = null;
        let currentModal = null;

        // Открытие модальных окон
        document.querySelectorAll('.modal-trigger').forEach(button => {
            button.addEventListener('click', function () {
                previousActiveElement = document.activeElement;
                const modalId = this.getAttribute('data-modal');
                currentModal = document.getElementById(modalId);

                // Показываем модальное окно
                currentModal.style.display = 'block';
                document.body.style.overflow = 'hidden';

                // Устанавливаем фокус на первый фокусируемый элемент в модалке
                const focusableElements = getFocusableElements(currentModal);
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                } else {
                    currentModal.focus();
                }

                // Добавляем слушатель для клавиши Escape
                document.addEventListener('keydown', handleKeyDown);

                // Скрываем остальной контент от скринридеров
                document.querySelectorAll('body > *:not(.modal):not(header):not(footer)')
                    .forEach(el => el.setAttribute('aria-hidden', 'true'));
            });
        });

        // Получение всех фокусируемых элементов внутри модалки
        function getFocusableElements(modal) {
            return modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
        }

        // Функция для обработки клавиш (Tab и Escape)
        function handleKeyDown(event) {
            // Обработка Escape
            if (event.key === 'Escape' && currentModal) {
                closeModal(currentModal);
                return;
            }

            // Обработка Tab только если модалка открыта
            if (event.key === 'Tab' && currentModal) {
                const focusableElements = getFocusableElements(currentModal);

                // Если нет фокусируемых элементов, блокируем Tab
                if (focusableElements.length === 0) {
                    event.preventDefault();
                    return;
                }

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                // Если нажата Shift+Tab и фокус на первом элементе
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
                // Если нажат Tab и фокус на последнем элементе
                else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
                // Если фокус вне модалки, перемещаем его на первый элемент
                else if (!currentModal.contains(document.activeElement)) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }

        // Функция закрытия модального окна
        function closeModal(modal) {
            if (!modal) return;

            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleKeyDown);

            // Восстанавливаем видимость контента для скринридеров
            document.querySelectorAll('body > *[aria-hidden="true"]')
                .forEach(el => el.removeAttribute('aria-hidden'));

            // Возвращаем фокус на предыдущий активный элемент
            if (previousActiveElement) {
                previousActiveElement.focus();
            }

            currentModal = null;
        }

        // Закрытие по кнопке закрытия и кнопке "Закрыть"
        document.querySelectorAll('.modal-close, .modal-close-btn').forEach(button => {
            button.addEventListener('click', function () {
                const modal = this.closest('.modal');
                closeModal(modal);
            });
        });

        // Закрытие по клику вне модального окна
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function (event) {
                if (event.target === this) {
                    closeModal(this);
                }
            });
        });
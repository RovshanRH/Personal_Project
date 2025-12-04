const emailInput = document.getElementById('email');
                            const errorSpan = document.getElementById('emailHelp');

                            function validateEmail() {
                                const isValid = emailInput.checkValidity(); // Проверка браузером

                                if (!isValid) {
                                    emailInput.setAttribute('aria-invalid', 'true');
                                    errorSpan.style.display = 'block';
                                } else {
                                    emailInput.setAttribute('aria-invalid', 'false');
                                    errorSpan.style.display = 'none';
                                }
                            }

                            emailInput.addEventListener('blur', validateEmail);

document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Сообщение отправлено! (Это демо-версия)');
            this.reset();
        });
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('input[type="submit"]');
        const originalText = submitButton.value;
        
        // Show loading state
        submitButton.value = 'Enviando...';
        submitButton.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Send request
        fetch('/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                alert('Solicitud enviada exitosamente!');
                form.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar la solicitud');
        })
        .finally(() => {
            // Reset button state
            submitButton.value = originalText;
            submitButton.disabled = false;
        });
    });
});
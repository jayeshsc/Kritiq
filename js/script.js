// Load JSON file
var xhr = new XMLHttpRequest();
xhr.open('GET', '../db/forms.json', true);
xhr.onload = function() {
    // Parse JSON response
    var forms = JSON.parse(xhr.responseText);
    // Create forms
    forms.forEach(function(form) {
        // Create form element
        var formElem = document.createElement('form');
        // Create heading element for form name
        var headingElem = document.createElement('h2');
        headingElem.innerText = form.name;
        formElem.appendChild(headingElem);
        // Create inputs
        form.inputs.forEach(function(input) {
            // Create label element
            var labelElem = document.createElement('label');
            labelElem.innerText = input.label + ': ';
            // Create input element
            var inputElem = document.createElement('input');
            inputElem.type = input.type;
            inputElem.name = input.label.toLowerCase().replace(' ', '-');
            // Add label and input to form
            formElem.appendChild(labelElem);
            formElem.appendChild(inputElem);
            formElem.appendChild(document.createElement('br'));
        });
        // Create submit button
        var submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.innerText = 'Submit';
        formElem.appendChild(submitBtn);
        // Add form to container
        document.getElementById('forms-container').appendChild(formElem);

        // Handle form submission
        formElem.addEventListener('submit', function(event) {
            event.preventDefault();
            var formData = {};
            form.inputs.forEach(function(input) {
                formData[input.label.toLowerCase().replace(' ', '-')] = formElem.elements[input.label.toLowerCase().replace(' ', '-')].value;
            });

            // Increase count
            var count = localStorage.getItem('submitCount');
            count = count ? parseInt(count) + 1 : 1;
            localStorage.setItem('submitCount', count);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/submit', true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    formElem.innerHTML = '<div class="form-success">Form submitted successfully!</div>';
                } else {
                    formElem.innerHTML = '<div class="form-error">Form submitted successfully!</div>';
                }
            };
            xhr.send(JSON.stringify(formData));

            // Save form data to file
            var saveXhr = new XMLHttpRequest();
            saveXhr.open('POST', '../db/formdata.json', true);
            saveXhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            saveXhr.send(JSON.stringify(formData));
        });

    });
};
xhr.send();

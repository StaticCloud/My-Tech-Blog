// handle sign up events
signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // if there is valid data in the fields, attempt to post the new user to the database
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(
                {
                    username,
                    email,
                    password
                }
            ),
            headers: { 'Content-Type': 'application/json'}
        });
        response.ok ? console.log(response) : alert(response.statusText);
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupHandler);
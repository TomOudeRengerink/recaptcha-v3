[![Google reCAPTCHA v3](https://jackaldigitalmedia.com/wp-content/uploads/2020/02/hero-recaptcha-invisible.gif)](https://developers.google.com/recaptcha/docs/v3)

### [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) returns a score for each request without user friction. The score is based on interactions with your site and enables you to take an appropriate action for your site.

Why use this library?
While using the default approach from the documentation of reCAPTCHA v3
you will notice that the performance of your application will drastically decrease.

This library is a wrapper around the client side integration and makes sure the initialization
will be executed after a form interaction is detected. This is done by listening to input events within the form.

## Getting started

Pull-in a latest version with NPM ...

```bash
yarn add @tomouderengerink/recaptcha-v3
```

Initialize reCAPTCHA to a form element

```js
// Import the Recaptcha class into your JS file
import Recaptcha from "@cube/recaptcha-v3";

// Create a new instance and provide your public site key
const recaptcha = new Recaptcha('<reCAPTCHA_site_key>');

// Apply reCAPTCHA to a specific form
recaptcha.addForm(<HTMLFormElement>);
```

Retrieve a Token for validation

```js
grecaptcha.ready(async () => {
  try {
    const token = await grecaptcha.execute(recaptcha.siteKey, { action: "submit" });
    // Send the token to your back-end to do validation
  } catch (err) {
    // Something wen't wrong fetching the token
  };
);
```

## Supported types
* Input 'text'
* Input 'number'
* Input 'email'
* Input 'radio'
* Input 'checkbox'

## Author

- [Tom Oude Rengerink](https://github.com/TomOudeRengerink)

## License

Licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).

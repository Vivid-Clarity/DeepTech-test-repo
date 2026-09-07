import { useState } from 'react';
import FormField from '../components/FormField';
import './Contact.css';

const emptyForm = { name: '', email: '', phone: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address, like name@example.com.';
  }
  if (values.phone.trim() && !/^[0-9+()\s-]{8,20}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number, or leave this field blank.';
  }
  if (!values.message.trim()) {
    errors.message = 'Please enter a message.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Your message should be at least 10 characters long.';
  }
  return errors;
}

function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSubmitted(true);
      setValues(emptyForm);
    }
  }

  return (
    <div className="container page contact">
      <h1>Contact us</h1>
      <p className="lead">
        Questions about catering, allergies or anything else? Send us a message and we'll get back
        to you within two working days.
      </p>

      {submitted ? (
        <div className="form-success" role="status">
          <h2>Thanks for getting in touch!</h2>
          <p>We've received your message and will reply as soon as we can.</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setSubmitted(false)}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit} noValidate>
          <FormField
            id="contact-name"
            name="name"
            label="Name"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormField
            id="contact-email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            id="contact-phone"
            name="phone"
            type="tel"
            label="Phone"
            optional
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormField
            id="contact-message"
            name="message"
            as="textarea"
            rows={6}
            label="Message"
            value={values.message}
            onChange={handleChange}
            error={errors.message}
          />
          <button type="submit" className="button">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;

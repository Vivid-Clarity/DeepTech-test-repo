import { useState } from 'react';
import FormField from '../components/FormField';
import './Book.css';

// TODO: pull these from business hours instead of hardcoding
const timeSlots = ['8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm'];
const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

const emptyBooking = {
  date: '',
  time: '',
  partySize: '2',
  name: '',
  email: '',
  phone: '',
  notes: '',
};

function todayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function validateStep(step, booking) {
  const errors = {};
  if (step === 1) {
    if (!booking.date) errors.date = 'Please choose a date.';
    else if (booking.date < todayString()) errors.date = 'Please choose a date in the future.';
    if (!booking.time) errors.time = 'Please choose a time.';
  }
  if (step === 2) {
    if (!booking.partySize) errors.partySize = 'Please choose how many people are coming.';
  }
  if (step === 3) {
    if (!booking.name.trim()) errors.name = 'Please enter your name.';
    if (!booking.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email.trim())) {
      errors.email = 'Please enter a valid email address, like name@example.com.';
    }
    if (!booking.phone.trim())
      errors.phone = 'Please enter a phone number in case we need to reach you.';
  }
  return errors;
}

function Book() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState(emptyBooking);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setBooking((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleNext(event) {
    event.preventDefault();
    const found = validateStep(step, booking);
    setErrors(found);
    if (Object.keys(found).length === 0) setStep((s) => s + 1);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  return (
    <div className="container page book">
      <h1>Book a table</h1>
      <p className="step-count">Step {Math.min(step, 3)} of 3</p>

      {step === 1 && (
        <form onSubmit={handleNext} noValidate>
          <h2>Date and time</h2>
          <FormField
            id="booking-date"
            name="date"
            type="date"
            label="Date"
            min={todayString()}
            value={booking.date}
            onChange={handleChange}
            error={errors.date}
          />
          <FormField
            id="booking-time"
            name="time"
            as="select"
            label="Time"
            value={booking.time}
            onChange={handleChange}
            error={errors.time}
          >
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </FormField>
          <div className="step-actions">
            <button type="submit" className="button">
              Next
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNext} noValidate>
          <h2>Party size</h2>
          <FormField
            id="booking-party-size"
            name="partySize"
            as="select"
            label="Number of guests"
            value={booking.partySize}
            onChange={handleChange}
            error={errors.partySize}
          >
            {partySizes.map((size) => (
              <option key={size} value={size}>
                {size === 1 ? '1 person' : `${size} people`}
              </option>
            ))}
          </FormField>
          <p className="hint">For groups larger than 8, please call us on (03) 9555 0142.</p>
          <div className="step-actions">
            <button type="button" className="button button-secondary" onClick={handleBack}>
              Back
            </button>
            <button type="submit" className="button">
              Next
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleNext} noValidate>
          <h2>Your details</h2>
          <FormField
            id="booking-name"
            name="name"
            label="Name"
            autoComplete="name"
            value={booking.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormField
            id="booking-email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            value={booking.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            id="booking-phone"
            name="phone"
            type="tel"
            label="Phone"
            autoComplete="tel"
            value={booking.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormField
            id="booking-notes"
            name="notes"
            as="textarea"
            rows={3}
            label="Special requests"
            optional
            value={booking.notes}
            onChange={handleChange}
          />
          <div className="step-actions">
            <button type="button" className="button button-secondary" onClick={handleBack}>
              Back
            </button>
            <button type="submit" className="button">
              Next
            </button>
          </div>
        </form>
      )}

      {/* WIP: confirmation step */}
      {step === 4 && <p>Booking confirmation coming soon.</p>}
    </div>
  );
}

export default Book;

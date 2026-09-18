import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import { business } from '../data/business';
import { usePageTitle } from '../hooks/usePageTitle';
import './Book.css';

const steps = ['Date & time', 'Party size', 'Your details', 'Confirm'];
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

function formatDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function guestsLabel(size) {
  return Number(size) === 1 ? '1 person' : `${size} people`;
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
  usePageTitle('Book a Table');

  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState(emptyBooking);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

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

  function handleConfirm(event) {
    event.preventDefault();
    setConfirmed(true);
  }

  function startOver() {
    setBooking(emptyBooking);
    setErrors({});
    setStep(1);
    setConfirmed(false);
  }

  if (confirmed) {
    return (
      <div className="container page book">
        <div className="form-success booking-confirmed" role="status">
          <h1>Your table is booked!</h1>
          <p>
            Thanks, {booking.name.trim()}. We&apos;ve reserved a table for{' '}
            {guestsLabel(booking.partySize)} on {formatDate(booking.date)} at {booking.time}. A
            confirmation email is on its way to {booking.email.trim()}.
          </p>
          <div className="step-actions">
            <button type="button" className="button" onClick={startOver}>
              Make another booking
            </button>
            <Link to="/menu" className="button button-secondary">
              Browse the menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container page book">
      <h1>Book a table</h1>
      <p className="lead">
        Reserve a table for breakfast or lunch. Walk-ins are always welcome too.
      </p>

      <ol className="booking-steps">
        {steps.map((label, index) => {
          const number = index + 1;
          let status = 'upcoming';
          if (number < step) status = 'done';
          if (number === step) status = 'current';
          return (
            <li
              key={label}
              className={`booking-step ${status}`}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              <span className="booking-step-number">{number}</span>
              <span className="booking-step-label">{label}</span>
            </li>
          );
        })}
      </ol>

      <div className="booking-panel">
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
                  {guestsLabel(size)}
                </option>
              ))}
            </FormField>
            <p className="hint">For groups larger than 8, please call us on {business.phone}.</p>
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

        {step === 4 && (
          <form onSubmit={handleConfirm}>
            <h2>Check your booking</h2>
            <dl className="booking-summary">
              <div>
                <dt>Date</dt>
                <dd>{formatDate(booking.date)}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{booking.time}</dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>{guestsLabel(booking.partySize)}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>{booking.name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{booking.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{booking.phone}</dd>
              </div>
              {booking.notes.trim() && (
                <div>
                  <dt>Special requests</dt>
                  <dd>{booking.notes}</dd>
                </div>
              )}
            </dl>
            <div className="step-actions">
              <button type="button" className="button button-secondary" onClick={handleBack}>
                Back
              </button>
              <button type="submit" className="button">
                Confirm booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Book;

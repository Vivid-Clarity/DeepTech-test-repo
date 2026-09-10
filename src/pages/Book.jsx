import { useState } from 'react';
import FormField from '../components/FormField';
import './Book.css';

// TODO: pull these from business hours instead of hardcoding
const timeSlots = ['8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm'];

function todayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function Book() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({ date: '', time: '' });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setBooking((current) => ({ ...current, [name]: value }));
  }

  function handleNext(event) {
    event.preventDefault();
    const found = {};
    if (!booking.date) found.date = 'Please choose a date.';
    if (!booking.time) found.time = 'Please choose a time.';
    setErrors(found);
    if (Object.keys(found).length === 0) setStep(2);
  }

  return (
    <div className="container page book">
      <h1>Book a table</h1>

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
          <button type="submit" className="button">
            Next
          </button>
        </form>
      )}

      {/* WIP: remaining steps */}
      {step === 2 && <p>More booking steps coming soon.</p>}
    </div>
  );
}

export default Book;

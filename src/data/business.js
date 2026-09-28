export const business = {
  name: 'Ember & Oak',
  address: {
    street: '42 Kiln Lane',
    locality: 'Millbrook VIC 3155',
  },
  phone: '(03) 9555 0142',
  email: 'hello@emberandoak.example',
  hours: [
    { days: 'Monday – Friday', time: '7:00 am – 4:00 pm' },
    { days: 'Saturday', time: '8:00 am – 3:00 pm' },
    { days: 'Sunday', time: '8:00 am – 2:00 pm' },
  ],
  // Structured version of `hours` above, used to work out whether we're open right now.
  // `day` follows Date#getDay (0 = Sunday … 6 = Saturday); times are 24-hour "HH:mm".
  schedule: [
    { day: 0, open: '08:00', close: '14:00' },
    { day: 1, open: '07:00', close: '16:00' },
    { day: 2, open: '07:00', close: '16:00' },
    { day: 3, open: '07:00', close: '16:00' },
    { day: 4, open: '07:00', close: '16:00' },
    { day: 5, open: '07:00', close: '16:00' },
    { day: 6, open: '08:00', close: '15:00' },
  ],
};

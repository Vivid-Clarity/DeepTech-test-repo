import { useEffect, useState } from 'react';
import { business } from '../data/business';
import { isOpenNow } from '../utils/openStatus';

function OpenStatus() {
  const [open, setOpen] = useState(() => isOpenNow(business.schedule));

  useEffect(() => {
    const id = setInterval(() => setOpen(isOpenNow(business.schedule)), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={open ? 'open-status open' : 'open-status closed'}>
      <span className="open-status-dot" aria-hidden="true" />
      {open ? 'Open now' : 'Closed now'}
    </span>
  );
}

export default OpenStatus;

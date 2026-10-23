import React, { useEffect, useState } from 'react';

const format = () =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());

/** Current time at the Lucknow office. */
export const LocalTime: React.FC<{ className?: string }> = ({ className }) => {
  const [time, setTime] = useState(format);
  useEffect(() => {
    const t = window.setInterval(() => setTime(format()), 15000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span className={className}>
      Lucknow <span className="tabular-nums">{time}</span> IST
    </span>
  );
};

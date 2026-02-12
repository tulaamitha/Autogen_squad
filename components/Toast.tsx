import React, { useEffect, useState } from 'react';

type ToastItem = { id: number; message: string; type: 'success' | 'error' };

const Toasts: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      const { message, type } = e.detail || {};
      const id = Date.now();
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => {
        setToasts((t) => t.filter(x => x.id !== id));
      }, 3500);
    };

    window.addEventListener('curricuforge:toast', handler as EventListener);
    return () => window.removeEventListener('curricuforge:toast', handler as EventListener);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type === 'success' ? 'toast-success' : 'toast-error'}`}>
          <div className="text-lg">{t.type === 'success' ? '✅' : '⚠️'}</div>
          <div>{t.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Toasts;

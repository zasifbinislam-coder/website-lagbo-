import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ToastContext = createContext(null);

const TYPE_STYLES = {
  success: { bg: '#10b981', icon: '✅' },
  error: { bg: '#ef4444', icon: '⚠️' },
  info: { bg: '#6366f1', icon: 'ℹ️' },
};

let toastCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((all) => all.filter((tt) => tt.id !== id));
  }, []);

  const push = useCallback(
    (message, options = {}) => {
      const id = ++toastCounter;
      const t = {
        id,
        message,
        type: options.type || 'info',
        duration: options.duration ?? 3500,
      };
      setToasts((all) => [...all, t]);
      if (t.duration > 0) {
        setTimeout(() => remove(id), t.duration);
      }
      return id;
    },
    [remove]
  );

  const api = {
    push,
    success: (msg, opts) => push(msg, { ...opts, type: 'success' }),
    error: (msg, opts) => push(msg, { ...opts, type: 'error' }),
    info: (msg, opts) => push(msg, { ...opts, type: 'info' }),
    dismiss: remove,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed top-4 right-4 z-[10000] flex flex-col gap-2 pointer-events-none">
        {toasts.map((tt) => {
          const style = TYPE_STYLES[tt.type] || TYPE_STYLES.info;
          return (
            <ToastItem key={tt.id} toast={tt} style={style} onClose={() => remove(tt.id)} />
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, style, onClose }) => {
  const [in_, setIn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setIn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl text-white text-[13px] font-bold flex items-center gap-2.5 min-w-[260px] max-w-[360px] transition-all ${
        in_ ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
      style={{ background: style.bg }}
      role="status"
    >
      <span className="text-lg leading-none">{style.icon}</span>
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="opacity-70 hover:opacity-100 text-white text-sm leading-none px-1"
      >
        ✕
      </button>
    </div>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return { push: () => {}, success: () => {}, error: () => {}, info: () => {}, dismiss: () => {} };
  }
  return ctx;
};

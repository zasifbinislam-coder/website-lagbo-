import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (typeof window !== 'undefined' && window.console) {
      console.error('App crashed:', error, info);
    }
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="absolute inset-0 grid place-items-center p-6 text-white">
        <div className="max-w-md w-full rounded-2xl p-8 border border-rose-400/30 text-center" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.18), rgba(244,63,94,0.04))' }}>
          <div className="text-5xl mb-3">⚠️</div>
          <h1 className="font-display text-xl font-extrabold">কিছু একটা ভুল হয়েছে</h1>
          <p className="text-[13px] text-white/65 mt-2">
            পেজটি লোড করতে সমস্যা হচ্ছে। নিচের বাটনে ক্লিক করে আবার চেষ্টা করুন।
          </p>
          <pre className="text-[11px] text-rose-200/70 mt-4 text-left bg-black/30 rounded-lg p-3 overflow-auto max-h-32">
            {String(error?.message || error)}
          </pre>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={this.reset}
              className="text-[13px] font-bold px-5 py-2 rounded-lg bg-white text-gray-900"
            >
              আবার চেষ্টা করুন
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-[13px] font-bold px-5 py-2 rounded-lg border border-white/20 text-white/85"
            >
              রিলোড
            </button>
          </div>
        </div>
      </div>
    );
  }
}

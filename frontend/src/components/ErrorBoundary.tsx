import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onReset?: () => void;
  compact?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      const {
        fallbackTitle = 'Something went wrong in this module.',
        fallbackMessage = 'An unexpected calculation or rendering error occurred. The application is isolated and safe.',
        compact = false
      } = this.props;

      if (compact) {
        return (
          <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-3">
            <div>
              <span className="font-bold">{fallbackTitle}</span>
              <p className="text-[11px] text-amber-700 mt-0.5">{this.state.error?.message || fallbackMessage}</p>
            </div>
            <button
              onClick={this.handleRetry}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg cursor-pointer transition-colors shrink-0"
            >
              Retry
            </button>
          </div>
        );
      }

      return (
        <div className="p-6 bg-white border border-rose-200 rounded-2xl shadow-sm text-center space-y-4 my-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mx-auto">
            ⚠️
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-slate-900">{fallbackTitle}</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {fallbackMessage}
            </p>
            {this.state.error && (
              <pre className="text-[10px] font-mono text-rose-700 bg-rose-50/80 p-2 rounded-lg max-w-lg mx-auto overflow-x-auto text-left mt-2 border border-rose-100">
                {this.state.error.message}
              </pre>
            )}
          </div>
          <button
            onClick={this.handleRetry}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-xs"
          >
            Retry Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
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
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-dark-800/60 border border-red-500/30 p-6 rounded-lg max-w-md w-full text-center">
            <h2 className="text-xl font-serif text-red-400 mb-4">Упс, что-то пошло не так</h2>
            <p className="text-gray-300 mb-6 text-sm">
              Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу или вернуться позже.
            </p>
            <button
              className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gray-200 rounded transition-colors"
              onClick={() => window.location.reload()}
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

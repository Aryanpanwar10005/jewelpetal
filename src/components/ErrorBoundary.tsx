import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-jp-pearl flex items-center justify-center p-4 selection:bg-jp-rosegold selection:text-jp-pearl">
          <div className="text-center space-y-6 max-w-md">
            <p className="font-serif italic text-4xl text-jp-plum">Unexpected Interruption</p>
            <p className="font-serif italic text-lg text-jp-deep/60">
              The connection to our jewelry boutique has been momentarily suspended. Please try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-sans text-xs uppercase tracking-widest text-jp-rosegold border-b border-jp-rosegold/30 pb-1 hover:text-jp-plum hover:border-jp-plum transition-all font-semibold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

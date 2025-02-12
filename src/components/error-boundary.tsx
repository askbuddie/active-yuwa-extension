import { Component } from "react";

type ErrorBoundaryProps = {
    children: React.ReactNode;
}

type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    state = { hasError: false, error: undefined };

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1 className="text-white p-2 w-full text-center rounded-full font-roboto bg-primary">Something went wrong. See console for more info.</h1>;
        }

        return this.props.children;
    }
}

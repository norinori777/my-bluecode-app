import { ErrorFallback } from "../ErrorFallback";
import { ErrorPresenter } from "./presenter"
import { ErrorBoundary } from 'react-error-boundary';

export const ErrorContainer = () => {
    return(
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ErrorPresenter />
        </ErrorBoundary>
    ) 
}
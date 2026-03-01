import { AlertCircle } from "lucide-react";

const ErrorState = ({ message = "Something went wrong", onRetry }: { message?: string; onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
      <AlertCircle className="w-7 h-7 text-destructive" />
    </div>
    <p className="text-muted-foreground mb-4">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;

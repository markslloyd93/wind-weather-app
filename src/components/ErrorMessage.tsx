import { AlertTriangle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => (
  <div className="error-message" role="alert">
    <AlertTriangle size={20} />
    <span>{message}</span>
    {onDismiss && (
      <button 
        onClick={onDismiss}
        className="error-message__dismiss"
        aria-label="Dismiss error"
      >
        <X size={16} />
      </button>
    )}
  </div>
);
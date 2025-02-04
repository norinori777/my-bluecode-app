import React from 'react';

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <div>
        <h1>エラーが発生しました。初めからやり直してください。</h1>
    </div>
);

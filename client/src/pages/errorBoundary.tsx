import React from 'react';

import Catch from 'components/errorBoundary/catch';
import ErrorHandlerFallback from 'components/errorBoundary/fallback';

const ErrorBoundary = Catch((props: any, error: any, removeError: any) => {
  if (error) {
    return <ErrorHandlerFallback removeError={removeError} />;
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
});

export default ErrorBoundary;

import React, { useState, useEffect } from 'react';

function Alert({ message="asdfsdfsd", duration = 3000 }) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, duration);

      return () => clearTimeout(timeoutId); // Cleanup
    }
  }, [showAlert, duration]);

  return (
    showAlert && (
      <div className="alert alert-primary" role="alert">
        {message}
      </div>
    )
  );
}

export default Alert;
import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ShortUrlRedirect() {
  const { urlCode } = useParams();
  // Use the API backend base URL so the request hits the server redirect route
  // VITE_API_BASE should point to the backend (e.g. http://localhost:5001)
  const serverBaseUrl = import.meta.env.VITE_API_BASE || import.meta.env.VITE_APP_URI;

  const redirect = () => {
    const url = `${serverBaseUrl}/${urlCode}`;
    // replace location so this navigation doesn't leave a history entry
    window.location.replace(url);
  };

  useEffect(() => {
    if (urlCode) {
      redirect();
    }
  }, [ urlCode ]);
  return (
    <div>
      <Heading as="h3" size="xl" m={ '3% 0% 2% 0%' }>
        Redirecting...
      </Heading>
    </div>
  );
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/');
          return;
        }

        if (data.session) {
          // User is authenticated, redirect to home
          navigate('/');
        } else {
          // No session found, redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-elevate-beige via-white to-elevate-beige-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-elevate-brown" />
        <h2 className="text-xl font-semibold text-elevate-brown-chocolate dark:text-elevate-beige mb-2">
          Completing Sign In...
        </h2>
        <p className="text-elevate-brown dark:text-elevate-beige-dark">
          Please wait while we finish setting up your account.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;

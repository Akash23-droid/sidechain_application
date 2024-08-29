import { SignIn } from '@clerk/clerk-react';

const Login = () => {
    return (
        <SignIn afterSignInUrl="/dashboard"
            appearance={{
                layout: {
                    footer: false,       // Removes the "Secured by" footer
                    devBrowser: false,   // Removes the "Development mode" badge
                },
            }}
        />
    );
};

export default Login;

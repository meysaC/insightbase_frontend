import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import { Eye, EyeOff, Loader } from 'lucide-react';


export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useAuth();

    const handleSignIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    login(data);
    
    console.log("Sign In submitted:", data);
    alert(`Sign In Submitted! Check the browser console for form data.`);
  };

  const handleGoogleSignIn = () => {
    console.log("Continue with Google clicked");
    alert("Continue with Google clicked");
  };
  
  const handleResetPassword = () => {
    alert("Reset Password clicked");
  }

  return (
    <div className="flex flex-col gap-6">
       <h1 className="animate-element animate-delay-100 text-4xl md:text-2xl font-semibold leading-tight">Giriş Yap</h1>

        <form className="space-y-5" onSubmit={handleSignIn}>
          <div className="animate-element animate-delay-300">
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
              <input
                name="email"
                type="email"
                placeholder="Email adresinizi girin"
                className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none" />
            </div>
          </div>

          <div className="animate-element animate-delay-400">
            <label className="text-sm font-medium text-muted-foreground">Şifre</label>
              <div className="relative">
                <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
                    <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Şifre"
                    className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center">
                  {showPassword ? <EyeOff
                    className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye
                    className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                </button>
              </div>
          </div>

          <div className="animate-element animate-delay-500 flex items-center justify-between text-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="rememberMe" className="custom-checkbox" />
              <span className="text-foreground/90">Beni hatırla</span>
            </label>
            <a href="#"
               onClick={(e) => { e.preventDefault(); onResetPassword?.(); }}
              className="hover:underline text-violet-400 transition-colors">Şifreyi sıfırla</a>
          </div>

          <button disabled={loading} type="submit"
            className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            {loading ? <Loader /> : "Giriş Yap"}
          </button>
        </form>

        <div className="animate-element animate-delay-700 relative flex items-center justify-center">
          <span className="w-full border-t border-border"></span>
          <span className="px-4 text-sm text-muted-foreground bg-background absolute">Ya da</span>
        </div>

        <button
        //   onClick={onGoogleSignIn}
          className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 48 48">
                            <path
                            fill="#FFC107"
                            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
                            <path
                            fill="#FF3D00"
                            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                            <path
                            fill="#4CAF50"
                            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                            <path
                            fill="#1976D2"
                            d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
                    </svg>
            Google ile devam et
        </button>

        <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
          <span> Yeni misin? </span>
          <Link to="/signup" className="text-violet-400 hover:underline transition-colors">
            Hesap Oluştur
          </Link>
          {/* <a href="#"
           onClick={(e) => { e.preventDefault(); onCreateAccount?.(); }}
          className="text-violet-400 hover:underline transition-colors">Hesap Oluştur</a> */}
        </p>
    </div>
  )
}

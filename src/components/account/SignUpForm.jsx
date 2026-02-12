import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';


export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata.entries());

    register(data);
    // navigate('/');
  }
  
  return (
      <div className="w-full h-full min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row w-full h-full rounded-3xl shadow-2xl dark:shadow-l dark:shadow-white/10 overflow-hidden">

        {/* Left Panel */}
        <div className="flex-1 relative overflow-hidden md:block hidden">
          <div className="absolute top-6 left-6 z-10">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-all">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="absolute inset-0">
            <img
              src="https://i.ibb.co/dJxBbFks/brandasset.png"
              alt="Brand Asset"
              className="w-full h-full object-cover" />
          </div>
        </div>



        <div className="flex-1 p-6 flex flex-col justify-center">

          <h1 className="animate-element animate-delay-100 text-4xl md:text-2xl font-medium text-muted-foreground pb-8">Hesap Oluştur</h1>
          
          <div className="pb-20">
            <form className="space-y-5" onSubmit={handleSignUp}>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName"
                      className="text-sm font-medium text-muted-foreground">
                      İsim
                    </label>
                    <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                        required />
                    </div>
                  </div>
                  {/* <div>
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-muted-foreground">
                      Soyad
                    </label>
                  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      // value={formData.lastName}
                      // onChange={handleInputChange}
                      className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
                      required />
                  </div>
                  </div> */}
                </div>

              <div className="animate-element animate-delay-300">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
                  <input
                    name="email"
                    type="email"
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

              <div className="animate-element animate-delay-400">
                <label className="text-sm font-medium text-muted-foreground">Şifre Tekrar</label>
                  <div className="relative">
                    <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
                        <input
                        name="confirmpassword"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none" />
                    </div>
                  </div>
              </div>

              <button disabled={loading} type="submit"
                className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                {loading ? "Kayıt olunuyor..." : "Kayıt Ol"}
              </button>
              
              
              {error && (
                <p className="animate-element animate-delay-600 text-sm text-red-500 mt-2">
                  {typeof error === 'string' ? error : 'Kayıt işlemi başarısız!'}
                </p>
              )}


            </form>

            <div className="animate-element animate-delay-700 relative flex items-center justify-center my-4">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground absolute">Ya da</span>
            </div>

            <button
            // onClick={onGoogleSignIn}
              className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
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
                Google ile kayıt ol
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

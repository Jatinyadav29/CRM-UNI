import React from "react";
import { useAuth } from "../../hook/useAuthHook";

const RegisterPage = () => {
  let { navigate, handleSubmit, register, errors, reset, registerForm } =
    useAuth();

  return (
    <div className="h-full w-full flex items-center justify-center font-sans p-7">
      <div className="w-full max-w-97.5 sm:max-w-102.5 bg-white rounded-4xl overflow-hidden shadow-2xl border border-neutral-800/10 flex flex-col">
        <div className="relative h-72 overflow-hidden bg-[#7fb0eb]">
          <img
            src="https://4kwallpapers.com/images/walls/thumbs_2t/20787.png"
            alt="Genesis Hero"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 55%, rgba(0,0,0,.85) 72%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 55%, rgba(0,0,0,.85) 72%, transparent 100%)",
            }}
          />
        </div>

        <div className="px-6 pb-8 pt-1 sm:px-8 sm:pb-9 flex flex-col gap-4 bg-white relative z-10 mt-8">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-black leading-snug">
              Join Genesis,
              <br />
              Create your account!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              Enter your details to get started.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(registerForm)}
            className="flex flex-col gap-3.5"
          >
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-700 tracking-wider uppercase px-1">
                Username
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-neutral-400 text-sm font-medium select-none">
                  @
                </span>
                <input
                  {...register("name", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                    // pattern: {
                    //   value: /^[A-Za-z0-9_]+$/,
                    //   message: "Only letters, numbers & underscores allowed",
                    // },
                  })}
                  type="text"
                  placeholder="username"
                  className={`w-full bg-neutral-100/80 border text-black placeholder-neutral-400 text-sm rounded-2xl py-3 pl-9 pr-4 outline-none transition-all duration-200 ${
                    errors.name
                      ? "border-red-500/80 focus:border-red-500 bg-red-50/20"
                      : "border-transparent focus:border-blue-500 focus:bg-white"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[11px] font-medium px-1 pt-0.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-700 tracking-wider uppercase px-1">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className={`w-full bg-neutral-100/80 border text-black placeholder-neutral-400 text-sm rounded-2xl py-3 px-4 outline-none transition-all duration-200 ${
                  errors.email
                    ? "border-red-500/80 focus:border-red-500 bg-red-50/20"
                    : "border-transparent focus:border-blue-500 focus:bg-white"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-[11px] font-medium px-1 pt-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-700 tracking-wider uppercase px-1">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                  // pattern: {
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                  //   message:
                  //     "Must contain uppercase, lowercase, number & special char",
                  // },
                })}
                type="password"
                placeholder="••••••••"
                className={`w-full bg-neutral-100/80 border text-black placeholder-neutral-400 text-sm rounded-2xl py-3 px-4 outline-none transition-all duration-200 ${
                  errors.password
                    ? "border-red-500/80 focus:border-red-500 bg-red-50/20"
                    : "border-transparent focus:border-blue-500 focus:bg-white"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-[11px] font-medium px-1 pt-0.5 leading-snug">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-black hover:bg-neutral-900 text-white font-medium text-sm py-3.5 rounded-full shadow-lg shadow-black/10 active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-xs text-neutral-500 font-normal pt-1">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-black font-semibold hover:underline cursor-pointer inline-block"
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

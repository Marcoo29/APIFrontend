import LoginForm from "./LoginForm";
import useLogin from "./useLogin";

const Login = () => {
  const login = useLogin();

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center bg-[#2c2c2c] font-display">
      <div className="relative z-10 flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">

        <div className="hidden md:flex md:w-1/2 relative">
          <img src="/img_login.jpg" className="object-cover w-full h-full" />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gray-50">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b-4 border-red-600 w-fit pb-1">
            Iniciar sesión
          </h1>

          <LoginForm {...login} />
        </div>

      </div>
    </div>
  );
};

export default Login;

import RegisterForm from "./RegisterForm";
import { useRegister } from "./useRegister";

const Register = () => {
  const register = useRegister();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#2c2c2c]">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">

        <div className="w-full md:w-1/2 p-10 bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 border-red-600 w-fit pb-1">
            Crear cuenta
          </h1>

          <RegisterForm {...register} />
        </div>

        <div className="hidden md:flex md:w-1/2 relative">
          <img src="/img_register.jpg" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-10 flex flex-col justify-end">
            <h2 className="text-white text-4xl font-bold mb-2">Unite a FleetParts</h2>
            <p className="text-gray-200">Registrate y accedé al portal exclusivo.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;

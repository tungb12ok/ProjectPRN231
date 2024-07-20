import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LoginGoogle from './LoginGoogle';
import { signUpUser } from '../../services/authService';

export default function SignUpModal({ isOpen, closeModal, openSignInModal }) {
  console.log("123@@@");
  const { t } = useTranslation("translation");
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { username, password, fullName, email } = data;

    try {
      const response = await signUpUser({ username, password, fullName, email });
      console.log("Sign-up successful:", response);
      toast.success("Sign up successful");
      // dispatch(login(response.user)); // Uncomment and adjust if needed
      closeModal();
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  const handleSignInClick = () => {
    closeModal();
    openSignInModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center pt-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex justify-center w-full transform overflow-hidden rounded-md shadow-xl transition-all">

                <div className="bg-white w-1/2 px-20 text-black flex-col flex font-poppins justify-center py-10">
                  <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3 text-black flex-col flex font-poppins justify-center">
                    <label className="font-rubikmonoone text-xl items-center text-center mb-2">Sign up</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="text-gray-700 p-2 rounded-lg border-2 border-zinc-400 w-full"
                      {...register('fullName', { required: true })}
                    />
                    {errors.fullName && <p className="text-red-400 text-sm italic">Full name is required</p>}
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="text-gray-700 p-2 rounded-lg border-2 border-zinc-400 w-full"
                      {...register('username', {
                        required: true,
                        maxLength: 20,
                        pattern: /^[a-zA-Z0-9_]+$/,
                      })}
                    />
                    {errors.username && errors.username.type === 'required' && (
                      <p className="text-red-400 text-sm italic">This field is required!</p>
                    )}
                    {errors.username && errors.username.type === 'maxLength' && (
                      <p>Username cannot exceed 20 characters</p>
                    )}
                    {errors.username && errors.username.type === 'pattern' && (
                      <p className="text-red-400 text-sm italic">Username can only contain letters, numbers, and underscores</p>
                    )}
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="text-gray-700 p-2 rounded-lg border-2 border-zinc-400 w-full"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.email && <p className="text-red-400 text-sm italic">{errors.email.message}</p>}
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="text-gray-700 p-2 rounded-lg border-2 border-zinc-400 w-full"
                        {...register('password', { required: true })}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="cursor-pointer text-orange-400"
                          onClick={togglePasswordVisibility}
                        />
                      </div>
                    </div>
                    {errors.password && <p className="text-red-400 text-sm italic">Password is required</p>}
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        className="text-gray-700 p-2 rounded-lg border-2 border-zinc-400 w-full"
                        {...register('confirmPassword', {
                          required: true,
                          validate: (value) => value === watch('password')
                        })}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="cursor-pointer text-orange-400"
                          onClick={togglePasswordVisibility}
                        />
                      </div>
                    </div>
                    {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                      <p className="text-red-400 text-sm italic">Confirm password is required</p>
                    )}
                    {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
                      <p className="text-red-400 text-sm italic">Passwords do not match</p>
                    )}
                    <div className="flex justify-center space-x-2">
                      <button
                        type="submit"
                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      >
                        Sign up
                      </button>
                      <div className="flex items-center"> 
                        <LoginGoogle  />
                      </div>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

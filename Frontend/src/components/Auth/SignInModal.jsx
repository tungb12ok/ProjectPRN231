import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { login, selectUser } from '../../redux/slices/authSlice';
import UserDropdown from '../User/userDropdown';
import SignUpModal from './SignUpModal.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authenticateUser } from '../../services/authService';
import ForgotPasswordModal from './ForgotPasswordModal';
import LoginGoogle from './LoginGoogle';
import { useTranslation } from 'react-i18next';
export default function SignInModal() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await authenticateUser(dispatch, data);
      setIsSignInOpen(false);
      console.log('Login successful!');
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed!');
    }
  };

  function closeSignInModal() {
    setIsSignInOpen(false);
  }

  function openSignInModal() {
    setIsSignInOpen(true);
  }

  function closeSignUpModal() {
    setIsSignUpOpen(false);
  }

  function openSignUpModal() {
    setIsSignUpOpen(true);
  }

  function closeForgotPasswordModal() {
    setIsForgotPasswordOpen(false);
  }

  function openForgotPasswordModal() {
    setIsForgotPasswordOpen(true);
  }

  return (
    <>
      <div>
        {user ? (
          <UserDropdown />
        ) : (
          <button
            type="button"
            onClick={openSignInModal}
            className="border-r-2 pr-4"
          >
            <FontAwesomeIcon icon={faUser} className="pr-1" /> {t('header.signin')}
          </button>
        )}
      </div>

      <Transition appear show={isSignInOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeSignInModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-center">
                    <img
                      src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                      className="w-32"
                      alt="Logo"
                    />
                  </div>
                  <div className="mt-8 text-center">
                    <h1 className="text-2xl font-extrabold">{t('signin')}</h1>
                  </div>
                  <div className="mt-6">
                    <div className="flex flex-col items-center">
                      <LoginGoogle setIsSignInOpen={setIsSignInOpen} />

                      <button
                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gray-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                        onClick={() => {
                          closeSignInModal();
                          openSignUpModal();
                        }}
                      >
                        <div className="bg-white p-1 rounded-full">
                          <svg className="w-6" viewBox="0 0 32 32">
                            <path
                              fillRule="evenodd"
                              d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                            />
                          </svg>
                        </div>
                        <span className="ml-4">Sign In with GitHub</span>
                      </button>
                    </div>

                    <div className="my-12 border-b text-center">
                      <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                        Or sign in with e-mail
                      </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">
                      <div className="mb-4">
                        <label className="block text-gray-700">{t('username')}</label>
                        <input
                          type="text"
                          placeholder="Enter your username"
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          {...register('userName', {
                            required: true,
                            maxLength: 20,
                            pattern: /^[a-zA-Z0-9_]+$/,
                          })}
                        />
                        {errors.userName && errors.userName.type === 'required' && (
                          <p className="text-red-500 text-sm">This field is required!</p>
                        )}
                        {errors.userName && errors.userName.type === 'maxLength' && (
                          <p className="text-red-500 text-sm">Username cannot exceed 20 characters</p>
                        )}
                        {errors.userName && errors.userName.type === 'pattern' && (
                          <p className="text-red-500 text-sm">Username can only contain letters, numbers, and underscores</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700">{t('password')}</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            {...register('password', { required: true })}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                              className="cursor-pointer text-gray-500"
                              onClick={togglePasswordVisibility}
                            />
                          </div>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                      </div>

                      <button
                        type="button"
                        className="text-blue-500 underline mb-4"
                        onClick={() => {
                          closeSignInModal();
                          openForgotPasswordModal();
                        }}
                      >
                        Forgot password?
                      </button>

                      <button
                        type="submit"
                        className="w-full bg-indigo-500 text-gray-100 py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        Sign In
                      </button>
                    </form>

                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by templatana's
                      <a href="#" className="border-b border-gray-500 border-dotted"> Terms of Service </a>
                      and its
                      <a href="#" className="border-b border-gray-500 border-dotted"> Privacy Policy </a>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ForgotPasswordModal isOpen={isForgotPasswordOpen} closeModal={closeForgotPasswordModal} />
      <SignUpModal isOpen={isSignUpOpen} closeModal={closeSignUpModal} openSignInModal={openSignInModal} />
    </>
  );
}

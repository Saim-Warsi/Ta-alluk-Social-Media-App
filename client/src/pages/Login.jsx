import { assets } from '../../assets/assets'
import { SignIn } from '@clerk/clerk-react';


const Login = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* bg image */}
      <img src={assets.bgImage} alt="" className='absolute top-0 left-0 w-full h-full object-cover opacity-80 backdrop:blur-sm' />
  {/* Main Content */}
  <div className="flex-1 flex items-center justify-center px-6 py-12 z-5">
    <div className="w-full max-w-md">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="mb-1 flex justify-center">
          <img 
            src={assets.logo} 
            alt="Ta'alluk" 
            className="w-35"
          />
        </div>
      </div>

      {/* Auth Box */}
      <div className='flex justify-center'>
        <SignIn />
      </div>
     

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-gray-500">
        By continuing, you agree to Ta'alluk's Terms of Service and Privacy Policy
      </div>
    </div>
  </div>
</div>
  )
}

export default Login
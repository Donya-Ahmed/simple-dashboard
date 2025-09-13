import { Card } from '@/components/ui/card'
import { SignupForm } from '@/views/signUpView/signUp'

export default function signUpPage() {
  return (
    <div className='h-dvh flex items-center px-4 '>
        <Card className='p-4  w-full lg:w-[40%] mx-auto'>
      <SignupForm/>
    </Card>
    </div>
  )
}

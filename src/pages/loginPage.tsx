import { Card } from '@/components/ui/card'
import { LoginForm } from '@/views/loginView/login'
import React from 'react'

export default function loginPage() {
  return (
    <div className='h-dvh flex items-center px-4 '>
        <Card className='p-4  w-full lg:w-[40%] mx-auto'>
      <LoginForm/>
    </Card>
    </div>
  )
}

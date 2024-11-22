import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

const Login1 = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [errormessage, setErrorMessage] = useState('')
    const [errorpassword, setErrorPassword] = useState('')

    const handleSubmit = () => { 
        const usernameIsValid = username.length >=3
        const passwordIsValid = password.length >=8

        if (!usernameIsValid) {
            alert("username must be at least 3 characters")
            return
        }

        if (!passwordIsValid) {
            alert("password must be at least 8 characters")
            return
        }
        alert(`username:${username} | password:${password}`)
    }

    
  return (
        <main className='flex justify-center items-center max-w-screen-md h-[80vh] px-4 container py-8'>
            <form onSubmit={handleSubmit} className="w-full max-w-[540px]">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Welcome Back!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <div>
                            <Label htmlFor='username'>Username</Label>
                            <Input id='username' type="text" onChange={(e) => {
                                if(e.target.value.length < 3) {
                                    return setErrorMessage('username must be at least 3 characters !')
                                }else{
                                    setErrorMessage('')
                                }
                                setUsername(e.target.value)}}/>
                            <p className='text-red-500'>{errormessage}</p>
                        </div>
                        <div>
                            <Label htmlFor='password'>Password</Label>
                            <Input id='password' type={isShowPassword ? 'text' : 'password'} onChange={(e) => {
                                if(e.target.value.length < 8) {
                                    return setErrorPassword('password must be at least 8 characters !')
                                }else{
                                    setErrorPassword('')
                                }
                            setPassword(e.target.value)}}/>
                            <p className='text-red-500'>{errorpassword}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Checkbox id="show-password" onCheckedChange={(checked)=> setIsShowPassword(checked)}/>
                            <Label htmlFor="show-password">Show Password</Label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className='w-full flex flex-col space-y-4'>
                            <Button type="submit" disabled={username.length < 3 || password.length < 8}>Sign in</Button>
                            <Button variant="link" className='w-full'>Sign up Instead</Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </main>
  )
}

export default Login1
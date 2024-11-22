import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {
    Form,
    FormItem,
    FormMessage,
    FormLabel,
    FormField,
    FormControl
} from '@/components/ui/form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '@/lib/axios'
import { useDispatch } from 'react-redux'
import { GuestPage } from '@/components/guard/GuestPage'

const LoginFormSchema = z.object({
    username: z
        .string()
        .min(3, {message: 'Username must be between 3 and 10 characters'})
        .max(10, {message: 'Username must be between 3 and 10 characters'}),
    password: z
        .string()
        .min(8, {message: 'Password must be at least 8 characters'})
})

const LoginPage = () => {
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: zodResolver(LoginFormSchema),
        reValidateMode:'onSubmit',
    })
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleSubmit = async (values) => { 
       console.log(values)
        // alert(`username:${username} | password:${password}`)
        try{
            const userResponse = await axiosInstance.get("/users",{
                params:{
                    username: values.username,
                }
            })
            if(!userResponse.data.length || userResponse.data[0].password !== values.password ){
                alert("Invalid Login")
                return
            }
            alert ("Login Success " + userResponse.data[0].username)
            // Navigate("/admin/product")
            dispatch({
                type: "USER_LOGIN", payload: {
                    username: userResponse.data[0].username,
                    id: userResponse.data[0].id,
                    role: userResponse.data[0].role
                }
            })
            localStorage.setItem("current-user", userResponse.data[0].id)
            form.reset()
        }catch(error){
            console.log(error)
        }
    }

    
  return (
    <GuestPage>
        <main className='flex justify-center items-center max-w-screen-md h-[80vh] px-4 container py-8'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-[540px]">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Welcome Back!
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                        { /* Your form field */}
                                            <Input {...field} type="text"/>
                                        </FormControl>
                                        <FormMessage  />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel>password</FormLabel>
                                        <FormControl>
                                        { /* Your form field */}
                                        <Input {...field} type={isShowPassword ? 'text' : 'password'} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            <div className='flex items-center space-x-2'>
                                <Checkbox id="show-password" onCheckedChange={(checked)=> setIsShowPassword(checked)}/>
                                <Label htmlFor="show-password">Show Password</Label>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className='w-full flex flex-col space-y-4'>
                                <Button type="submit">Sign in</Button>
                                <Link to ="/register">
                                    <Button variant="link" className='w-full'>Sign up Instead</Button>
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </main>
    </GuestPage>
  )
}

export default LoginPage
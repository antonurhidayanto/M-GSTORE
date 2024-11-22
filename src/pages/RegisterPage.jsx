import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React  from 'react'
import {useForm} from 'react-hook-form'
import {
    Form,
    FormItem,
    FormMessage,
    FormLabel,
    FormField,
    FormControl,
    FormDescription
} from '@/components/ui/form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { axiosInstance } from '@/lib/axios'
import { Link, useNavigate } from 'react-router-dom'
import { GuestPage } from '@/components/guard/GuestPage'

const RegisterFormSchema = z.object({
    username: z
        .string()
        .min(3, {message: 'Username must be between 3 and 10 characters'})
        .max(10, {message: 'Username must be between 3 and 10 characters'}),
    password: z
        .string()
        .min(8, {message: 'Password must be at least 8 characters'}),
    repeatPassword: z
        .string()
        .min(8, {message: 'Password must be at least 8 characters'}),
}).superRefine(({password, repeatPassword}, ctx) => {
    if (password !== repeatPassword) {
        ctx.addIssue({
            code: "custom",
            message: 'Password does not match',
            path: ['repeatPassword']
        })
    }
})

const RegisterPage = () => {
    const Navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            repeatPassword: '',
        },
        resolver: zodResolver(RegisterFormSchema),
        reValidateMode:'onSubmit',
    })

    const handleSubmit = async (values) => { 
       console.log(values)
        // alert(`username:${username} | password:${password}`)
        try{
            const userResponse = await axiosInstance.get("/users",{
                params:{
                    username: values.username
                }
            })
            if(userResponse.data.length > 0){
                alert("Username already exists")
                return
            }
            await axiosInstance.post("/users",{
                username: values.username,
                password: values.password,
                role: "user",
            })
            alert("Register success")
            Navigate("/login")
            form.reset()
        }catch(err){
            console.log(err)
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
                                Create an Account
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
                                            <FormDescription>Username must be between 3 and 10 characters</FormDescription>
                                        <FormMessage  />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                        { /* Your form field */}
                                        <Input {...field} type='password'/>
                                        </FormControl>
                                            <FormDescription>Password must be at least 8 characters</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="repeatPassword"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Repeat Password</FormLabel>
                                        <FormControl>
                                        { /* Your form field */}
                                        <Input {...field} type='password'
                                        />
                                        </FormControl>
                                            <FormDescription>Make sure your password match</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            
                        </CardContent>
                        <CardFooter>
                            <div className='w-full flex flex-col space-y-4'>
                                <Button type="submit">Register</Button>
                                <Link to={'/login'}>
                                <Button variant="link" className='w-full'>Log in Instead</Button>
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

export default RegisterPage
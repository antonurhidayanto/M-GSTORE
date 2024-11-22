import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "../ui/card"
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
 } from "../ui/form"
import { Input } from "../ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"



const productFormSchema = z.object({
    title: z
         .string()
         .min(3, 'Title must be between 3 and 10 characters')
         .max(80, 'Title must be between 3 and 10 characters'),
     price: z.coerce
         .number()
         .min(10000, 'Price must be greater than 10000'),
     stock: z.coerce
         .number()
         .min(1,'Stock must be greater than 0'),
     imageUrl: z
         .string()
         .url( 'Invalid image url')
 })


export const ProductForm = (props) => { 

    const navigate = useNavigate();

    const {onSubmit,cardTitle, defaultTitle, defaultPrice, defaultStock, defaultImageUrl, buttonTitle} = props

    const form = useForm({
        defaultValues: {
            title: defaultTitle ||'',
            price: defaultPrice || 0,
            stock: defaultStock || 0,
            imageUrl: defaultImageUrl ||'',
        },
        resolver: zodResolver(productFormSchema),
    })

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className='max-w-[540px] w-full'>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">{cardTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Product Title has to between 3 and 80 characters
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="url"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Image Url must be valid
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        <Button 
                        variant="outline" 
                        className="w-full" 
                        type='cancel'
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                          }}> Cancel
                        </Button>
                        <Button 
                        className="w-full" type="submit">{buttonTitle}</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
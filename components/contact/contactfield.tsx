import React, {useState} from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import type { UseFormReturn } from 'react-hook-form';
import { Separator } from '@radix-ui/react-separator';
import { Textarea } from '../ui/textarea';
const ContactField = ({form, name, label, placeholder,idx }: {form: UseFormReturn<any>, name: string, label: string, placeholder: string, idx:number}) => {
    const [hasValue, setHasValue] = useState(false);
    if(name === "msg") {
            
        return(<FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <div className='w-full space-y-6'>
                <div className='flex items-start mb-20 w-full'>
                    <h2 className={`transition-colors duration-300 md:text-2xl text-xl text-start top-0 relative ${hasValue ? 'text-gray-600': 'text-beige'} mt-[42px] sm:mt-[38px]`}>{(idx + 1).toString().padStart(2, '0')}</h2>
                    <FormItem className='h-48 font-medium w-[90%]'>
                        <FormLabel 
                        className={`${hasValue ? 'text-gray-600' :'text-beige'} transition-colors duration-300 md:text-2xl text-xl ml-3`}
                        
                        >
                            {label}
                        </FormLabel>
                        <FormControl>
                            <Textarea placeholder={placeholder} {...field} 
                            onChange={(e) =>{
                                setHasValue(e.target.value.length > 0);
                                field.onChange(e)
                            }}
                            className={`
                                ${hasValue ? 'text-beige' : 'text-gray-600'}
                                transition-colors duration-300 md:text-2xl text-xl h-32 border-none w-full text-start resize-none
                                `}
                            
                            />
                        </FormControl>
                        
                    </FormItem>
                </div>
                <Separator className="w-full bg-gray-600 h-[1px] rounded-xl" />
            </div>
            )}
        />
        )
    }

    return (
        <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
        <div className='w-full space-y-6'>
            <div className='flex items-center justify-start mb-20 w-full'>
                <h2 className={`transition-colors duration-300 md:text-2xl text-xl text-start ${hasValue ? 'text-gray-600': 'text-beige'} mt-4 sm:mt-3`}>{(idx + 1).toString().padStart(2, '0')}</h2>
                <FormItem className='h-24 font-medium w-[90%]'>
                    <FormLabel 
                    className={`${hasValue ? 'text-gray-600' :'text-beige'} transition-colors duration-300 md:text-2xl text-xl ml-3`}
                    
                    >
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} 
                        onChange={(e) =>{
                            setHasValue(e.target.value.length > 0);
                            field.onChange(e)
                        }}
                        className={`
                            ${hasValue ? 'text-beige' : 'text-gray-600'}
                            transition-colors duration-300 md:text-2xl text-xl h-12 border-none w-full
                            `}
                        
                        />
                    </FormControl>
                    
                </FormItem>
            </div>
            <Separator className="w-full bg-gray-600 h-[1px] rounded-xl" />
        </div>
        )}
    />
    )
}

export default ContactField
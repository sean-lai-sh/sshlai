'use client';
import React from 'react'
import {z} from 'zod'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import ContactField from './contactfield';
import { contactFields, contactFormSchema } from '@/lib/consts';
import { Separator } from '@radix-ui/react-separator';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const {toast} = useToast()
  const form = useForm<z.infer<typeof contactFormSchema>>({
      resolver: zodResolver(contactFormSchema),
      defaultValues: {
        name: "",
        email: "",
        company: "",
        msg: "",
      },
  })
  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
      const res = await fetch('/api/contactme', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
      })
      if(res.status === 200) {
        toast({
          title: "Success",
          description: "Your message has been sent!",
          
        })
      }else{
        // error 
        toast({
          title: "Error!",
          description: "please add in all the items",
          variant: "destructive",
        })
      }
  }
  return (
    <Form {...form}>
        {/* <h1 className='md:text-7xl text-5xl text-start'>
            Contact
        </h1> */}
        <Separator className="w-full h-[1px] my-4 bg-gray-600 rounded-xl" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-7xl w-full">
            {contactFields.map(({ name, label, placeholder }, index) => (
               
                        <ContactField
                            key={name}
                            form={form}
                            name={name}
                            label={ label}
                            placeholder={placeholder}
                            idx={index}
                        />
            ))}
            <Button type="submit" className='w-[30%] h-12 rounded-full border-2 hover:bg-beige hover:border-charcoal-light hover:shadow-md hover:shadow-offwhite hover:text-black focus:bg-beige focus:border-charcoal-light focus:shadow-md focus:shadow-offwhite focus:text-black text-2xl'>Submit</Button>
        </form>
    </Form>
  )
}

export default ContactForm


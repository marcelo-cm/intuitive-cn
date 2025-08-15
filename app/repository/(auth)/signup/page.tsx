'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormLabelWithMessage } from '@/components/intuitive-ui/(forms)/form-label-with-message';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { signup } from '@/models/user/user-actions';
import { CreateUserSchema } from '@/models/user/user-schemas';

const SignUpPage = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    mode: 'onChange',
  });
  const { control, register, handleSubmit } = form;

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Card className="min-w-96">
        <form onSubmit={handleSubmit(signup, console.error)}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Welcome!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="space-y-8">
                <div className="grid w-full grid-cols-2 items-center justify-between gap-4">
                  <FormField
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelWithMessage required />
                        <FormControl>
                          <Input placeholder="John" {...register(field.name)} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="last_name"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabelWithMessage />
                        <FormControl>
                          <Input
                            placeholder="Appleseed"
                            {...register(field.name)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabelWithMessage required />
                      <FormControl>
                        <Input
                          placeholder="marcelo@therepository.dev"
                          {...register(field.name)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabelWithMessage required />
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...register(field.name)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </CardContent>
          <CardFooter className="justify-end gap-4">
            <Button type="submit">Create Account</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};

export default SignUpPage;

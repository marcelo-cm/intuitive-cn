'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormLabelWithMessage } from '@/components/intuitive/(forms)/form-label-with-message';
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

import useServerAction from '@/hooks/use-server-action';

import { signup } from '@/app/_actions/users';
import { CreateUserSchema } from '@/db/schema';

const SignUpPage = () => {
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    mode: 'onChange',
  });
  const { control, register, handleSubmit } = form;

  const [signupAction, signingUp] = useServerAction({
    action: signup,
    onError: {
      action: ({ error }) => {
        console.error(error);
      },
      message: 'Error creating account',
      title: 'Error',
    },
    onSuccess: {
      action: ({ response }) => {
        console.info(response);
      },
      message: 'Account created successfully',
      title: 'Account created',
      redirect: '/home',
    },
  });

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Card className="min-w-96">
        <form onSubmit={handleSubmit(signupAction, console.error)}>
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
                          <Input
                            placeholder="John"
                            {...register(field.name)}
                            disabled={signingUp}
                          />
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
                            disabled={signingUp}
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
                          placeholder="marcelo@swing.com"
                          {...register(field.name)}
                          disabled={signingUp}
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
                          disabled={signingUp}
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

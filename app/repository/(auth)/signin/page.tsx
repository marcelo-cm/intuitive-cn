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

import { signin } from '@/models/user/user-actions';

import { SigninSchema } from '../_schemas/auth-schemas';

const SignInPage = () => {
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    mode: 'onChange',
  });
  const { control, register, handleSubmit } = form;

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Card className="min-w-96">
        <form onSubmit={handleSubmit(signin, console.error)}>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Welcome back to The Repository! We&apos;re excited to make your
              life easier.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="space-y-8">
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
                          placeholder="marcelo@therepository.dev"
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
            <Button type="submit">Sign In</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};

export default SignInPage;

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { TInsertUser } from '@/db/db-schema';
import { CreateUserSchema } from '@/db/schema';
import { createClient } from '@/lib/supabase/server';

import { SigninSchema } from '../(auth)/schemas';

// Create

// Read

// Update

// Delete

// Helpers, Utilities, and others

export async function signin(data: z.infer<typeof SigninSchema>) {
  const supabase = await createClient();

  const { data: userAuthData, error: userAuthError } =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

  if (userAuthError) {
    throw userAuthError;
  }

  if (!userAuthData?.user?.id) {
    throw new Error('No user auth data');
  }

  revalidatePath('/', 'layout');

  redirect('/home');
}

export async function signup(data: z.infer<typeof CreateUserSchema>) {
  const supabase = await createClient();

  const { data: userAuthData, error: userAuthError } =
    await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
      },
    });

  if (userAuthError) {
    throw userAuthError;
  }

  if (!userAuthData?.user?.id) {
    throw new Error('No user auth data');
  }

  const body: TInsertUser & { id: string } = {
    id: userAuthData.user.id,
    email: data.email,
    first_name: data.first_name,
    last_name: data?.last_name,
  };

  const { error: userError } = await supabase
    .from('users')
    .insert(body)
    .select('*');

  if (userError) {
    redirect('/login');
  }

  revalidatePath('/', 'layout');

  redirect('/home');
}

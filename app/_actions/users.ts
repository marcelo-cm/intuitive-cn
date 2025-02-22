'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { ServerActionResponse } from '@/hooks/use-server-action';

import { TInsertUser, TUser } from '@/db/db-schema';
import { CreateUserSchema } from '@/db/schema';
import { createClient } from '@/lib/supabase/server';

import { SigninSchema } from '../(auth)/schemas';
import UserService from '../_services/user-service';

// Create

// Read

export async function getUser(
  id: string,
): Promise<ServerActionResponse<TUser>> {
  try {
    const user = await UserService.getUser(id);

    if (!user) {
      return {
        status: 'error',
        data: null,
        error: {
          code: '404',
          message: 'User not found',
        },
      };
    }

    return {
      status: 'success',
      data: user,
      error: null,
    };
  } catch (e: unknown) {
    console.log('[getUser]', JSON.stringify(e, null, 2));
    return {
      status: 'error',
      data: null,
      error: {
        message: 'Failed to get user',
      },
    };
  }
}

// Update

// Delete

// Helpers, Utilities, and others

export async function signin(
  data: z.infer<typeof SigninSchema>,
): Promise<ServerActionResponse<TUser>> {
  const supabase = await createClient();

  try {
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
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error: {
        message: 'Failed to sign in',
      },
      data: null,
    };
  }
}

export async function signup(
  data: z.infer<typeof CreateUserSchema>,
): Promise<ServerActionResponse<TUser>> {
  const supabase = await createClient();

  try {
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

    const [user] = await UserService.createUser(body);

    if (!user) {
      redirect('/login');
    }

    revalidatePath('/', 'layout');

    redirect('/home');
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error: {
        message: 'Failed to sign up',
      },
      data: null,
    };
  }
}

/**
 * @description A server action that returns a string after a delay. This is only used to test the server action hook.
 */
export async function serverAction(): Promise<
  ServerActionResponse<{
    word: string;
  }>
> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      status: 'success',
      data: {
        word: 'Hello',
      },
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error: {
        message: 'Failed to execute server action',
      },
      data: null,
    };
  }
}

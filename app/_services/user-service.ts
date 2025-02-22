import { eq } from 'drizzle-orm';

import { db } from '@/db/db';
import { TInsertUser, TUser, users } from '@/db/db-schema';

/**
 * Interactions with the database for Users
 */
const UserService = {
  /**
   * @description Create a user
   * @param user - The user to create
   * @returns The created user
   */
  createUser: async (user: TInsertUser & { id: string }): Promise<TUser[]> => {
    return await db.insert(users).values(user).returning();
  },
  /**
   * @description Get a user by their ID
   * @param id - The ID of the user to get
   * @returns The user with the given ID
   */
  getUser: async (id: string): Promise<TUser | undefined> => {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  },
};

export default UserService;

import { User } from 'src/schemas/User.js';

import { TeamRetroService } from '../../services/TeamRetro.service.js';
import { createSearchParams } from '../../utils/url.js';

class UsersService extends TeamRetroService {
  /**
   * List users with optional pagination
   * @param params Optional parameters for pagination
   * @returns List of users with pagination info
   */
  async listUsers(params?: {
    offset?: number;
    limit?: number;
  }): Promise<ListApiResponse<User>> {
    const searchString = createSearchParams({
      offset: { value: params?.offset },
      limit: { value: params?.limit },
    });

    return this.get<ListApiResponse<User>>(`/v1/users?${searchString}`);
  }

  /**
   * Adds a new user to the system or updates an existing user.
   * 
   * @param email - The email of the user to add or update, used as an identifier in the API path
   * @param userData - The user data to be added
   * @param userData.name - The name of the user, can be null
   * @param userData.emailAddress - The email address of the user
   * @returns A promise that resolves to a SingleApiResponse containing the created or updated User
   */
  async addUser(
    email: string,
    userData: { name: string | null; emailAddress: string }
  ): Promise<SingleApiResponse<User>> {
    return this.put<SingleApiResponse<User>>(`/v1/users/${email}`, {
      body: userData,
    });
  }

  /**
   * Update an existing user's information
   * @param email The user's current email address
   * @param updateData The fields to update
   * @returns Updated user information
   */
  async updateUser(
    email: string,
    updateData: { name?: string | null; emailAddress?: string }
  ): Promise<SingleApiResponse<User>> {
    return this.patch<SingleApiResponse<User>>(`/v1/users/${email}`, {
      body: updateData,
    });
  }

  async deleteUser(email: string): Promise<SingleApiResponse<any>> {
    return this.delete<SingleApiResponse<any>>(`/v1/users/${email}`);
  }

  /**
   * Get a single user by email
   * @param email The user's email address
   * @returns User information
   */
  async getUser(email: string): Promise<SingleApiResponse<User>> {
    return this.get<SingleApiResponse<User>>(`/v1/users/${email}`);
  }
}

export const usersService = new UsersService();

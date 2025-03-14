import { TeamRetroService } from "../../services/TeamRetro.service.js";
import { createSearchParams } from "../../utils/url.js";

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

    return this.get<ListApiResponse<User>>(`/v1/users?${searchString}`, {
      method: "GET",
    });
  }
}

export const usersService = new UsersService();

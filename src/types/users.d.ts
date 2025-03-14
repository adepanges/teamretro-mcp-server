declare global {
  /**
   * User representation
   */
  interface User {
    /**
     * User's display name
     * @minLength 1
     * @maxLength 64
     * @example "Lucy Webster"
     */
    name: string | null;

    /**
     * User's email address
     * @format email
     * @example "lucy@teamretro.com"
     */
    email: string;

    /**
     * Whether the user has organization admin privileges
     * @default false
     */
    organizationAdmin: boolean;

    /**
     * Date when this user was created
     * @format date-time
     * @readonly
     */
    created: string;

    /**
     * Whether the user is active
     * @default true
     */
    active: boolean;
  }
}

// This export is needed to make this file a module
export {};


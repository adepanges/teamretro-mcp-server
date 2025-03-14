declare global {
  /**
   * Represents a member of a team in TeamRetro
   */
  export interface TeamMember {
    /**
     * The member's email address (required)
     */
    email: string;
    
    /**
     * The member's display name (optional)
     */
    name: string | null;
    
    /**
     * Whether the member has team admin privileges
     * @default false
     */
    teamAdmin: boolean;
  }
}

export {};


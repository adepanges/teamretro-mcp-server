declare global {
  /**
   * Identifier type with strict pattern validation
   * @pattern ^[a-zA-Z0-9]{22}$
   * @example "4zlWtqrC5eCRnQHprFKfm9"
   * @readonly
   */
  type Identifier = string;

  /**
   * Team member representation
   */
  interface TeamMember {
    /**
     * Member's email address
     * @format email
     * @example "lucy@teamretro.com"
     * @readonly
     */
    email: string;

    /**
     * Member's display name
     * @example "Lucy Webster"
     */
    name?: string | null;

    /**
     * Whether the member has team admin privileges
     * @default false
     */
    teamAdmin?: boolean;
  }

  /**
   * Team representation
   */
  interface Team {
    /**
     * Unique team identifier
     * @readonly
     */
    id: Identifier;

    /**
     * Name of the team
     * @minLength 1
     * @maxLength 64
     * @example "TeamRetro"
     */
    name: string;

    /**
     * Set of unique tags for filtering reports
     * @minItems 0
     * @maxItems 16
     * @example ["Development"]
     */
    tags?: string[];

    /**
     * List of team members
     */
    members: TeamMember[];

    /**
     * Date when this team was first created
     * @format date-time
     * @readonly
     */
    created: string;
  }
}

// This export is needed to make this file a module
export {};

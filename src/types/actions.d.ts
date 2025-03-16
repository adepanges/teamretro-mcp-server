declare global {

  /**
   * Represents an action item or task in the system.
   * 
   * @interface Action
   * @property {string} id - Unique identifier for the action
   * @property {string} title - Title or description of the action
   * @property {'low' | 'medium' | 'high'} priority - Priority level of the action
   * @property {string} created - Timestamp when the action was created
   * @property {string} [due] - Optional timestamp for when the action is due
   * @property {string} [completed] - Optional timestamp for when the action was completed
   * @property {Team} team - The team associated with this action
   * @property {User[]} assignedTo - Array of users assigned to this action
   */
  interface Action {
    id?: string;
    title?: string;
    priority?: 'low' | 'medium' | 'high';
    created?: string;
    due?: string | null;
    completed?: string | null;
    team?: Team;
    teamId?: string;
    assignedTo?: User[];
  }
}

export {};
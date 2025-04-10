# TeamRetro MCP Server Tools

| Category       | Tool Name            | Description | Parameters |
|----------------|----------------------|-------------|------------|
| Users          | **list_users**       | List users with pagination | offset, limit |
| Users          | **add_user**         | Add or update a user by email | email, name |
| Users          | **update_user**      | Update an existing user's information | email, name, emailAddress |
| Users          | **delete_user**      | Delete a user by email | email |
| Users          | **get_user**         | Get a single user by email | email |
| Teams          | **list_teams**       | List teams from TeamRetro with filtering and pagination | offset, limit, teamTags, teamIds |
| Teams          | **detail_team**      | Get a single team by ID | id |
| Teams          | **update_team**      | Update an existing team | id, name, tags |
| Teams          | **create_team**      | Create a new team with optional members and tags | name, tags, members |
| Teams          | **delete_team**      | Delete an existing team | teamId |
| Team Members   | **list_team_members** | List team members with pagination | teamId, offset, limit |
| Team Members   | **get_team_member**  | Get a team member by email | teamId, email |
| Team Members   | **update_team_member** | Update a team member by email | teamId, email, teamAdmin |
| Team Members   | **remove_team_member** | Remove a team member by email | teamId, email |
| Team Members   | **add_team_member**  | Add a team member by email | teamId, email, teamAdmin |
| Actions        | **list_actions**     | List actions from TeamRetro with filtering and pagination | offset, limit, teamTags, teamIds |
| Actions        | **create_action**    | Create a new action in TeamRetro | teamId, title, due, complete, assignedTo |
| Actions        | **get_action**       | Get a single action by ID | id |
| Actions        | **update_action**    | Update an existing action | actionId, teamId, title, due, complete, priority, assignedTo |
| Actions        | **delete_action**    | Delete an existing action | actionId |

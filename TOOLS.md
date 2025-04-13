# TeamRetro MCP Server Tools

| Category       | Tool Name            | Description | Parameters |
|----------------|----------------------|-------------|------------|
| Users          | **list_users**       | List users with pagination using offset and limit parameters to control the number of results returned | offset, limit |
| Users          | **add_user**         | Add a new user or update an existing user's information by their email address, specifying optional name and emailAddress | email, name, emailAddress |
| Users          | **update_user**      | Update an existing user's details, such as their name and emailAddress, by providing their current email | email, name, emailAddress |
| Users          | **delete_user**      | Delete a user by their email address | email |
| Users          | **get_user**         | Retrieve detailed information about a single user by their email address | email |
| Teams          | **list_teams**       | List teams from TeamRetro with filtering by tags and IDs, and pagination using offset and limit parameters | offset, limit, teamTags, teamIds |
| Teams          | **detail_team**      | Retrieve detailed information about a single team by its unique ID | id |
| Teams          | **update_team**      | Update an existing team's details, such as its name and associated tags, by providing the team's ID | id, name, tags |
| Teams          | **create_team**      | Create a new team with a required name, and optional tags and members | name, tags, members |
| Teams          | **delete_team**      | Delete an existing team by its ID | teamId |
| Team Members   | **list_team_members** | Retrieve a list of team members for a specified team ID with pagination controls for offset and limit | teamId, offset, limit |
| Team Members   | **get_team_member**  | Fetch a team member by their email address within a specified team | teamId, email |
| Team Members   | **update_team_member** | Update a team member's details, such as their name or team admin status, by their email address within a specified team | teamId, email, name, teamAdmin |
| Team Members   | **remove_team_member** | Remove a team member from a team by their email address | teamId, email |
| Team Members   | **add_team_member**  | Add a new team member to a team by their email address, with optional specification of team admin status | teamId, email, teamAdmin |
| Actions        | **list_actions**     | Retrieve a list of actions from TeamRetro with optional filtering by team tags and team IDs, and pagination controls for offset and limit | offset, limit, teamTags, teamIds |
| Actions        | **create_action**    | Create a new action in TeamRetro with required details such as team ID, title, due date, completion status, and assigned user | teamId, title, due, complete, assignedTo |
| Actions        | **get_action**       | Fetch a single action by its unique ID from TeamRetro | id |
| Actions        | **update_action**    | Update an existing action in TeamRetro with new details such as title, due date, completion status, priority, and assigned user | actionId, teamId, title, due, complete, priority, assignedTo |
| Actions        | **delete_action**    | Delete an existing action from TeamRetro by its action ID | actionId |
| Agreements     | **list_agreements**  | List agreements from TeamRetro with optional filtering by team tags and team IDs, as well as pagination controls | offset, limit, teamTags, teamIds |
| Agreements     | **create_agreement** | Create a new agreement in TeamRetro by specifying the team it belongs to and its title | team, title |
| Agreements     | **get_agreement**    | Retrieve a single agreement by its unique identifier | id |
| Agreements     | **update_agreement** | Update an existing agreement's details such as its title or associated team | id, team, title |
| Agreements     | **delete_agreement** | Delete an existing agreement by specifying its unique identifier | id |
| Health Checks  | **list_health_checks** | List health checks from TeamRetro with optional filtering by health model IDs, team tags, and team IDs, as well as pagination controls | healthModelIds, include, offset, limit, teamTags, teamIds |
| Health Checks  | **get_health_check** | Retrieve a single health check by its unique identifier with optional attributes to include | id, include |
| Health Checks  | **delete_health_check** | Delete an existing health check by specifying its unique identifier | id |
| Health Models  | **list_health_models** | List health models from TeamRetro with pagination controls | offset, limit |
| Health Models  | **get_health_model** | Retrieve a single health model by its unique identifier | id |
| Retrospectives | **list_retrospectives** | List retrospectives from TeamRetro with filtering by team tags and IDs, and pagination using offset and limit parameters | offset, limit, teamTags, teamIds |
| Retrospectives | **get_retrospective** | Retrieve detailed information about a single retrospective by its unique ID | id |
| Retrospectives | **delete_retrospective** | Delete an existing retrospective by its ID | id |

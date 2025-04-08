# TeamRetro MCP Server Tools

## Teams
- **list_teams**
  - Description: List teams from TeamRetro with filtering and pagination
  - Parameters: offset, limit, teamTags, teamIds
- **detail_team**
  - Description: Get a single team by ID
  - Parameters: id
- **update_team**
  - Description: Update an existing team
  - Parameters: id, name, tags
- **create_team**
  - Description: Create a new team with optional members and tags
  - Parameters: name, tags, members
- **delete_team**
  - Description: Delete an existing team
  - Parameters: teamId

## Actions
- **list_actions**
  - Description: List actions from TeamRetro with filtering and pagination
  - Parameters: offset, limit, teamTags, teamIds
- **create_action**
  - Description: Create a new action in TeamRetro
  - Parameters: teamId, title, due, complete, assignedTo
- **get_action**
  - Description: Get a single action by ID
  - Parameters: id
- **update_action**
  - Description: Update an existing action
  - Parameters: actionId, teamId, title, due, complete, priority, assignedTo
- **delete_action**
  - Description: Delete an existing action
  - Parameters: actionId

## Team Members
- **list_team_members**
  - Description: List team members with pagination
  - Parameters: teamId, offset, limit
- **get_team_member**
  - Description: Get a team member by email
  - Parameters: teamId, email
- **update_team_member**
  - Description: Update a team member by email
  - Parameters: teamId, email, teamAdmin
- **remove_team_member**
  - Description: Remove a team member by email
  - Parameters: teamId, email
- **add_team_member**
  - Description: Add a team member by email
  - Parameters: teamId, email, teamAdmin

## Users
- **list_users**
  - Description: List users with pagination
  - Parameters: offset, limit
- **add_user**
  - Description: Add or update a user by email
  - Parameters: email, name
- **update_user**
  - Description: Update an existing user's information
  - Parameters: email, name, emailAddress
- **delete_user**
  - Description: Delete a user by email
  - Parameters: email
- **get_user**
  - Description: Get a single user by email
  - Parameters: email

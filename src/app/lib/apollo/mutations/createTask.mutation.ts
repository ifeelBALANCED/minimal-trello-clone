import { gql } from '@apollo/client';

export const CreateTaskMutation = gql(`
    mutation CreateTask(
      $id:          String,
      $title:       String!,
      $description: String!
      $status:      String!
      $userId:      String
    ) {
      createTask(
        id:          $id,
        title:       $title,
        description: $description,
        status:      $status
        userId:      $userId
      ) {
        id
        title
        description
        status
      }
    }
`);

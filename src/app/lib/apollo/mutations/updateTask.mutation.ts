import { gql } from '@apollo/client';

export const UpdateTaskMutation = gql(`
    mutation UpdateTask(
      $id:          String!,
      $title:       String!,
      $description: String!
      $status:      String!
      $userId:      String
    ) {
      updateTask(
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

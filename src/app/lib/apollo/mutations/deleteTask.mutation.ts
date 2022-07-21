import { gql } from '@apollo/client';

export const DeleteTaskMutation = gql(`
    mutation DeleteTask($id: String!) {
      deleteTask(id: $id) {
        id
      }
    }
`);

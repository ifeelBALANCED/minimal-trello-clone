import { gql } from '@apollo/client';

export const AllTasksQuery = gql(`
    query {
      tasks {
        id
        title
        description
        status
      }
    }
`);

import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation($account: String!, $password: String!) {
    login(data: { student_id: $account, password: $password }) {
      raw
    }
  }
`;

export const SUBMIT_STUDENT_MUTATION = gql`
  mutation($content: String) {
    message: submitStudent(data: { content: $content })
  }
`;

export const SUBMIT_COURSE_MUTATION = gql`
  mutation($content: String) {
    message: submitCourse(data: { content: $content })
  }
`;

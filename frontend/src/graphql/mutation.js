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
export const CREATE_COMMENT_MUTATION = gql`
  mutation(
    $semester: String!
    $type: String! #必修、選修、十選二
    $name: String!
    $domain: String #CS、光電...
    $teacher: String!
    $studyTogether: String
    $studyBefore: String
    $content: [String]!
    $score: Int
    $author: String
  ) {
    createComment(
      data: {
        semester: $semester
        type: $type
        name: $name
        domain: $domain
        teacher: $teacher
        studyTogether: $studyTogether
        studyBefore: $studyBefore
        content: $content
        score: $score
        author: $author
      }
    ) {
      name
    }
  }
`;

export const CHANGE_NICKNAME = gql`
  mutation($nickname: String!) {
    success: changeNickname(nickname: $nickname)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation($password: String!) {
    success: changePassword(password: $password)
  }
`;

export const UPDATE_WISH = gql`
  mutation($course_name: String!, $priority: [String!]!) {
    updateWish(data: { course_name: $course_name, priority: $priority }) {
      course_name
    }
  }
`;
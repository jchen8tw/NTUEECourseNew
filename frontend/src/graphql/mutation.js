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
    $content: String!
    $score: Float
    $author: String
  ) {
    message: createComment(
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
    )
  }
`;
export const MODIFY_COMMENT_MUTATION = gql`
  mutation(
    $_id: String!
    $semester: String!
    $type: String! #必修、選修、十選二
    $name: String!
    $domain: String #CS、光電...
    $teacher: String!
    $studyTogether: String
    $studyBefore: String
    $content: String!
    $score: Float
    $author: String
  ) {
    message: modifyComment(
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
        _id: $_id
      }
    )
  }
`;
export const DELETE_COMMENT_MUTATION = gql`
  mutation($_id: String!) {
    message: deleteComment(data: { _id: $_id })
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
    wish: updateWish(data: { course_name: $course_name, priority: $priority }) {
      _id
      name: course_name
      priority
    }
  }
`;

export const RESPONSE_MUTATION = gql`
  mutation($author: String, $content: String, $comment_id: String) {
    message: createResponse(
      data: { author: $author, content: $content, comment_id: $comment_id }
    )
  }
`;

export const STARTADMISSION_MUTATION = gql`
  mutation {
    file: startAdmission {
      raw
    }
  }
`;

export const UPDATE_WISH_WITH_TEAMMATE = gql`
  mutation(
    $student_ids: [String!]
    $course_name: String!
    $priority: [String!]!
  ) {
    wish: updateWishWithTeammate(
      data: {
        student_ids: $student_ids
        course_name: $course_name
        priority: $priority
      }
    ) {
      _id
      student_ids
      name: course_name
      priority
    }
  }
`;

import gql from 'graphql-tag';

export const COURSE_QUERY = gql`
  query {
    allCourseGroups {
      _id
      name
      grade
      courses {
        _id
        teacher
      }
    }
  }
`;

export const QUERY_COMMENT_LIST = gql`
  query($type: String!, $name: String, $teacher: String) {
    getCommentList(type: $type, name: $name, teacher: $teacher) {
      semester
      name
      _id
      type
      domain
      teacher
    }
  }
`;

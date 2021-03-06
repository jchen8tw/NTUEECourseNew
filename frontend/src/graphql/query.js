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
  query($type: String!, $name: String, $teacher: String, $author: String) {
    getCommentList(
      type: $type
      filter: { name: $name, teacher: $teacher, author: $author }
    ) {
      _id
      semester
      type
      name
      domain
      teacher
      score
      author
    }
  }
`;

export const CONTENT_QUERY = gql`
  query($id: String) {
    getComment(_id: $id) {
      _id
      semester
      type
      name
      domain
      teacher
      studyTogether
      studyBefore
      content
      score
      author
      responses {
        author
        content
      }
    }
  }
`;

export const NICKNAME_QUERY = gql`
  query {
    me {
      _id
      nickname
    }
  }
`;

export const WISHES_AND_COURSE_QUERY = gql`
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
    allWishes {
      _id
      student_ids
      name: course_name
      priority
    }
  }
`;

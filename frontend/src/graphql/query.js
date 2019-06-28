import gql from 'graphql-tag';

const COURSE_QUERY = gql`
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
export default COURSE_QUERY;
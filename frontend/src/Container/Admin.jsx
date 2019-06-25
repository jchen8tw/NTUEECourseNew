import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'gray',
    height: '500px',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'pre-line'
  },
  droparea: {
    backgroundColor: '#dddddd',
    border: '2px #000000 dashed',
    borderRadius: '5px',
    height: '100px',
    width: '300px'
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});
class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.onDrop = acceptedFiles => {
      this.setState({ files: acceptedFiles }); //display selected filename
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
        this.setState({ fileContents: binaryStr });
      };

      acceptedFiles.forEach(file => reader.readAsText(file)); //using UTF-8 ro read the string
    };

    this.state = {
      files: [],
      fileContents: ''
    };
  }
  render() {
    const {
      submit,
      data,
      loading,
      error,
      classes,
      type,
      innerText
    } = this.props;
    const failed = !!error; // Efficiently cast error to bool
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <form
        onSubmit={e => {
          e.preventDefault(); // Prevent the page from refreshing
          if (this.state.files.length === 0) {
            alert('請確認有檔案後再上傳!!!');
            return;
          }
          submit({
            variables: {
              title: type,
              content: this.state.fileContents
            }
          });
          console.log('OK');
        }}
      >
        <Dropzone
          onDrop={this.onDrop}
          accept={'.csv, text/csv'} //Only accept csv file. Note: .csv is important.adding text/csv only doesn't work
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="container">
              <div
                {...getRootProps({ className: 'dropzone' })}
                className={classes.droparea}
              >
                <input {...getInputProps()} />
                <p>{innerText}</p>
              </div>
              <aside>
                <h4>File</h4>
                <ul>{files}</ul>
              </aside>
            </section>
          )}
        </Dropzone>
        <Button
          variant="outlined"
          type="submit"
          color="primary"
          className={classes.button}
        >
          確認上傳
        </Button>
      </form>
    );
  }
}
const ADMIN_MUTATION = gql`
  mutation Submit($title: String, $content: String) {
    adminSubmit(data: { title: $title, content: $content }) {
      message
    }
  }
`;
class Admin extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <div className="classes.root">
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <h1>學生資料上傳</h1>
                <p>
                  檔案須為.csv檔。資料格式須為:
                  <br /> 學號,姓名
                </p>
                <Mutation mutation={ADMIN_MUTATION}>
                  {(submit, { data, loading, error }) => (
                    <SubmitForm
                      {...{
                        submit,
                        data,
                        loading,
                        error,
                        classes,
                        type: 'adminStudentData',
                        innerText:
                          '拖曳"學生資料"於此區塊，\n或是點擊此區塊上傳"學生資料"'
                      }}
                    />
                  )}
                </Mutation>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <h1>課程資料上傳</h1>
                <p>
                  檔案須為.csv檔。資料格式須為:
                  <br /> 課號,班號,教師姓名,課名,人數上限,年級
                </p>
                <Mutation mutation={ADMIN_MUTATION}>
                  {(submit, { data, loading, error }) => (
                    <SubmitForm
                      {...{
                        submit,
                        data,
                        loading,
                        error,
                        classes,
                        type: 'adminCourseData',
                        innerText:
                          '拖曳"課程資料"於此區塊，\n或是點擊此區塊上傳"課程資料"'
                      }}
                    />
                  )}
                </Mutation>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <h1>開始選課</h1>
                <Button
                  variant="outlined"
                  type="submit"
                  color="secondary"
                  className={classes.button}
                >
                  開始選課啦 GOGOGO
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
export default withStyles(styles)(Admin);

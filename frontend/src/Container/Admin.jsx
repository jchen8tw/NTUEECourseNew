import React, { Component } from 'react';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import {
  LinearProgress,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar
} from '@material-ui/core';
import {
  SUBMIT_STUDENT_MUTATION,
  SUBMIT_COURSE_MUTATION,
  STARTADMISSION_MUTATION
} from '../graphql/mutation';
import SnackbarContent from '../Components/SnackbarContent';
import fileDownload from 'js-file-download';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '500px',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'pre-line',
    overflow: 'hidden'
  },
  droparea: {
    display: 'table',
    backgroundColor: theme.palette.grey[200],
    border: '2px #000000 dashed',
    borderRadius: '5px',
    height: '100px',
    width: '300px'
  },
  activeDroparea: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.secondary.main,
    fontSize: '2.5rem'
  },
  button: {
    margin: theme.spacing.unit
  },
  title: {
    color: 'rgba(0, 0, 0, 0.75)',
    fontWeight: '600'
  }
});

class SubmitForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      fileContents: ''
    };
  }

  handleDrag = ({ getRootProps, getInputProps, isDragActive }) => {
    const { droparea, activeDroparea } = this.props.classes;
    let message = isDragActive ? '拖曳至此處' : this.props.innerText;
    return (
      <>
        <div
          {...getRootProps({
            className: classNames(droparea, { [activeDroparea]: isDragActive })
          })}
        >
          <input {...getInputProps()} />
          <p
            style={{
              display: 'table-cell',
              verticalAlign: 'middle'
            }}
          >
            {message}
          </p>
        </div>
        <aside>
          <h4>File:</h4>
          <ul>
            {this.state.files.map(file => (
              <li key={file.name}>
                {file.name} - {file.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </>
    );
  };

  handleSubmit = e => {
    e.preventDefault(); // Prevent the page from refreshing
    if (this.state.files.length === 0) {
      alert('請確認有檔案後再上傳!!!');
      return;
    }
    this.props.submit({
      variables: {
        content: this.state.fileContents
      }
    });
  };

  onDrop = acceptedFiles => {
    this.setState({ files: acceptedFiles }); // display selected filename
    const reader = new FileReader();

    reader.onabort = () => console.error('file reading was aborted');
    reader.onerror = () => console.error('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      this.setState({ fileContents: binaryStr });
    };

    acceptedFiles.forEach(file => reader.readAsText(file)); // use UTF-8 to read the string
  };

  render() {
    const { classes, loading } = this.props;
    if (loading) return <LinearProgress color="secondary" />;
    return (
      <form onSubmit={this.handleSubmit}>
        <Dropzone
          onDrop={this.onDrop}
          accept={'.csv, text/csv'} //Only accept csv file. Note: .csv is important, adding text/csv only won't work
          multiple={false}
        >
          {this.handleDrag}
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

const Admin = ({ classes }) => {
  const [message, setMessage] = React.useState(null);
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <Grid container spacing={24} style={{ width: '100%', margin: '0' }}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h1" className={classes.title}>
              學生資料上傳
            </Typography>
            <p>
              檔案須為.csv檔。資料格式須為:
              <br /> 學號,姓名
            </p>
            <Mutation
              mutation={SUBMIT_STUDENT_MUTATION}
              onCompleted={data => setMessage(data.message)}
            >
              {(submit, { loading }) => (
                <SubmitForm
                  {...{
                    submit,
                    loading,
                    classes,
                    innerText:
                      '拖曳「學生資料」於此區塊，\n或是點擊此區塊上傳「學生資料」'
                  }}
                />
              )}
            </Mutation>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h1" className={classes.title}>
              課程資料上傳
            </Typography>
            <p>
              檔案須為.csv檔。資料格式須為:
              <br /> 課號,班號,教師姓名,課名,人數上限,年級
            </p>
            <Mutation
              mutation={SUBMIT_COURSE_MUTATION}
              onCompleted={data => setMessage(data.message)}
            >
              {(submit, { loading }) => (
                <SubmitForm
                  {...{
                    submit,
                    loading,
                    classes,
                    innerText:
                      '拖曳「課程資料」於此區塊，\n或是點擊此區塊上傳「課程資料」'
                  }}
                />
              )}
            </Mutation>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h1" className={classes.title}>
              開始選課
            </Typography>
            <Mutation mutation={STARTADMISSION_MUTATION}>
              {(login, { data, loading }) => {
                return (
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    className={classes.button}
                    disabled={loading}
                    onClick={data => fileDownload(data, 'result.csv')}
                  >
                    開始選課啦 GOGOGO
                  </Button>
                );
              }}
            </Mutation>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={!!message}
        autoHideDuration={2200}
        onClose={() => setMessage(null)}
      >
        <SnackbarContent
          variant="success"
          message={message}
          onClose={() => setMessage(null)}
        />
      </Snackbar>
    </div>
  );
};
export default withStyles(styles)(Admin);

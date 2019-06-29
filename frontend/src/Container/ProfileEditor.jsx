import React from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
  Paper,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Query, Mutation } from 'react-apollo';
import { CHANGE_NICKNAME, CHANGE_PASSWORD } from '../graphql/mutation';
import { NICKNAME_QUERY } from '../graphql/query';

const style = theme => ({
  formPaper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '5%',
    '& > *': {
      margin: '5px'
    },
    '&:hover': {
      boxShadow: theme.shadows[4]
    }
  },
  formHelperTextRoot: {
    display: 'none',
    textAlign: 'right'
  },
  formHelperTextError: {
    display: 'initial'
  }
});

const ProfileEditor = ({ oldNickname = '', classes }) => {
  const [nickname, setNickname] = React.useState(oldNickname);
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  return (
    <div style={{ padding: '10% 5%' }}>
      <Typography variant="h3" align="left">
        編輯個人資料
      </Typography>
      <Grid container spacing={24} style={{ marginTop: '2rem' }}>
        <Grid item md={6} xs={12}>
          <Mutation mutation={CHANGE_NICKNAME}>
            {(changeNickname, _) => (
              <Paper
                component="form"
                square
                className={classes.formPaper}
                onSubmit={e => {
                  e.preventDefault();
                  changeNickname({ variables: { nickname } });
                }}
              >
                <TextField
                  label="更改暱稱"
                  placeholder="請輸入暱稱"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                />
                <Button
                  variant="outlined"
                  style={{ alignSelf: 'flex-end' }}
                  type="submit"
                >
                  送出
                </Button>
              </Paper>
            )}
          </Mutation>
        </Grid>
        <Grid item md={6} xs={12}>
          <Mutation mutation={CHANGE_PASSWORD}>
            {(changePassword, _) => (
              <Paper
                component="form"
                square
                onSubmit={e => {
                  e.preventDefault();
                  changePassword({ variables: { password } });
                }}
              >
                <FormControl
                  required
                  error={password !== passwordConfirm}
                  component="fieldset"
                  className={classes.formPaper}
                >
                  <FormLabel componene="legend" style={{ textAlign: 'left' }}>
                    更改密碼
                  </FormLabel>
                  <TextField
                    label="密碼"
                    placeholder="請輸入密碼"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <TextField
                    label="確認密碼"
                    placeholder="請再次輸入密碼"
                    type="password"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
                  />
                  <FormHelperText
                    classes={{
                      root: classes.formHelperTextRoot,
                      error: classes.formHelperTextError
                    }}
                  >
                    密碼不一致
                  </FormHelperText>
                  <Button
                    variant="outlined"
                    type="submit"
                    style={{
                      alignSelf: 'flex-end',
                      marginLeft: 'auto',
                      marginRight: '0'
                    }}
                  >
                    送出
                  </Button>
                </FormControl>
              </Paper>
            )}
          </Mutation>
        </Grid>
      </Grid>
    </div>
  );
};

const StyledProfileEditor = withStyles(style)(ProfileEditor);

const ProfileEditorWithUserData = () => (
  <Query query={NICKNAME_QUERY} fetchPolicy="no-cache">
    {({ data, loading, error }) => {
      if (loading) return <CircularProgress color="secondary" />;
      if (error) return 'Error!';
      return <StyledProfileEditor oldNickname={data.me.nickname} />;
    }}
  </Query>
);

export default ProfileEditorWithUserData;

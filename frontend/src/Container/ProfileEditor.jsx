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
import { connect } from 'react-redux';
import { send_success } from '../redux/actions';
import { withStyles } from '@material-ui/core/styles';
import { Query, Mutation } from 'react-apollo';
import { CHANGE_NICKNAME, CHANGE_PASSWORD } from '../graphql/mutation';
import { NICKNAME_QUERY } from '../graphql/query';

const mapDispatchToProps = dispatch => ({
  sendSuccess: data => dispatch(send_success(data))
});

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

const EEgroupList = [
  '電波',
  '光電',
  '奈電',
  '電力',
  '生醫',
  '控制組',
  'CS',
  '通訊',
  'ICS',
  'EDA'
];
const nicknameList = [
  '最後希望',
  '金城武',
  '傑出青年',
  '未來之光',
  '肥宅',
  '狂瀾勇士',
  '烈焰巫師',
  '奧米加咆哮獸',
  '學渣',
  '電神',
  '幹話王',
  '乂萬佛卍朝宗乂',
  '卍滅龍乂帝天尊卍',
  '乂戀空卍弒魂者乂',
  '卍弒魔煞乂嵐月卍',
  '破卍忍乂天殺卍滅',
  '卍乂真龍傲天乂卍',
  '墮卍戩屮刃天卍翼',
  '🇰🇷🐟',
  '卍無滅卍',
  '出哥',
  '葛格',
  '聖結石',
  '小玉',
  '放火'
];

const ProfileEditor = ({ oldNickname = '', classes }) => {
  const [nickname, setNickname] = React.useState(oldNickname);
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const handleRandomGen = () => {
    setNickname(
      EEgroupList[Math.floor(Math.random() * EEgroupList.length)] +
        nicknameList[Math.floor(Math.random() * nicknameList.length)]
    );
  };
  return (
    <div style={{ padding: '10% 5%' }}>
      <Typography variant="h3" align="left">
        編輯個人資料
      </Typography>
      <Grid container spacing={24} style={{ marginTop: '2rem' }}>
        <Grid item md={6} xs={12}>
          <Mutation
            mutation={CHANGE_NICKNAME}
            onCompleted={data => data.success && sendSuccess('成功更改暱稱')}
          >
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
                  placeholder="請輸入暱稱(長度最多12個字)"
                  value={nickname}
                  onChange={e => {
                    if (e.target.value.length > 12) {
                      alert('暱稱不可超過12個字');
                    } else setNickname(e.target.value);
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleRandomGen}
                    style={{ margin: '0 2%' }}
                  >
                    隨機生成暱稱
                  </Button>
                  <Button variant="outlined" type="submit">
                    送出
                  </Button>
                </div>
              </Paper>
            )}
          </Mutation>
        </Grid>
        <Grid item md={6} xs={12}>
          <Mutation
            mutation={CHANGE_PASSWORD}
            onCompleted={data => data.success && sendSuccess('成功更改密碼')}
          >
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
                    onChange={e => {
                      if (e.target.value.length > 50) {
                        alert('密碼過長!不可超過50個字');
                      } else setPassword(e.target.value);
                    }}
                  />
                  <TextField
                    label="確認密碼"
                    placeholder="請再次輸入密碼"
                    type="password"
                    value={passwordConfirm}
                    onChange={e => {
                      if (e.target.value.length > 50) {
                        alert('密碼過長!不可超過50個字');
                      } else setPasswordConfirm(e.target.value);
                    }}
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

const connectedProfileEditor = connect(
  undefined,
  mapDispatchToProps
)(ProfileEditor);

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

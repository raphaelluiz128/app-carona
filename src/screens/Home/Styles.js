import styled from 'styled-components/native';
import commonStyles from '../../commonStyles';

export const Container = styled.View`
flex:1;`

export const Background = styled.View`
flex:3;`

export const TitleBar = styled.View`
flex:1;
justify-content: flex-end;`

export const Title = styled.Text`
    font-family: ${commonStyles.fontFamily};
    color: ${commonStyles.colors.secondary};
    font-size: 30;
    margin-left: 20;
    margin-bottom: 10;
`

export const SubTitle = styled.Text`
    font-family: ${commonStyles.fontFamily};
    color: ${commonStyles.colors.secondary};
    font-size: 20;
    margin-left: 20;
    margin-bottom: 30;
`

export const Login = styled.View`
    flex: 2;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 26;
`

export const loginOk = styled.View`
    flex: 2;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    margin-top: 60;
`

export const AvisoLoginOk = styled.Text`
    font-family: ${commonStyles.fontFamily};
    color: ${commonStyles.colors.secondary};
    font-size: 18;
    margin-top: 15;
`

export const TextLogin = styled.TextInput`
    font-family: ${commonStyles.fontFamily};
    color: ${commonStyles.colors.secondary};
    font-size: 18;
    border-color: gray;
    border-bottom-width: 1;
`

export const TextLoginOk = styled.Text`
    font-family: ${commonStyles.fontFamily};
    color: ${commonStyles.colors.secondary};
    font-size: 22;
`

export const TaksContainer = styled.View`
    flex: 5;
    marginTop: 35;
    flexDirection:row;
    alignItems: center;
    justifyContent: space-around;   
`
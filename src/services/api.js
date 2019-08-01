import {create} from 'apisauce';

const api = create({
    //url do heroku baseURL: 'http://apicarona.herokuapp.com',
    //baseURL:'http://zxkytqsms9.execute-api.eu-central-1.amazonaws.com/latest',
    baseURL:'https://2qzvrumuh8.execute-api.sa-east-1.amazonaws.com/latest',
    headers: {
        'Content-Type': 'application/json',
      },
      // 10 second timeout...
      timeout: 10000
});

export default api;
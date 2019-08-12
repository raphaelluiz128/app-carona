import {create} from 'axios';

const api = create({
    //url do heroku baseURL: 'http://apicarona.herokuapp.com',
    //baseURL:'http://zxkytqsms9.execute-api.eu-central-1.amazonaws.com/latest',
    baseURL:'https://jh50xvis5j.execute-api.sa-east-1.amazonaws.com/latest',
    headers: {
        'Content-Type': 'application/json',
      },
      
      timeout: 20000
});

export default api;
const axiost = require('axios');
const { sync } = require('rimraf');

(async() => {
    const {data} = await axios.post('http://localhost:3000/auth/register',{
        username: 'Blend',
        password: 'blend'
    });

    console.log(data);
});
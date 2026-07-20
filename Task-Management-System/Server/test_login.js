const axios = require('axios');

async function testLogin() {
    try {
        const response = await axios.post('https://taskmanagerapi2.7qhpyc3.b4a.run/api/login', {
            email: 'Test1@gmail.com',
            password: 'Test1@gmail.com'
        });
        console.log("Response:", response.data);
    } catch (e) {
        console.error("Error:", e.message);
    }
}
testLogin();

import axios from 'axios';


class BarkipediaApi { 

    static token;

    static BASE_URL = 'http://localhost:3001';


    //method to save token and set default headers
    static _saveToken(token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['x-access-token'] = token;
    }
   

    // method to signup a user
    static async signup(userData) {
        try {
            let res = await axios.post(`${this.BASE_URL}/auth/users`, userData);
            this._saveToken(res.data.token);
            return res.data;
        } catch (error) {
            console.error("Error Signing Up", error.response.data.message);
            throw error;
        }
    }

    // method to login a user
    static async login(loginData) {
        try {
            let res = await axios.post(`${this.BASE_URL}/auth/login`, loginData);
            this._saveToken(res.data.token);
            return res.data;
        } catch (error) {
            console.error("Error Logging In", error);
            throw error;
        }
    }


    //method to get facts of day
    static async getFact() {
        try {
            let res = await axios.get('https://dogapi.dog/api/v2/facts');
            return res.data
        } catch (error) {
            console.error('Error getting fact', error);
            throw error;
        }
    }

    //method to get img for facts of day
    static async getImage() {
        try {
            let res = await axios.get('https://dog.ceo/api/breeds/image/random');
            return res.data
        } catch (error) {
            console.error('Error getting image', error);
            throw error;
        }
    }

    // method to get facts for users 
    static async getFacts() {
        try {
            let res = await axios.get(`${this.BASE_URL}/users/facts`);
            return res.data
        } catch (error) {
            console.error('Error getting facts', error);
            throw error;
        }
    }
    // method to save a fact to users array 
    static async saveFact(username, factBody) {
      
        try {
            let res = await axios.post(`${this.BASE_URL}/users/facts`, {username, factBody}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res.data
        } catch (error) {
            console.log("Fact being sent to backend:", factBody);
            
            throw error;
        }
    }

    // method to get saved facts for users
    static async getSavedFacts (username) {
        try {
            let res = await axios.get(`${this.BASE_URL}/users/saved/${username}`);
            return res.data
        } catch (error) {
            console.error('Error getting saved facts', error);
            throw error;
        }
    }

    // method to delete a specific fact from user
    static async deleteFact (username, factBody) {
        try {
            let res = await axios.delete(`${this.BASE_URL}/users/saved/${username}`, {
                data: {factBody}
            });
            return res.data
        } catch (error) {
            console.error(`Error deleting fact: ${factBody} `, error);
            throw error;
        }
    }

    // method to get user's profile info
    static async getUserProfile() {
        try {
            let res = await axios.get(`${this.BASE_URL}/users/profile`);
            return res.data;
        } catch (error) {
            console.error('Error getting facts', error);
            throw error;
        }
    }

    // // method to update user's profile info
    static async updateUser(username, updateData) {
        try {
            let res = await axios.put(`${this.BASE_URL}/users/profile/${username}`, {newUsername: updateData});
            return res.data;
        } catch (error) {
            console.log(`Tried to update ${username} to ${updateData}`)
            console.error('Error updating user', error);
            throw error;
        }
    }

    // // method to delete user's profile 
    static async deleteUser(username) {
        try {
            let res = await axios.delete(`${this.BASE_URL}/users/profile/${username}`);
            return res.data;
        } catch (error) {
            console.error('Error deleting user', error);
            throw error;
        }
    }
}

export default BarkipediaApi;
Social Gamer Connect
Welcome to Social Gamer Connect! This web application is designed to bring together anti-social online game players by providing a platform where they can log in with Google, share their interests, and connect with others.

Features
Google Login: Users can authenticate and log in using their Google accounts.
Interest Management: Users can enter and manage their personal interests.
User Management: Users can change their information and password.
Map Integration: View user locations on a map based on longitude and latitude values using the Leaflet API.
Database: MySQL is used to manage user data and interests.
Technologies Used
Node.js: Backend server
JavaScript: Programming language for the application logic
CommonJS: Module system used for organizing code
Handlebars (hbs): Templating engine for rendering HTML views
MySQL: Database for storing user information and interests
Leaflet API: Map service for displaying user locations
Installation
Clone the repository:

bash
git clone https://github.com/yourusername/social-gamer-connect.git
cd social-gamer-connect
Install dependencies:

bash
npm install
Set up environment variables:

Create a .env file in the root directory and add your configuration details:

makefile
DATABASE_URL=mysql://user:password@localhost:3306/yourdatabase
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
Run the application:

bash
npm start
Access the application:

Open your web browser and go to http://localhost:3000.

Usage
Login: Click on the Google login button to authenticate.
Manage Interests: After logging in, you can enter and manage your interests.
Map Page: View the map to see user locations based on their provided longitude and latitude.
Contributing
Feel free to submit issues and pull requests if you have suggestions or improvements.




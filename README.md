# University Search App

This is a web application that allows users to search for universities and manage their favorites.

## Prerequisites

- Docker
- Node.js and npm (for local development)

## Running the Application

1. Clone this repository:

   ```
   git clone 'https://github.com/derekjj/university-search-app-vue'
   cd university-search-app-vue
   ```

2. Using Docker Compose:
    - for dev

        ```
        docker-compose up vue-dev
        ```
    - for prod

        ```
        docker-compose up vue-prod
        ```
2. or To run server without docker
    - <sub> (only required once after clone) <sub>
        ```
        npm install
        ```
    - start the server
        ```
        npm run serve
        ```

4. Open your web browser and navigate to `http://localhost:8080` to use the application.


## Features

- Search for universities by country
- Filter results by name
- Add/remove universities to/from favorites
- View favorites
- Responsive design for mobile and desktop

## Technologies Used

- Vue
- Vue Router
- Docker
- Bootstrap & CSS for styling
- Vuex for store management
- Axios for api calls

## API Used

This application uses the API from http://universities.hipolabs.com/search to fetch university data.

## Contributing

Feel free to submit pull requests or create issues for any bugs or improvements.

## License

This project is open source and available under the [MIT License](LICENSE).

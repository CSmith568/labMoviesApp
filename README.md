Assignment 2 - Movies App 
Author: Claire Smith
Student #: 20099917
Demo: 
GitHub Repo: https://github.com/CSmith568/assign2-movie-app.git

🎬 Movie App – React SPA
📌 Overview
This project is a Single Page Application (SPA) built using React and TypeScript.
It extends the Movies app developed in the labs by integrating additional features and data from the TMDB API, including Actors and TV Shows. The application demonstrates the use of modern React concepts such as component-based architecture, routing, state management, and API integration.

🚀 Features
🎨 UI / Pages
The application includes multiple views:

.Home page with movies
.Favourite movies
.Upcoming movies
.Movie details
.Actor pages (Popular, Top Rated, Detail)
.TV Shows pages (Popular, Top Rated, Trending, Detail)
.Review pages (view and create)
.Fantasy Movie creator page


📋 List Views

.Popular Actors
.Top Rated Actors
.Popular TV Shows
.Top Rated TV Shows
.Trending TV Shows


🔍 Detail Views

.Movie Details
.Actor Details (biography and roles)
.TV Show Details


🔗 Routing
Routing is handled using React Router, including parameterised routes such as:

/movies/:id
/actors/:id
/tv-shows/:id
/reviews/:id

Users can navigate between pages through clickable links and dynamic routes.

🔗 Data Navigation

.List pages link directly to detail views
.Interactive navigation across Movies, Actors, and TV Shows sections


🧩 Data Models
The app includes multiple data types:

.Movies
.Actors
.TV Shows


⚡ State Management & Caching

.Uses React Query to fetch and cache API data efficiently
.Minimises unnecessary API calls and improves performance


🔧 Filtering & Sorting
Implemented on the Trending TV Shows page:

.Sort by popularity, rating, or name
.Filter by minimum rating (e.g. 6+, 7+, 8+)


📄 Pagination
Pagination is implemented on:

.Actor pages (using query parameters)
.TV Show pages (using a custom pagination component)


🎬 Fantasy Movie Feature
Users can create their own custom “Fantasy Movie”.
Each movie includes:

.Title
.Overview
.Genres
.Release Date
.Runtime
.Production Company

Created movies are displayed immediately in the UI.

🌐 API Integration

The application integrates with the TMDB (The Movie Database) API to dynamically fetch data for movies, actors, and TV shows.  

React Query is used to manage API calls, caching, and state updates efficiently.  

Integration with a custom backend API (from Assignment 1) has not been implemented, but this could be added in the future to support features such as authentication and data persistence.

🧠 Technologies Used

.React
.TypeScript
.React Router
.React Query (@tanstack/react-query)
.Material UI (MUI)


🗺️ Routes

| Route | Description |
|------|-------------|
| `/` | Home Page |
| `/movies/:id` | Movie Details |
| `/movies/favourites` | Favourite Movies |
| `/movies/upcoming` | Upcoming Movies |
| `/reviews/:id` | Movie Review |
| `/reviews/form` | Add Review |
| `/actors/popular` | Popular Actors |
| `/actors/top-rated` | Top Rated Actors |
| `/actors/:id` | Actor Details |
| `/tv-shows/popular` | Popular TV Shows |
| `/tv-shows/top-rated` | Top Rated TV Shows |
| `/tv-shows/trending` | Trending TV Shows |
| `/tv-shows/:id` | TV Show Details |
| `/fantasy` | Fantasy Movie Creator |

## 🤖 AI Usage

AI tools (such as Gemini and Copilot) were used during the development of this project to support learning and implementation (see examples in C:\Users\yk71\labMoviesApp\src\images).

These tools were used to:
- Assist with debugging and resolving errors  
- Suggest improvements to code structure and TypeScript usage  
- Support the implementation of features such as pagination, filtering, and routing  
- Assist with documentation writing  

All suggestions were reviewed, tested, and modified where necessary to ensure correctness and understanding.

⚠️ Known Limitations

.Fantasy movies are stored in memory and are not saved after page refresh
.Actor “Known For” items are displayed but not linked to movie detail pages
.Authentication features are not implemented


🔮 Future Improvements

.Persist fantasy movies using localStorage or backend storage
.Add favourites for actors and TV shows
.Implement authentication and protected routes
.Add multi-criteria search functionality
.Integrate backend APIs from Assignment 1
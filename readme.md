# Investment Tracker

## Introduction
Investment Tracker is a web application designed to help users manage and track their investments in one place. It provides a comprehensive dashboard to monitor asset performance, visualize portfolio distribution, and manage assets efficiently. The application aims to simplify investment tracking and decision-making.

## Project Type
Fullstack

## Deployed App
Frontend: [https://investatracker.netlify.app/index.html] 
Backend: [https://investment-tracker-backend.example] 
Database: [https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com/portfolio]

## Directory Structure
Investment Tracker/
├─ img/
├─ js/
│  ├─ ...
|....

## Video Walkthrough of the Project
Attach a short video walkthrough showcasing all features of the application. [1 - 3 minutes]
"https://drive.google.com/file/d/1ecje8P2A8j27hzSFM2sykmYhJnLpmzeJ/view?usp=drive_link"

## Video Walkthrough of the Codebase
Attach a short video walkthrough explaining the codebase structure and functionality. [1 - 5 minutes]
https://drive.google.com/file/d/1F5-ImHO61MGjXg2OySQcu1mjKQK9ApCC/view?usp=drive_link


## Features
- Add, view, and delete assets in the portfolio.
- Filter assets by type (Stocks, Crypto, Bonds).
- Visualize portfolio distribution using charts (Pie, Line, Bar, Radar).
- Live asset value updates using external APIs.
- User authentication (Sign Up, Login, Logout).

## Design Decisions or Assumptions
- Firebase is used for authentication and database management.
- Chart.js is used for data visualization.
- Tailwind CSS is used for responsive and modern UI design.
- Assumes users have basic knowledge of investment types.

## Installation & Getting Started
Follow these steps to set up and run the project locally:

```bash
# Clone the repository
git clone https://github.com/username/investment-tracker.git

# Navigate to the project directory
cd investment-tracker



## Usage
1. Sign up or log in to access the dashboard.
2. Add new assets by providing details like type, name, quantity, and prices.
3. View and manage your portfolio using the dashboard.
4. Use filters to view specific asset types.
5. Monitor live asset values and visualize portfolio performance.

## Credentials
Provide the following credentials for authenticated pages:
- Email: testuser@example.com
- Password: testpassword

## APIs Used
- [Alpha Vantage API](https://www.alphavantage.co/) for fetching live asset values.
- Firebase Realtime Database for storing portfolio data.

## API Endpoints
### Backend API Endpoints
- **GET /portfolio** - Retrieve all portfolio items.
- **POST /portfolio** - Add a new portfolio item.
- **DELETE /portfolio/:id** - Delete a portfolio item.

### External APIs
- **Alpha Vantage API**
  - `GET /query?function=GLOBAL_QUOTE&symbol={symbol}` - Fetch stock/bond prices.
  - `GET /query?function=CURRENCY_EXCHANGE_RATE&from_currency={crypto}&to_currency=INR` - Fetch cryptocurrency prices.

## Technology Stack
- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Backend**: Firebase Realtime Database, Firebase Authentication
- **Libraries**: Chart.js, Fetch API
- **APIs**: Alpha Vantage API

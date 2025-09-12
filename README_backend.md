# Backend Setup Instructions

## 1. Install Dependencies

Navigate to the backend directory and install dependencies:

```
cd vi_web_view_backend
npm install
```


## 2. Add Your Cohere API Key

Create a `.env` file inside `vi_web_view_backend` (if it doesn't exist) and add your Cohere API key:

```
COHERE_API_KEY=your_cohere_api_key_here
```

## 3. Run the Backend Server

Start the backend server with:

```
node index.js
```

The backend will run at `http://localhost:3001` by default.

---

**Note:**
- Never commit your `.env` file or API keys to version control.
- Make sure `vi_web_view_backend/node_modules/` and `.env` are listed in `.gitignore`.

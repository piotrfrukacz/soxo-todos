# 📝 Next.js ToDo App

This is a simple ToDo application built with **Next.js**, using **TypeScript**, **React Context API**, and **Axios**. It includes filtering, loading state, error handling.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/piotrfrukacz/soxo-todos.git
cd soxo-todos

### 2. Install Dependencies

Make sure you have Node.js and npm installed and use command below:

```

npm install

```

### 3. Run the Development Server

```

npm run dev

```

The app should now be running at http://localhost:3000

### 4. Build for Production

```

npm run build
npm start

```

### 🧪 5. Running Tests

To run unit and integration tests:

```

npm run test

```

### Requirements

- Node.js 18+ recommended

- npm
```


## Project structure

📁/app
    📁 _components
        /shared            # global components

    📁 /todos
            page.tsx           # Todo list route
        page.tsx               # Main page

    📁 /modules
        📁 /todos
            📁 /components
                TodoItem.tsx
                TodoList.tsx
            📁 /services
                todoService.ts   # fetch logic
            📁 /types
                index.ts         # typy np. Todo
            📁 /hooks
                useTodos.ts      # custom hook
        index.js                 # main todo list file


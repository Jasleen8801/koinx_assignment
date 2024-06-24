<h3 align="center">Koinx Assignment</h3>

---

<p align="center"> This is a assignment for Backend position at Koinx
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
<!-- - [Deployment](#deployment) -->
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>

This project implements a server-side application using Node.js and MongoDB to handle cryptocurrency trade data. It provides APIs for uploading CSV files containing trade data and retrieving asset-wise balances at a given timestamp.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites <a name="prerequisites"></a>

Ensure you have the following installed on your machine:

- Node.js (v14.x or later)
- MongoDB (local installation or MongoDB Atlas)
- npm (Node package manager)

### Installing <a name = "installing"></a>

1. Clone the repository:

```bash
git clone https://github.com/Jasleen8801/koinx_assignment.git
cd koinx_assignment
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
PORT=3000
DATABASE_URL=<ADD YOUR MONGODB URI HERE>
```

4. To start the server, run:

```bash
npm start
```

5. To start the server in development mode, run:

```bash
npm run dev
```

<!-- ## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system. -->

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Prisma](https://www.prisma.io/) - ORM


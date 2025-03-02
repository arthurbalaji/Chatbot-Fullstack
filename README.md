# Meta Llama 3.1 8B Chatbot

A full-stack chatbot application using Meta Llama 3.1 8B model with React frontend, Spring Boot backend, Python Flask API, and MySQL database. The application is containerized using Docker and orchestrated with Docker Compose.

## Architecture

```plaintext
+----------------+     +-----------------+     +---------------+
|  React Frontend| <-> | Spring Backend  | <-> | MySQL Database|
+----------------+     +-----------------+     +---------------+
         ^                    ^
         |                    |
         v                    v
   +----------------------+
   |    Python Backend    |
   | (Meta Llama 3.1 8B)  |
   +----------------------+
```

## Features

- User authentication with Firebase
- Real-time chat interface
- Chat history management
- Integration with Meta Llama 3.1 8B model
- Containerized microservices architecture

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Spring Boot (Java), Flask (Python)
- **Database**: MySQL
- **Authentication**: Firebase
- **AI Model**: Meta Llama 3.1 8B
- **Containerization**: Docker, Docker Compose

## Prerequisites

- Docker and Docker Compose
- Java JDK 17
- Node.js 18
- Python 3.10
- MySQL 8.0

## Project Structure

```plaintext
.
├── React-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── firebase.js
│   ├── Dockerfile
│   └── nginx.conf
├── Springboot-backend/
│   ├── demo/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── java/
│   │   │       └── resources/
│   │   └── Dockerfile
├── Python Backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
└── docker-compose.yml
```

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd chatbot-meta-llama
   ```

2. **Environment Setup**
   - Create a Firebase project and add configuration to `React-frontend/src/firebase.js`
   - Update the Together AI API key in `Python Backend/app.py`

3. **Build and Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Spring Boot Backend: `http://localhost:8080`
   - Python Backend: `http://localhost:5000`

## API Endpoints

### Spring Boot Backend

#### User Endpoints
- `GET /users/exists/{mailId}` - Check if user exists
- `GET /users/{mailId}` - Get user details
- `POST /users` - Create new user

#### Chat Endpoints
- `POST /chats/{userMailId}` - Create new chat
- `PUT /chats/{chatId}/messages` - Add message to chat
- `PUT /chats/{chatId}` - Update chat name
- `GET /chats` - Get all chats
- `GET /chats/{chatId}` - Get chat by ID
- `GET /chats/user/{userMailId}` - Get user's chats

### Python Backend

- `POST /chat` - Send message to Meta Llama model

## Docker Configuration

### Services
- **MySQL**: Database service
- **Spring Boot Backend**: Java backend service
- **Python Backend**: Python API service
- **React Frontend**: Web interface service

### Networks
- **chatbot-network**: Bridge network for service communication

## Development

### Running Services Individually

1. **Frontend**
   ```bash
   cd React-frontend
   npm install
   npm start
   ```

2. **Spring Boot Backend**
   ```bash
   cd Springboot-backend/demo
   ./mvnw spring-boot:run
   ```

3. **Python Backend**
   ```bash
   cd Python Backend
   pip install -r requirements.txt
   python app.py
   ```

### Building Docker Images

```bash
# Build individual services
docker build -t springboot-backend ./Springboot-backend/demo
docker build -t python-backend ./Python Backend
docker build -t react-frontend ./React-frontend
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Meta Llama 3.1 8B model
- Together AI API
- Firebase Authentication
- Spring Boot Framework
- React.js Community
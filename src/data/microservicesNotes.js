// Microservices Category Notes
export const microservicesNotes = [
  {
    id: 12,
    category: 'Microservices',
    question: 'What are Microservices and what are their advantages?',
    answer: `Microservices is an architectural approach where an application is built as a collection of small, independent services that communicate over well-defined APIs.

**Key Characteristics:**
- Each service is independently deployable
- Services are organized around business capabilities
- Services can be developed using different technologies
- Services communicate via lightweight mechanisms (HTTP/REST, messaging)
- Each service has its own database

**Advantages:**
- **Scalability**: Scale individual services independently
- **Technology Diversity**: Use best technology for each service
- **Fault Isolation**: Failure in one service doesn't crash entire system
- **Team Autonomy**: Teams can work independently
- **Faster Deployment**: Deploy services independently
- **Easier Maintenance**: Smaller codebases are easier to understand

**Example Architecture:**
\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │   Product   │    │   Order     │
│  Service    │    │  Service    │    │  Service    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       └──────────────────┴──────────────────┘
                    API Gateway
\`\`\``
  },
  {
    id: 13,
    category: 'Microservices',
    question: 'What is API Gateway pattern in Microservices?',
    answer: `API Gateway is a single entry point for all client requests in a microservices architecture.

**Responsibilities:**
- **Routing**: Routes requests to appropriate microservices
- **Authentication/Authorization**: Handles security at the gateway
- **Load Balancing**: Distributes requests across service instances
- **Rate Limiting**: Controls request rate
- **Request/Response Transformation**: Modifies requests/responses
- **Caching**: Caches responses to reduce load
- **Monitoring**: Logs and monitors requests

**Benefits:**
- Single entry point simplifies client code
- Centralized cross-cutting concerns
- Hides internal service structure
- Can aggregate responses from multiple services

**Example:**
\`\`\`
Client → API Gateway → [Service A, Service B, Service C]

Instead of:
Client → Service A
Client → Service B
Client → Service C
\`\`\`

**Popular API Gateway Solutions:**
- AWS API Gateway
- Kong
- Zuul (Netflix)
- Ocelot (.NET)
- Ambassador`
  },
  {
    id: 14,
    category: 'Microservices',
    question: 'What are the challenges of Microservices architecture?',
    answer: `While microservices offer many benefits, they also introduce several challenges:

**1. Distributed System Complexity:**
- Network latency between services
- Partial failures
- Data consistency across services
- Service discovery and registration

**2. Data Management:**
- Each service has its own database
- Maintaining data consistency (eventual consistency)
- Distributed transactions are complex
- Data duplication across services

**3. Testing:**
- Integration testing is more complex
- Need to test service interactions
- Requires service virtualization/mocking
- End-to-end testing is challenging

**4. Deployment:**
- Need containerization (Docker, Kubernetes)
- Service orchestration
- Version management
- Rollback strategies

**5. Monitoring and Observability:**
- Distributed tracing
- Log aggregation across services
- Performance monitoring
- Health checks

**6. Communication:**
- Service-to-service communication overhead
- Message format standardization
- Error handling across services
- Timeout and retry strategies

**Solutions:**
- Use service mesh (Istio, Linkerd)
- Implement circuit breakers
- Use event-driven architecture
- Centralized logging (ELK stack)
- API Gateway for routing`
  }
];


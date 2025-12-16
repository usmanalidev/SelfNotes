// Angular Category Notes
export const angularNotes = [
  {
    id: 4000,
    category: 'Angular',
    question: 'What is Angular and what are its key features?',
    answer: `Angular is a TypeScript-based open-source web application framework developed by Google.

**Key Features:**
- **Component-based architecture**: Applications built with reusable components
- **TypeScript**: Strong typing and better tooling
- **Dependency Injection**: Built-in DI system for better code organization
- **Two-way data binding**: Automatic synchronization between model and view
- **Routing**: Powerful client-side routing
- **Forms**: Template-driven and reactive forms
- **HTTP Client**: Built-in service for API calls
- **Testing**: Built-in testing utilities

**Example Component:**
\`\`\`typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<h1>{{ userName }}</h1>',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userName = 'John Doe';
}
\`\`\``
  },
  {
    id: 4001,
    category: 'Angular',
    question: 'What is the difference between Angular services and components?',
    answer: `**Components:**
- Represent a view (UI part)
- Have a template (HTML) and styles
- Handle user interactions
- Short-lived (created/destroyed as needed)
- Use services to get data or perform operations

**Services:**
- Contain business logic and data
- Reusable across multiple components
- Singleton by default (one instance per app)
- No template or view
- Used for API calls, data sharing, utilities

**Example Service:**
\`\`\`typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  
  getUsers() {
    return this.http.get('/api/users');
  }
}
\`\`\`

**Example Component using Service:**
\`\`\`typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  template: '<div *ngFor="let user of users">{{ user.name }}</div>'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
\`\`\``
  }
];


# 🛒 Modern E-commerce Platform

A feature-rich e-commerce platform built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and designed for scalability with a **Django DRF backend**.

## 🚀 Features

### 🎯 Core Features
- ✅ **Dynamic Navigation System** - API-driven mega menu with age-based categories
- ✅ **Product Catalog** - Advanced filtering, search, and pagination
- ✅ **Search Functionality** - Debounced search with real-time results
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **User Authentication** - JWT-based authentication system
- ✅ **Shopping Cart** - Persistent cart with local storage
- ✅ **Wishlist** - Save favorite products
- ✅ **Product Reviews** - Rating and review system
- ✅ **Admin Panel** - Content management for products and categories

### 🎨 UI/UX Features
- Modern, clean design with smooth animations
- Skeleton loading states
- Interactive mega menu with promotional badges
- Search overlay with debounced input
- Responsive product cards
- Star rating system
- Toast notifications

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Frontend Development](#frontend-development)
4. [Backend Development](#backend-development)
5. [API Documentation](#api-documentation)
6. [Configuration](#configuration)
7. [Deployment](#deployment)
8. [Contributing](#contributing)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ 
- **npm** or **yarn**
- **Python** 3.9+ (for backend)
- **PostgreSQL** (recommended for production)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecom-nextjs

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```
ecom-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (mock endpoints)
│   │   ├── admin/             # Admin pages
│   │   ├── products/          # Product catalog
│   │   ├── product/           # Product details
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # UI components
│   │   └── ProductCard.tsx   # Product components
│   ├── data/                 # Mock data (development)
│   ├── services/             # API services
│   │   └── api/              # API client functions
│   ├── types/                # TypeScript definitions
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind configuration
└── next.config.ts           # Next.js configuration
```

---

## 🎨 Frontend Development

### 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router with Turbopack)
- **React**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand + React Hooks
- **HTTP Client**: Axios + Custom API wrapper
- **Icons**: Heroicons + React Icons
- **UI Components**: Headless UI

### 🏗️ Architecture Patterns

#### 1. **Component Structure**
```typescript
// Component Template
interface ComponentProps {
  // Props definition
}

export default function Component({ prop }: ComponentProps) {
  // Hooks
  // Event handlers
  // Render logic
}
```

#### 2. **API Service Pattern**
```typescript
// services/api/[service].api.ts
import { apiClient } from './base';

export const getItems = async (): Promise<Item[]> => {
  const response = await apiClient.get('/items');
  return response.data;
};
```

#### 3. **Type-First Development**
```typescript
// types/[domain].ts
export interface Product {
  id: number;
  name: string;
  price: number;
  // ... other properties
}
```

### 🎯 Key Components

#### Navigation System
- **NavBar.tsx** - Main navigation with mega menu
- **SearchOverlay.tsx** - Search functionality
- **SidebarDrawer.tsx** - Mobile navigation

#### Product Components
- **ProductCard.tsx** - Product display card
- **StarRating.tsx** - Rating component

#### UI Components
- **Button.tsx** - Reusable button component
- **Input.tsx** - Form input component
- **Card.tsx** - Container component
- **Loader.tsx** - Loading states

### 📱 Responsive Design

```css
/* Mobile First Approach */
.component {
  @apply flex flex-col;
}

/* Tablet */
@screen md {
  .component {
    @apply flex-row;
  }
}

/* Desktop */
@screen lg {
  .component {
    @apply grid grid-cols-3;
  }
}
```

---

## 🔧 Backend Development

### 🏗️ Required Backend Architecture

#### 1. **Technology Stack**
- **Framework**: Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (djangorestframework-simplejwt)
- **File Storage**: AWS S3 or Cloudinary
- **Cache**: Redis
- **Search**: Elasticsearch (optional)

#### 2. **Database Schema**

```sql
-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(500),
    parent_id UUID REFERENCES categories(id),
    age_group VARCHAR(50),
    section_type VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(500),
    category_id UUID REFERENCES categories(id),
    stock INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Menu Structure
CREATE TABLE menu_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(500),
    age_group VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    display_options JSONB
);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. **Django Models**

```python
# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

class Category(models.Model):
    AGE_GROUPS = [
        ('newborn', 'Newborn (0-3M)'),
        ('baby', 'Baby (3-12M)'),
        ('toddler', 'Toddler (1-3Y)'),
        ('kids', 'Kids (3-5Y)'),
        ('general', 'General'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    image = models.URLField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    age_group = models.CharField(max_length=50, choices=AGE_GROUPS)
    is_active = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    stock = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### 4. **Django REST Framework Views**

```python
# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q

class MenuViewSet(viewsets.ViewSet):
    """
    Menu API endpoints
    """
    
    @action(detail=False, methods=['get'])
    def navigation(self, request):
        """Get complete menu structure"""
        menu_data = {
            'id': 'main-menu-v1',
            'version': '1.0.0',
            'groups': self.get_menu_groups()
        }
        return Response(menu_data)
    
    @action(detail=True, methods=['get'])
    def groups(self, request, pk=None):
        """Get specific menu group"""
        try:
            group = MenuGroup.objects.get(id=pk, is_active=True)
            serializer = MenuGroupSerializer(group)
            return Response(serializer.data)
        except MenuGroup.DoesNotExist:
            return Response({'error': 'Group not found'}, status=404)

class ProductViewSet(viewsets.ModelViewSet):
    """
    Product CRUD operations
    """
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search products"""
        query = request.query_params.get('q', '')
        if query:
            products = self.queryset.filter(
                Q(name__icontains=query) | 
                Q(description__icontains=query)
            )
            serializer = self.get_serializer(products, many=True)
            return Response(serializer.data)
        return Response([])
```

#### 5. **API Serializers**

```python
# serializers.py
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 
                 'age_group', 'is_active', 'sort_order']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 
                 'image', 'category', 'stock', 'created_at']

class MenuGroupSerializer(serializers.ModelSerializer):
    sections = serializers.SerializerMethodField()
    
    class Meta:
        model = MenuGroup
        fields = ['id', 'label', 'slug', 'description', 'image', 
                 'age_group', 'sections', 'display_options']
    
    def get_sections(self, obj):
        # Build sections with categories
        return build_menu_sections(obj)
```

---

## 📚 API Documentation

### 🔗 Base URL
```
Development: http://localhost:8000/api/
Production: https://your-domain.com/api/
```

### 🔐 Authentication
```http
POST /auth/login/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "access": "jwt_token_here",
  "refresh": "refresh_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John"
  }
}
```

### 📋 Menu API

#### Get Navigation Menu
```http
GET /menu/navigation/

Response:
{
  "id": "main-menu-v1",
  "version": "1.0.0",
  "lastUpdated": "2024-01-01T00:00:00Z",
  "groups": [
    {
      "id": "baby-group",
      "label": "BABY (3-12M)",
      "slug": "baby",
      "image": "https://example.com/baby.jpg",
      "sections": [
        {
          "id": "baby-clothing",
          "heading": "Clothing",
          "categories": [
            {
              "id": "baby-rompers",
              "name": "Rompers & Jumpsuits",
              "slug": "baby-rompers",
              "productCount": 15,
              "promotionalBadge": "Trending"
            }
          ]
        }
      ]
    }
  ]
}
```

#### Get Menu Group
```http
GET /menu/groups/{group_id}/

Response:
{
  "id": "baby-group",
  "label": "BABY (3-12M)",
  "slug": "baby",
  "sections": [...],
  "displayOptions": {
    "showInNavbar": true,
    "navbarLabel": "BABY (3-12M)",
    "promotionalText": "Growing with your baby"
  }
}
```

#### Search Categories
```http
GET /menu/search/?q=toys

Response:
[
  {
    "id": "baby-toys",
    "name": "Toys & Play",
    "slug": "toys",
    "productCount": 8,
    "promotionalBadge": "Best Sellers"
  }
]
```

### 🛍️ Product API

#### List Products
```http
GET /products/?category=toys&page=1&limit=12

Response:
{
  "count": 25,
  "next": "http://api/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Educational Toy Set",
      "slug": "educational-toy-set",
      "price": "29.99",
      "image": "https://example.com/toy.jpg",
      "category": {
        "id": "baby-toys",
        "name": "Toys & Play"
      },
      "stock": 15,
      "rating": 4.5,
      "reviewCount": 23
    }
  ]
}
```

#### Search Products
```http
GET /products/search/?q=romper&category=baby

Response:
[
  {
    "id": 2,
    "name": "Cotton Baby Romper",
    "price": "19.99",
    "image": "https://example.com/romper.jpg"
  }
]
```

#### Get Product Details
```http
GET /products/{product_id}/

Response:
{
  "id": 1,
  "name": "Educational Toy Set",
  "description": "Complete educational toy set...",
  "price": "29.99",
  "images": ["url1", "url2"],
  "category": {...},
  "specifications": {...},
  "reviews": [...],
  "relatedProducts": [...]
}
```

### 🛒 Cart API

#### Get Cart
```http
GET /cart/
Authorization: Bearer {jwt_token}

Response:
{
  "id": 1,
  "items": [
    {
      "id": 1,
      "product": {...},
      "quantity": 2,
      "price": "29.99",
      "total": "59.98"
    }
  ],
  "totalItems": 2,
  "totalPrice": "59.98"
}
```

#### Add to Cart
```http
POST /cart/items/
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2
}
```

### 📝 Order API

#### Create Order
```http
POST /orders/
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ],
  "shipping_address": {...},
  "payment_method": "stripe"
}
```

#### Get Order History
```http
GET /orders/
Authorization: Bearer {jwt_token}

Response:
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "status": "delivered",
      "total": "89.97",
      "created_at": "2024-01-01T00:00:00Z",
      "items": [...]
    }
  ]
}
```

---

## ⚙️ Configuration

### 🌍 Environment Variables

#### Frontend (.env.local)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Third-party Services
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-...

# Feature Flags
NEXT_PUBLIC_ENABLE_SEARCH=true
NEXT_PUBLIC_ENABLE_REVIEWS=true
```

#### Backend (.env)
```bash
# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce

# Redis (Cache)
REDIS_URL=redis://localhost:6379/0

# Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1

# Payment
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# JWT
JWT_SECRET_KEY=your-jwt-secret
JWT_ALGORITHM=HS256
JWT_EXPIRATION_DELTA=24
```

### 📦 Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 🎨 Tailwind Configuration

```javascript
// tailwind.config.js (Tailwind CSS 4)
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#64748B',
        accent: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Note**: This project uses **Tailwind CSS 4** with PostCSS integration. The configuration may differ from Tailwind CSS 3.x.

---

## 🚀 Deployment

### 🌐 Frontend Deployment (Vercel)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   - Set in Vercel dashboard
   - Production API URL
   - Third-party service keys

3. **Build Configuration**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install"
   }
   ```

### 🔧 Backend Deployment (Railway/Heroku)

1. **Requirements.txt**
   ```txt
   Django==4.2.0
   djangorestframework==3.14.0
   djangorestframework-simplejwt==5.2.0
   django-cors-headers==4.0.0
   psycopg2-binary==2.9.6
   redis==4.5.5
   celery==5.2.7
   gunicorn==20.1.0
   ```

2. **Procfile**
   ```
   web: gunicorn config.wsgi:application
   worker: celery -A config worker -l info
   ```

3. **Production Settings**
   ```python
   # settings/production.py
   import os
   
   DEBUG = False
   ALLOWED_HOSTS = ['your-domain.com']
   
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': os.environ.get('DB_NAME'),
           'USER': os.environ.get('DB_USER'),
           'PASSWORD': os.environ.get('DB_PASSWORD'),
           'HOST': os.environ.get('DB_HOST'),
           'PORT': os.environ.get('DB_PORT'),
       }
   }
   ```

---

## 🤝 Contributing

### 📋 Development Workflow

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make changes and commit**
   ```bash
   git commit -m "Add new feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/new-feature
   ```
5. **Create Pull Request**

### 📝 Code Standards

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

### 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- --testNamePattern="ProductCard"
```

---

## 📞 Support

For questions and support:
- 📧 Email: support@yourdomain.com
- 💬 Discord: [Join our community](https://discord.gg/your-invite)
- 📖 Documentation: [Full docs](https://docs.yourdomain.com)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Django REST Framework for the robust API framework
- All contributors and community members

---

**Built with ❤️ by [Your Team Name]**

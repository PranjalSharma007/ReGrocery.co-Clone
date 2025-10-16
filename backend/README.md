## ReGroceery Buyer API

Buyer-only backend for organic grocery delivery (zero-waste). Node.js + Express + PostgreSQL via Prisma. JWT auth. Email/password + OTP.

### Environment

Copy `.env.example` to `.env` and fill values:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public
JWT_SECRET=super-secret-change-me
EMAIL_USER=your-smtp-user
EMAIL_PASS=your-smtp-pass
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_FROM=no-reply@re_grocery.local
PORT=3000
```

### Scripts

- `npm install`
- `npx prisma generate`
- `npm run db:push` (or `npm run migrate`)
- `npm run seed`
- `npm run dev`

### Endpoints

- Auth: `/api/auth/register`, `/api/auth/otp/verify-register`, `/api/auth/login`, `/api/auth/otp/verify-login`, `/api/auth/logout`
- Products: `/api/products`, `/api/products/:id`
- Cart: `/api/cart/add`, `/api/cart`, `/api/cart/update`, `/api/cart/remove`, `/api/cart/total`
- Orders: `/api/orders/create`, `/api/orders`
- Bookings: `/api/bookings`
- Wallet: `/api/wallet`



// MongoDB initialization script
db = db.getSiblingDB('antsq');

// Create collections
db.createCollection('users');
db.createCollection('products');
db.createCollection('cart');
db.createCollection('contactForms');
db.createCollection('subscriptions');
db.createCollection('payments');
db.createCollection('customForms');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.products.createIndex({ "category": 1 });
db.cart.createIndex({ "userId": 1 });
db.contactForms.createIndex({ "email": 1 });
db.subscriptions.createIndex({ "email": 1 });
db.payments.createIndex({ "email": 1 });
db.customForms.createIndex({ "email": 1 });

print('Database "antsq" initialized successfully!'); 
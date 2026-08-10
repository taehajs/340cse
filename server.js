import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';

import categoryRoutes from './src/routes/categoryRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import organizationRoutes from './src/routes/organizationRoutes.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 정적 파일 라우트 매핑
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.use(categoryRoutes);
app.use(projectRoutes);
app.use(organizationRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    if (status === 404) {
        res.status(404).render('404', { title: 'Page Not Found' });
    } else {
        res.status(500).render('500', { title: 'Internal Server Error' });
    }
});

app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
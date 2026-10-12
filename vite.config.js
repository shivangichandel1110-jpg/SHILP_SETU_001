import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import generateListingHandler from './api/ai/generate-listing.js';
import generateProductPhotoHandler from './api/ai/generate-product-photo.js';
import editListingHandler from './api/ai/edit-listing.js';
import suggestPriceHandler from './api/ai/suggest-price.js';
import productsHandler from './api/products/index.js';
import singleProductHandler from './api/products/[id].js';

// Custom Vite plugin to serve /api/* routes locally without an extra server process
function localApiPlugin(env) {
  return {
    name: 'local-api-handlers',
    configureServer(server) {
      // Ensure environment variables are on process.env in local dev
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        if (!pathname.startsWith('/api/')) {
          return next();
        }

        // Helper to parse JSON body
        let body = {};
        if (req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT') {
          body = await new Promise((resolve) => {
            let data = '';
            req.on('data', (chunk) => { data += chunk; });
            req.on('end', () => {
              try {
                resolve(data ? JSON.parse(data) : {});
              } catch (e) {
                resolve({});
              }
            });
          });
        }

        // Mock Next/Vercel req/res helpers for convenience
        req.body = body;
        req.query = Object.fromEntries(url.searchParams.entries());

        res.status = (statusCode) => {
          res.statusCode = statusCode;
          return res;
        };

        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        try {
          if (pathname === '/api/ai/generate-listing') {
            return await generateListingHandler(req, res);
          }
          if (pathname === '/api/ai/generate-product-photo') {
            return await generateProductPhotoHandler(req, res);
          }
          if (pathname === '/api/ai/edit-listing') {
            return await editListingHandler(req, res);
          }
          if (pathname === '/api/ai/suggest-price') {
            return await suggestPriceHandler(req, res);
          }
          if (pathname === '/api/products' || pathname === '/api/products/') {
            return await productsHandler(req, res);
          }
          const productMatch = pathname.match(/^\/api\/products\/([^\/]+)$/);
          if (productMatch) {
            req.query.id = productMatch[1];
            return await singleProductHandler(req, res);
          }

          res.status(404).json({ error: 'API route not found' });
        } catch (err) {
          console.error('[API Handler Error]', err);
          res.status(500).json({ error: 'Internal server error', message: err.message });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), localApiPlugin(env)],
    server: {
      port: 3000,
      open: false,
    },
  };
});

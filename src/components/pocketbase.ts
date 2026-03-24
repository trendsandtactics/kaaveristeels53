import PocketBase from 'pocketbase';
import { Product, ProductCategory, PageContent } from '../types/pocketbase';

// Initialize PocketBase (replace with your actual PocketBase URL)
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

// Optionally disable auto-cancellation for server-side fetches
pb.autoCancellation(false);

export async function getProductCategories(): Promise<ProductCategory[]> {
    try {
        const records = await pb.collection('product_categories').getFullList({
            filter: 'isActive = true',
            sort: 'order',
        });
        // Map serialization for Next.js Server Components
        return JSON.parse(JSON.stringify(records));
    } catch (error) {
        console.error("Failed to fetch categories", error);
        return [];
    }
}

export async function getProducts(): Promise<Product[]> {
    try {
        const records = await pb.collection('products').getFullList({
            filter: 'isActive = true',
            sort: 'order',
            expand: 'category',
        });
        return JSON.parse(JSON.stringify(records));
    } catch (error) {
        console.error("Failed to fetch products", error);
        return [];
    }
}

export async function getProductsPageContent(): Promise<PageContent | null> {
    try {
        const record = await pb.collection('page_content').getFirstListItem('pageName="Products"');
        return JSON.parse(JSON.stringify(record));
    } catch (error) {
        console.error("Failed to fetch page content", error);
        // Fallback default SEO content
        return {
            seoTitle: "Premium Steel Products | KAAVERI TMT Bars & Structural",
            seoDescription: "Explore KAAVERI's range of premium TMT bars, structural steel, and billets engineered for strength, durability, and sustainability.",
        };
    }
}

export const getPbImageUrl = (collectionId: string, recordId: string, fileName: string) => 
    `${pb.baseUrl}/api/files/${collectionId}/${recordId}/${fileName}`;
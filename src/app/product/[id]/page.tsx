import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, mockReviews } from '@/data/products';
import ProductDetailClient from '@/components/ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found - Whatbytes',
    };
  }

  return {
    title: `${product.title} - $${product.price} | Whatbytes Store`,
    description: product.description,
    openGraph: {
      title: `${product.title} | Whatbytes Store`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const initialReviews = mockReviews[product.id] || [
    {
      id: 'rev-default-1',
      userName: 'Verified Buyer',
      rating: 5,
      date: 'Recent',
      comment: 'Outstanding quality and exactly as advertised! Exceeded my expectations.',
    },
    {
      id: 'rev-default-2',
      userName: 'Satisfied Customer',
      rating: 4,
      date: '1 week ago',
      comment: 'Great value for money. Very well made and arrived ahead of schedule.',
    },
  ];

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <ProductDetailClient
      product={product}
      initialReviews={initialReviews}
      relatedProducts={relatedProducts}
    />
  );
}

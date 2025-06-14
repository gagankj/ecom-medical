import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'sdp-001',
    name: 'Premium SDP Collection Kit',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Advanced single donor platelet collection system with enhanced safety features and improved efficiency.',
    specifications: [
      'Sterile, single-use system',
      'Advanced leukoreduction technology',
      'Integrated safety features',
      'Compatible with all major apheresis machines',
      'Shelf life: 24 months'
    ],
    category: 'SDP Kits',
    stock: 150,
    inStock: true,
    featured: true
  },
  {
    id: 'sdp-002',
    name: 'Standard SDP Collection Kit',
    price: 199.99,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Reliable standard single donor platelet collection kit for routine blood banking operations.',
    specifications: [
      'Sterile, disposable system',
      'Standard safety protocols',
      'Universal compatibility',
      'Cost-effective solution',
      'Shelf life: 18 months'
    ],
    category: 'SDP Kits',
    stock: 200,
    inStock: true,
    featured: false
  },
  {
    id: 'sdp-003',
    name: 'Pediatric SDP Collection Kit',
    price: 349.99,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Specialized single donor platelet collection kit designed for pediatric patients with reduced volume requirements.',
    specifications: [
      'Pediatric-specific design',
      'Reduced volume collection',
      'Enhanced safety for children',
      'Specialized tubing system',
      'Shelf life: 24 months'
    ],
    category: 'SDP Kits',
    stock: 75,
    inStock: true,
    featured: true
  },
  {
    id: 'acc-001',
    name: 'Platelet Storage Bags',
    price: 45.99,
    image: 'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'High-quality platelet storage bags with gas-permeable material for optimal platelet viability.',
    specifications: [
      'Gas-permeable PVC material',
      'Optimal platelet preservation',
      'Various volume options',
      'Sterile packaging',
      'Shelf life: 36 months'
    ],
    category: 'Accessories',
    stock: 500,
    inStock: true,
    featured: false
  },
  {
    id: 'acc-002',
    name: 'Apheresis Tubing Set',
    price: 89.99,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium quality tubing set for apheresis procedures with reinforced connections.',
    specifications: [
      'Medical-grade PVC tubing',
      'Reinforced connection points',
      'Kink-resistant design',
      'Pre-sterilized',
      'Compatible with major systems'
    ],
    category: 'Accessories',
    stock: 0,
    inStock: false,
    featured: false
  },
  {
    id: 'sdp-004',
    name: 'Research Grade SDP Kit',
    price: 449.99,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'High-purity single donor platelet collection kit designed for research applications.',
    specifications: [
      'Research-grade purity',
      'Enhanced collection efficiency',
      'Minimal platelet activation',
      'Detailed documentation',
      'Shelf life: 12 months'
    ],
    category: 'SDP Kits',
    stock: 25,
    inStock: true,
    featured: true
  }
];
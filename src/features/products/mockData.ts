import productMini from '@/assets/images/product-mini.png';
import productStd7 from '@/assets/images/product-std-7.png';
import productStd9 from '@/assets/images/product-std-9.png';
import productPremium from '@/assets/images/product-premium.png';
import productCustom from '@/assets/images/product-custom.png';
import { ShopifyProduct } from '@/types/shopify';

export const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    node: {
      id: 'gid://shopify/Product/1',
      title: 'The Mini Jewelry Bouquet',
      description: 'The perfect gesture of affection and an exquisite choice for party favors or bulk orders. This handcrafted miniature gift bouquet contains between 1 to 5 hand-selected fashion accessories and delicate jewelry items (such as beautiful stud earrings, luxury hair clips, and dainty rings), artfully arranged in premium wraps.',
      handle: 'mini-jewelry-bouquet',
      priceRange: {
        minVariantPrice: {
          amount: '150',
          currencyCode: 'INR'
        }
      },
      images: {
        edges: [
          {
            node: {
              url: productMini,
              altText: 'The Mini Jewelry Bouquet'
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/1_1',
              title: '1-2 Jewelry Items',
              sku: 'JP-MINI-01',
              price: {
                amount: '150',
                currencyCode: 'INR'
              },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Size',
                  value: '1-2 Jewelry Items'
                }
              ]
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/1_2',
              title: '3-4 Jewelry Items',
              sku: 'JP-MINI-02',
              price: {
                amount: '199',
                currencyCode: 'INR'
              },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Size',
                  value: '3-4 Jewelry Items'
                }
              ]
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/1_3',
              title: '5 Jewelry Items',
              sku: 'JP-MINI-03',
              price: {
                amount: '250',
                currencyCode: 'INR'
              },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Size',
                  value: '5 Jewelry Items'
                }
              ]
            }
          }
        ]
      },
      options: [
        {
          name: 'Size',
          values: ['1-2 Jewelry Items', '3-4 Jewelry Items', '5 Jewelry Items']
        }
      ],
      seo: {
        title: 'The Mini Jewelry Bouquet (₹150 - ₹250) | JewelPetal',
        description: 'Shop handcrafted mini jewelry bouquets with 1-5 items. Ideal for birthdays and bulk orders.'
      }
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/2',
      title: 'The Standard 7-Item Bouquet',
      description: 'Our signature jewelry gift bouquet featuring exactly 7 premium, hand-selected, and beautifully coordinated fashion accessories and jewelry items. Intertwined with premium wrapping materials, this stunning arrangement typically includes luxury earrings, anti-tarnish chain bracelets, elegant hair claws, and stylish styling accessories. Arranged to stun, designed to be worn.',
      handle: 'standard-7-item-bouquet',
      priceRange: {
        minVariantPrice: {
          amount: '599',
          currencyCode: 'INR'
        }
      },
      images: {
        edges: [
          {
            node: {
              url: productStd7,
              altText: 'The Standard 7-Item Bouquet'
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/2',
              title: 'Default Title',
              sku: 'JP-STD-7',
              price: {
                amount: '599',
                currencyCode: 'INR'
              },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Title',
                  value: 'Default Title'
                }
              ]
            }
          }
        ]
      },
      options: [
        {
          name: 'Title',
          values: ['Default Title']
        }
      ],
      seo: {
        title: 'The Standard 7-Item Bouquet (₹599) | JewelPetal',
        description: 'Exquisite signature gift bouquet featuring 7 hand-selected jewelry items.'
      }
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/3',
      title: 'The Standard 9-Item Bouquet',
      description: 'An elevated, luxury gifting experience featuring exactly 9 exquisite jewelry items and premium styling accessories. Every item is carefully selected and hand-arranged within custom pastel wrapping layers. Ideal for milestones, anniversaries, birthdays, and making she feel deeply cherished.',
      handle: 'standard-9-item-bouquet',
      priceRange: {
        minVariantPrice: {
          amount: '699',
          currencyCode: 'INR'
        }
      },
      images: {
        edges: [
          {
            node: {
              url: productStd9,
              altText: 'The Standard 9-Item Bouquet'
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/3',
              title: 'Default Title',
              sku: 'JP-STD-9',
              price: {
                amount: '699',
                currencyCode: 'INR'
              },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Title',
                  value: 'Default Title'
                }
              ]
            }
          }
        ]
      },
      options: [
        {
          name: 'Title',
          values: ['Default Title']
        }
      ],
      seo: {
        title: 'The Standard 9-Item Bouquet (₹699) | JewelPetal',
        description: 'Indulgent luxury gift bouquet featuring 9 handcrafted jewelry and beauty items.'
      }
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/4',
      title: 'The Premium Custom Bouquet',
      description: 'The ultimate bespoke expression of luxury. Features more than 10 premium jewelry items, fully customized according to the occasion (birthdays, baby showers, anniversaries, godh bharai, or corporate gifting). Personalize the experience even further by adding premium chocolates, custom photographs, or handmade crochet flowers to make the gifting ritual truly unforgettable.',
      handle: 'premium-custom-bouquet',
      priceRange: {
        minVariantPrice: {
          amount: '999',
          currencyCode: 'INR'
        }
      },
      images: {
        edges: [
          {
            node: {
              url: productPremium,
              altText: 'The Premium Custom Bouquet'
            }
          },
          {
            node: {
              url: productCustom,
              altText: 'The Premium Custom Bouquet - Customization Add-ons'
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/4_1',
              title: '10+ Items (Base)',
              sku: 'JP-PREM-10',
              price: {
                amount: '999',
                currencyCode: 'INR'
              },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Options',
                  value: '10+ Items (Base)'
                }
              ]
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/4_2',
              title: 'With Premium Chocolates & Photo Add-ons',
              sku: 'JP-PREM-CHOC-PHOTO',
              price: {
                amount: '1299',
                currencyCode: 'INR'
              },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Options',
                  value: 'With Premium Chocolates & Photo Add-ons'
                }
              ]
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/4_3',
              title: 'Luxury Crochet & Premium Add-ons Complete Set',
              sku: 'JP-PREM-CROCHET-ALL',
              price: {
                amount: '1599',
                currencyCode: 'INR'
              },
              compareAtPrice: null,
              availableForSale: true,
              selectedOptions: [
                {
                  name: 'Options',
                  value: 'Luxury Crochet & Premium Add-ons Complete Set'
                }
              ]
            }
          }
        ]
      },
      options: [
        {
          name: 'Options',
          values: [
            '10+ Items (Base)',
            'With Premium Chocolates & Photo Add-ons',
            'Luxury Crochet & Premium Add-ons Complete Set'
          ]
        }
      ],
      seo: {
        title: 'The Premium Custom Bouquet (Starting ₹999) | JewelPetal',
        description: 'Completely bespoke jewelry bouquet with 10+ items, chocolate/photo/crochet customization.'
      }
    }
  }
];


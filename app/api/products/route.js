export async function GET(request) {
  const products = [
    {
      id: 1,
      name: 'Product A',
      price: 29.99,
      image:
        'https://fastly.picsum.photos/id/705/400/300.jpg?hmac=_bnVb-Ux9CzhrF6rWOxfrignt0J8EsuH11b10Aa1ZjY',
      link: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
    },
    {
      id: 2,
      name: 'Product B',
      price: 45.5,
      image:
        'https://fastly.picsum.photos/id/1056/400/300.jpg?hmac=VqvqEJtViEyB5eQzSWzkBr9cPvqfal01P2g-KzKk30Y',
      link: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
    },
    {
      id: 3,
      name: 'Product C',
      price: 19.95,
      image:
        'https://fastly.picsum.photos/id/757/400/300.jpg?hmac=mhAPdsPp9_B7cKZpaSyQ1oWITbK7M72LJRaQBAk1oaI',
      link: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
    },
  ]

  return Response.json(products)
}

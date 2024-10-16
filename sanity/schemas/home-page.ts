import { categories } from '@/constants/site-data'

export default {
  name: 'homePage',
  title: 'Pagina principal',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo de la Pagina',
      description: 'El titulo que se va a mostrar en la pagina principal',
      type: 'string',
      initialValue: 'Pagina Principal / Home Page'
    },
    {
      name: 'bentoThreeImages',
      title: 'Tres Imágenes del Bento',
      description: 'Tres imágenes que se van a mostrar en la pagina principal',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'imageLink',
              title: 'Link de la Imagen',
              description:
                'El link de la imagen que se va a mostrar, dejar en blanco si no se va a mostrar'
            },
            {
              type: 'file',
              name: 'bentoImage',
              title: 'Imagen',
              description:
                'La imagen o el video que se va a mostrar en el bento principal'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.max(3)
    },
    {
      name: 'bentofeaturedCategory',
      title: 'Categoría Destacada del Bento',
      description: 'La categoría que se va a destacar en la pagina principal',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titulo de la Categoría',
          description: 'El titulo de la categoría que se va a destacar',
          type: 'string',
          initialValue: 'Bienestar',
          options: {
            list: [
              ...categories.map((category) => {
                return { title: category, value: category }
              })
            ]
          }
        },
        {
          name: 'description',
          title: 'Pequeña Descripción de la Categoria',
          description:
            'Una breve descripcion de la categoria que se va a destacar',
          type: 'string'
        }
      ]
    },
    {
      name: 'bentoFeaturedProducto',
      title: 'Producto Destacado del Bento',
      description: 'El producto que se va a destacar en la pagina principal',
      type: 'reference',
      to: { type: 'product' }
    },
    {
      name: 'mainListCategories',
      title: 'Categorías Principales del Main List',
      description:
        'Las categorías principales que se van a mostrar en la pagina principal',
      type: 'array',
      of: [
        {
          name: 'category',
          title: 'Categoría',
          description:
            'La categoria que se va a mostrar en la pagina principal',
          type: 'string',
          initialValue: 'Bienestar',
          options: {
            list: [
              ...categories.map((category) => {
                return { title: category, value: category }
              })
            ]
          }
        }
      ],
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (rule: any) => rule.required().min(2).max(6)
    },
    {
      name: 'InfoCards',
      title: 'Tarjetas de Información',
      description:
        'Las tarjetas de información que se van a mostrar en la pagina principal',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icono',
              description:
                'El icono que se va a mostrar en la tarjeta de información',
              type: 'image'
            },
            {
              name: 'title',
              title: 'Titulo',
              description:
                'El titulo que se va a mostrar en la tarjeta de información',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Descripción',
              description:
                'La descripcion que se va a mostrar en la tarjeta de información',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'carousel1',
      title: 'Carousel 1',
      description:
        'El primer carousel que se va a mostrar en la pagina principal',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titulo del Carousel',
          description: 'El titulo del primer carousel',
          type: 'string'
        },
        {
          name: 'category',
          title: 'Categoría',
          description: 'La categoria que se va a mostrar en el primer carousel',
          type: 'string',
          initialValue: 'Bienestar',
          options: {
            list: [
              ...categories.map((category) => {
                return { title: category, value: category }
              })
            ]
          }
        }
      ]
    },
    {
      name: 'carousel2',
      title: 'Carousel 2',
      description:
        'El segundo carousel que se va a mostrar en la pagina principal',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titulo del Carousel',
          description: 'El titulo del segundo carousel',
          type: 'string'
        },
        {
          name: 'category',
          title: 'Categoría',
          description:
            'La categoria que se va a mostrar en el segundo carousel',
          type: 'string',
          initialValue: 'Bienestar',
          options: {
            list: [
              ...categories.map((category) => {
                return { title: category, value: category }
              })
            ]
          }
        }
      ]
    },
    {
      name: 'featuredEvent',
      title: 'Evento Destacado',
      description: 'El evento que se va a destacar en la pagina principal',
      type: 'reference',
      to: { type: 'events' }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'bentofeaturedCategory.title',
      media: 'bentoThreeImages[0]'
    }
  }
}

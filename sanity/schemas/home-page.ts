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
      title: 'Tres Imagenes del Bento',
      description: 'Tres imagenes que se van a mostrar en la pagina principal',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'bentofeaturedCategory',
      title: 'Categoria Destacada del Bento',
      description: 'La categoria que se va a destacar en la pagina principal',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titulo de la Categoria',
          description: 'El titulo de la categoria que se va a destacar',
          type: 'string',
          initialValue: 'Bienestar',
          options: {
            list: [
              { title: 'Bienestar', value: 'Bienestar' },
              { title: 'Cosmética', value: 'Cosmética' },
              { title: 'Cosmética corporal', value: 'Cosmética corporal' },
              { title: 'Cosmética facial', value: 'Cosmética facial' },
              { title: 'Hogar y ambiente', value: 'Hogar y ambiente' }
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
      title: 'Categorias Principales del Main List',
      description:
        'Las categorias principales que se van a mostrar en la pagina principal',
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
              { title: 'Bienestar', value: 'Bienestar' },
              { title: 'Cosmética', value: 'Cosmética' },
              { title: 'Cosmética corporal', value: 'Cosmética corporal' },
              { title: 'Cosmética facial', value: 'Cosmética facial' },
              { title: 'Hogar y ambiente', value: 'Hogar y ambiente' }
            ]
          }
        }
      ],
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (rule: any) => rule.required().min(2).max(6)
    },
    {
      name: 'InfoCards',
      title: 'Tarjetas de Informacion',
      description:
        'Las tarjetas de informacion que se van a mostrar en la pagina principal',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icono',
              description:
                'El icono que se va a mostrar en la tarjeta de informacion',
              type: 'image'
            },
            {
              name: 'title',
              title: 'Titulo',
              description:
                'El titulo que se va a mostrar en la tarjeta de informacion',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Descripción',
              description:
                'La descripcion que se va a mostrar en la tarjeta de informacion',
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
              { title: 'Bienestar', value: 'Bienestar' },
              { title: 'Cosmética', value: 'Cosmética' },
              { title: 'Cosmética corporal', value: 'Cosmética corporal' },
              { title: 'Cosmética facial', value: 'Cosmética facial' },
              { title: 'Hogar y ambiente', value: 'Hogar y ambiente' }
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
              { title: 'Bienestar', value: 'Bienestar' },
              { title: 'Cosmética', value: 'Cosmética' },
              { title: 'Cosmética corporal', value: 'Cosmética corporal' },
              { title: 'Cosmética facial', value: 'Cosmética facial' },
              { title: 'Hogar y ambiente', value: 'Hogar y ambiente' }
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

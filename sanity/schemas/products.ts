export default {
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del producto',
      type: 'string',
      description: 'El nombre del producto que se mostrará en la tienda',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      description: 'La descripción del producto que se mostrará en la tienda'
    },
    {
      name: 'usabilidad',
      title: 'Usabilidad',
      type: 'text',
      description: 'La información de usabilidad del producto'
    },
    {
      name: 'composicion',
      title: 'Composición (Ingredientes y otros detalles)',
      type: 'text',
      description: 'La composición del producto'
    },
    {
      name: 'slogan',
      title: 'Slogan del producto en una frase',
      type: 'string',
      description: 'Un slogan breve del producto en una frase'
    },
    {
      name: 'codigoReferencia',
      title: 'Código de referencia',
      type: 'string',
      description: 'Un código de referencia para el producto'
    },
    {
      name: 'codigoBarras',
      title: 'Código de Barras o EAN',
      type: 'string',
      description: 'El código de barras o EAN del producto'
    },
    {
      name: 'precio',
      title: 'Precio',
      type: 'number',
      description: 'El precio del producto',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'medidas',
      title: 'Medidas',
      type: 'object',
      description: 'Las medidas del producto',
      fields: [
        {
          name: 'ancho',
          title: 'Ancho en cm',
          type: 'number',
          description: 'El ancho del producto en centímetros'
        },
        {
          name: 'alto',
          title: 'Alto en cm',
          type: 'number',
          description: 'El alto del producto en centímetros'
        },
        {
          name: 'profundidad',
          title: 'Profundidad en cm',
          type: 'number',
          description: 'La profundidad del producto en centímetros'
        },
        {
          name: 'peso',
          title: 'Peso',
          type: 'number',
          description: 'El peso del producto'
        },
        {
          name: 'volumen',
          title: 'Volumen en ml',
          type: 'number',
          description: 'El volumen del producto en mililitros'
        }
      ]
    },
    {
      name: 'fotoPrincipal',
      title: 'Foto principal',
      type: 'image',
      description: 'La imagen principal del producto',
      options: {
        hotspot: true
      }
    },
    {
      name: 'fotosVarias',
      title: 'Fotos varias',
      type: 'array',
      description: 'Las fotos varias del producto',
      of: [{ type: 'image' }]
    },
    {
      name: 'fichaTecnica',
      title: 'Ficha técnica del producto descargable',
      type: 'file',
      description: 'La ficha técnica del producto descargable'
    },
    {
      name: 'stock',
      title: 'Stock del producto',
      type: 'number',
      description: 'El stock actual del producto'
    },
    {
      name: 'categoria',
      title: 'Categoría o Familia del producto',
      type: 'string',
      description: 'La categoría o familia a la que pertenece el producto'
    },
    {
      name: 'subcategoria',
      title: 'Subcategoría del Producto',
      type: 'string',
      description: 'La subcategoría a la que pertenece el producto'
    },
    {
      name: 'certificacion',
      title: 'Certificación del producto',
      type: 'string',
      description: 'La certificación del producto'
    }
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'categoria',
      media: 'fotoPrincipal'
    }
  }
}

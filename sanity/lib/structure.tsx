import {
  BadgeEuro,
  BookOpen,
  BookText,
  Calendar,
  ClipboardType,
  Footprints,
  IdCard,
  Mail,
  Map,
  Newspaper,
  PanelsTopLeft,
  RectangleEllipsis,
  ShoppingBasket,
  Ticket,
  UserRound,
  UsersRound
} from 'lucide-react'
import type { StructureBuilder } from 'sanity/structure'

export const lavandaCMSStructure = (S: StructureBuilder) =>
  S.list()
    .title('Lavanda del Lago CMS')
    .items([
      S.listItem()
        .title('Paginas')
        .icon(() => <BookOpen className='h-4 w-4' />)
        .child(
          S.list()
            .title('Paginas de Lavanda')
            .items([
              S.listItem()
                .title('Pagina Principal')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('5f333b54-676c-4841-9e2c-ceee385df2c0')
                ),
              S.listItem()
                .title('Pagina sobre nosotros')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('1a68d633-2715-4993-8261-3c13d5c13f1d')
                ),
              S.listItem()
                .title('Politica de Cookies')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('cookiePolicy')
                    .documentId('0c4f9b2b-1f9e-4d15-982f-63712602fe87')
                ),
              S.listItem()
                .title('Pagina de error')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('errorPage')
                    .documentId('a017c2cc-afd2-4503-a66a-c818f184386f')
                ),
              S.listItem()
                .title('Pagina de error 404')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('notFoundPage')
                    .documentId('f983af31-5fa6-4437-91ee-a51b32b81b26')
                ),
              S.listItem()
                .title('Politica de privacidad')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('privacyPolicy')
                    .documentId('94d5a2b0-a4f9-494d-9064-2413727ee576')
                ),
              S.listItem()
                .title('Politica de Compra y Ventas')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('salesPolicy')
                    .documentId('e1e40f71-f9fe-435e-8f4b-a34c1dd92eaa')
                ),
              S.listItem()
                .title('Con Solo una Flor')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(S.document().schemaType('justAFlower')),
              S.listItem()
                .title('Propiedad')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(S.document().schemaType('property')),
              S.listItem()
                .title('Certificaciones')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(S.document().schemaType('certifications')),
              S.listItem()
                .title('SEO Metatags')
                .icon(() => <BookOpen className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('seoMetatags')
                    .documentId('02065ff6-5152-4ce2-a1a8-d0abcea96470')
                )
            ])
        ),
      S.listItem()
        .title('Layout')
        .icon(() => <PanelsTopLeft className='h-4 w-4' />)
        .child(
          S.list()
            .title('Componentes del Layout')
            .items([
              S.listItem()
                .title('Footer')
                .icon(() => <Footprints className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('footer')
                    .documentId('57ffbd29-4563-41c3-b72a-f2edfb69abee')
                ),
              S.listItem()
                .title('Pre-Footer')
                .icon(() => <RectangleEllipsis className='h-4 w-4' />)
                .child(
                  S.document()
                    .schemaType('prefooter')
                    .documentId('50fedbab-1c83-4c82-a664-4da6372c9efd')
                ),
              S.documentTypeListItem('teams')
                .title('Miembros del Equipo')
                .icon(() => <UsersRound className='h-4 w-4' />)
            ])
        ),
      S.listItem()
        .title('Blog')
        .icon(() => <Newspaper className='h-4 w-4' />)
        .child(
          S.list()
            .title('Contenido del Blog')
            .items([
              S.documentTypeListItem('blog-articles')
                .title('Articulos del Blog')
                .icon(() => <BookText className='h-4 w-4' />),
              S.documentTypeListItem('author')
                .title('Autores')
                .icon(() => <IdCard className='h-4 w-4' />)
            ])
        ),
      S.listItem()
        .title('Usuarios y Ventas')
        .icon(() => <BadgeEuro className='h-4 w-4' />)
        .child(
          S.list()
            .title('Usuarios y Ventas')
            .items([
              S.documentTypeListItem('user')
                .title('Usuarios')
                .icon(() => <UserRound className='h-4 w-4' />),
              S.documentTypeListItem('resellerForm')
                .title('Formularios de Revendedores')
                .icon(() => <ClipboardType className='h-4 w-4' />),
              S.documentTypeListItem('newsletter')
                .title('Subscriptor al Newsletter')
                .icon(() => <Mail className='h-4 w-4' />),
              S.divider(),
              S.documentTypeListItem('purchase')
                .title('Ventas')
                .icon(() => <BadgeEuro className='h-4 w-4' />),
              S.divider(),
              S.documentTypeListItem('shippingAddress')
                .title('Direcciones de Envío')
                .icon(() => <Map className='h-4 w-4' />),
              S.documentTypeListItem('coupon')
                .title('Cupones de descuento')
                .icon(() => <Ticket className='h-4 w-4' />)
            ])
        ),
      S.documentTypeListItem('events')
        .title('Eventos')
        .icon(() => <Calendar className='h-4 w-4' />),
      S.documentTypeListItem('product')
        .title('Productos')
        .icon(() => <ShoppingBasket className='h-4 w-4' />),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homePage',
            'aboutPage',
            'cookiePolicy',
            'errorPage',
            'notFoundPage',
            'privacyPolicy',
            'salesPolicy',
            'seoMetatags',
            'footer',
            'prefooter',
            'author',
            'blog-articles',
            'user',
            'resellerForm',
            'purchase',
            'newsletter',
            'teams',
            'events',
            'product',
            'justAFlower',
            'property',
            'remedies',
            'certifications',
            'shippingAddress',
            'coupon'
          ].includes(listItem.getId()!)
      )
    ])

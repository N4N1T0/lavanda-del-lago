import type { SchemaTypeDefinition } from 'sanity'
import blogArticle from '@sanity-studio/schemas/blog-articles'
import author from '@sanity-studio/schemas/author'
import aboutPage from '@sanity-studio/schemas/about-page'
import teams from '@sanity-studio/schemas/teams'
import homePage from '@sanity-studio/schemas/home-page'
import events from '@sanity-studio/schemas/events'
import products from '@sanity-studio/schemas/products'
import cookiePolicy from './schemas/cookie-policy'
import privacyPolicy from './schemas/privacy-policy'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [blogArticle, author, aboutPage, teams, homePage, events, products, cookiePolicy, privacyPolicy],
}

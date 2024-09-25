import aboutPage from '@sanity-studio/schemas/about-page'
import author from '@sanity-studio/schemas/author'
import blogArticle from '@sanity-studio/schemas/blog-articles'
import cookiePolicy from '@sanity-studio/schemas/cookie-policy'
import errorPage from '@sanity-studio/schemas/errorPage'
import events from '@sanity-studio/schemas/events'
import footer from '@sanity-studio/schemas/footer'
import homePage from '@sanity-studio/schemas/home-page'
import newsletter from '@sanity-studio/schemas/newsletter'
import notFoundPage from '@sanity-studio/schemas/not-found'
import prefooter from '@sanity-studio/schemas/prefooter'
import privacyPolicy from '@sanity-studio/schemas/privacy-policy'
import products from '@sanity-studio/schemas/products'
import purchases from '@sanity-studio/schemas/purchases'
import resellerForm from '@sanity-studio/schemas/reseller-form'
import salesPolicy from '@sanity-studio/schemas/sales-policy'
import seo from '@sanity-studio/schemas/seo'
import teams from '@sanity-studio/schemas/teams'
import user from '@sanity-studio/schemas/user'
import justAFlower from '@sanity-studio/schemas/just-a-flower'
import type { SchemaTypeDefinition } from 'sanity'
import property from './schemas/property'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		blogArticle,
		author,
		aboutPage,
		teams,
		homePage,
		events,
		products,
		cookiePolicy,
		privacyPolicy,
		salesPolicy,
		footer,
		newsletter,
		errorPage,
		notFoundPage,
		prefooter,
		seo,
		user,
		purchases,
		resellerForm,
		justAFlower,
		property,
	],
}

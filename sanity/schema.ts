import type { SchemaTypeDefinition } from 'sanity'
import blogArticle from '@sanity-studio/schemas/blog-articles'
import author from '@sanity-studio/schemas/author'
import aboutPage from '@sanity-studio/schemas/about-page'
import teams from '@sanity-studio/schemas/teams'
import homePage from '@sanity-studio/schemas/home-page'
import events from '@sanity-studio/schemas/events'
import products from '@sanity-studio/schemas/products'
import cookiePolicy from '@sanity-studio/schemas/cookie-policy'
import privacyPolicy from '@sanity-studio/schemas/privacy-policy'
import footer from '@sanity-studio/schemas/footer'
import newsletter from '@sanity-studio/schemas/newsletter'
import errorPage from '@sanity-studio/schemas/errorPage'
import notFoundPage from '@sanity-studio/schemas/not-found'
import prefooter from '@sanity-studio/schemas/prefooter'
import seo from '@sanity-studio/schemas/seo'
import user from '@sanity-studio/schemas/user'
import salesPolicy from '@sanity-studio/schemas/sales-policy'
import purchases from '@sanity-studio/schemas/purchases'
import resellerForm from '@sanity-studio/schemas/reseller-form'

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
	],
}

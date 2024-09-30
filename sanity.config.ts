'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

// Sanity Plugins
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'

// Sanity Config
import { defineConfig } from 'sanity'
import { lavandaCMSStructure } from '@sanity-studio/lib/structure'
import { apiVersion, dataset, projectId } from '@sanity-studio/env'
import { schema } from '@sanity-studio/schema'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool({
      structure: lavandaCMSStructure
    }),
    media(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion })
  ]
})

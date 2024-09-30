// Helper function to read the body
export async function readBody(
  readable: ReadableStream<Uint8Array> | null
): Promise<string> {
  if (!readable) {
    throw new Error('Readable stream is null')
  }

  const reader = readable.getReader()
  const chunks: Uint8Array[] = []

  try {
    let done = false
    while (!done) {
      const { value, done: streamDone } = await reader.read()
      done = streamDone
      if (value) {
        chunks.push(value)
      }
    }
  } finally {
    reader.releaseLock()
  }

  const combined = new Uint8Array(
    chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  )
  let position = 0
  for (const chunk of chunks) {
    combined.set(chunk, position)
    position += chunk.length
  }

  return new TextDecoder().decode(combined)
}

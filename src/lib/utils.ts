// Type imports
import type {
  Breadcrumbs,
  CartItem,
  CategoriesList,
  Product,
  User
} from '@/types'

// Package imports
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function that merges and normalizes CSS class names using Tailwind CSS.
 *
 * @param {string | undefined | string[]} inputs - The CSS class names to merge.
 * @return {string | undefined} - The merged and normalized CSS class names.
 *
 * @example
 * cn('bg-red-500', 'text-white', 'rounded-full', 'p-2') // 'bg-red-500 text-white rounded-full p-2'
 * cn('bg-red-500', undefined, 'rounded-full', 'p-2') // 'bg-red-500 rounded-full p-2'
 * cn('bg-red-500', [], 'rounded-full', 'p-2') // 'bg-red-500 rounded-full p-2'
 */
export function cn(...inputs: Array<string | undefined>): string | undefined {
  return twMerge(clsx(inputs))
}

/**
 * A utility function that formats a number as a Euro currency string.
 *
 * @param {number} number - The number to be formatted as Euro currency.
 * @return {string} The formatted Euro currency string.
 *
 * @example
 * eurilize(1000) // "€1,000.00"
 * eurilize(50.5) // "€50.50"
 * eurilize(12345.6789) // "€12,345.68"
 */
export function eurilize(number: number): string {
  return number.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR'
  })
}

/**
 * A utility function that takes a URL and breaks it apart into a breadcrumb object.
 *
 * @param {string} url - The URL to be broken apart.
 * @return {Breadcrumb} The broken-apart breadcrumb object.
 *
 * @example
 * breakUrlToBreadcrumb('/productos/accessories/belts') // [{ name: 'products', path: '/productos' }, { name: 'accessories', path: '/productos/accessories' }, { name: 'belts', path: '/productos/accessories/belts' }]
 * breakUrlToBreadcrumb('/productos/clothes/jackets?category=coats') // [{ name: 'products', path: '/productos' }, { name: 'clothes', path: '/productos/clothes' }, { name: 'jackets', path: '/productos/clothes/jackets' }, { name: 'coats', path: '/productos/clothes/jackets?category=coats' }]
 */
export function breakUrlToBreadcrumb(url: string): Breadcrumbs {
  const parts = url.split('/').filter(Boolean)
  const breadcrumb: Breadcrumbs = []
  let currentPath = ''
  for (const part of parts) {
    currentPath += `/${part}`
    breadcrumb.push({
      name: part === 'products' ? 'productos' : part,
      path: currentPath
    })
  }
  return breadcrumb
}

/**
 * A utility function that capitalizes the first letter of a string.
 *
 * @param {string} str - The string to be capitalized.
 * @return {string} The capitalized string.
 *
 * @example
 * capitalizeFirstLetter('hello') // 'Hello'
 * capitalizeFirstLetter('world') // 'World'
 * capitalizeFirstLetter('javascript') // 'Javascript'
 */
export function capitalizeFirstLetter(str: string): string {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1)
}

/**
 * Calculates the total cost of a shopping cart, including shipping. and returns an array of three strings.
 * 1 - Subtotal
 * 2 - Total
 * 3 - IVA
 *
 * @param {CartItem[]} count - An array of items in the shopping cart.
 * @param {number} [shipping=0] - The cost of shipping.
 * @return {[string, string, string]} An array of three strings representing the subtotal, total, and tax.
 *
 * @example
 * calculateTotal([{ price: 10, quantity: 1 }, { price: 20, quantity: 2 }], 5) // ['30', '35', '1.75']
 * calculateTotal([{ price: 5, quantity: 3 }, { price: 10, quantity: 1 }], 10) // ['25', '35', '1.75']
 * calculateTotal([{ price: 100, quantity: 1 }], 20) // ['100', '120', '8.5']
 *
 */ export function calculateTotal(
  count: CartItem[],
  discount: number | undefined = undefined,
  postalCode: string | null | undefined,
  country: string | null | undefined,
  cuponDiscount: number
): [string, string, string, string] {
  let subTotal = 0

  // Calculate the subtotal for the items in the cart
  for (const item of count) {
    subTotal += Number(item.precio) * item.quantity
  }

  // Apply discount if it exists
  if (discount !== undefined) {
    subTotal -= discount * subTotal // Subtract the discount from the subtotal
  }

  // Ensure subTotal doesn't go below zero
  subTotal = Math.max(subTotal, 0)

  // Calculate shipping costs
  const shippingCost = getShippingCost(postalCode, subTotal, country)

  // Calculate total and IVA
  const total = subTotal + shippingCost // Total includes shipping costs
  const iva = total * 0.21 // Calculate IVA as 21% of the subtotal

  return [
    eurilize(subTotal), // Subtotal formatted
    eurilize(total - total * (cuponDiscount / 100)), // Total formatted
    eurilize(iva), // IVA formatted
    eurilize(shippingCost)
  ]
}

export const simpleCalculateTotal = (count: CartItem[]) => {
  let subTotal = 0

  // Calculate the subtotal for the items in the cart
  for (const item of count) {
    subTotal += Number(item.precio) * item.quantity
  }

  return subTotal
}

/**
 * Removes an item from the wishlist based on its ID.
 *
 * @param {WPProduct[]} count - The current wishlist.
 * @param {string} id - The ID of the item to remove.
 * @return {WPProduct[]} - The updated wishlist with the item removed.
 *
 * @example
 * removeFromWishlist([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }], '2') // [{ id: 1, name: 'Product 1' }]
 * removeFromWishlist([{ id: 3, name: 'Product 3' }], '2') // [{ id: 3, name: 'Product 3' }]
 */
export const removeFromWishlist = (count: Product[], id: string): Product[] => {
  return count.filter((item) => item.id !== id)
}

/**
 * Filters and sorts an array of categories, removing duplicates and adding a "Todos" category at the beginning.
 *
 * @param {CategoriesList[]} categories - The array of categories to filter and sort.
 * @return {string[]} - The filtered and sorted array of categories.
 */
export const categoriesFilter = (categories: CategoriesList[]): string[] => {
  const tempCategories = categories.map((category) =>
    category?.categoria?.trim()
  )
  return ['Todos', ...Array.from(new Set(tempCategories)).sort()]
}

/**
 * Converts a string into a URL-friendly format.
 *
 * @param {string} name - The string to be converted.
 * @return {string} The converted string.
 */
export function urlize(name: string): string {
  return name
    .trim() // Elimina los espacios al principio y al final
    .toLowerCase() // Convierte a minúsculas
    .normalize('NFC')
    .replace(/\s+/g, '-') // Reemplaza los espacios por guiones
}

/**
 * Converts a URL-friendly string back to its original format.
 *
 * @param {string} url - The URL-friendly string to be converted.
 * @return {string} The converted string with spaces and proper capitalization.
 */
export function desurlizeForBreadcrumbs(url: string): string {
  return decodeURIComponent(url)
    .replace(/-/g, ' ') // Reemplaza guiones por espacios
    .normalize('NFC')
    .split(' ')
    .map((word) => {
      if (word.toLowerCase() === 'ml') {
        return word.toLowerCase() // Mantén "ml" en minúsculas
      }
      // Capitaliza la primera letra de las demás palabras
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

/**
 * Converts a URL-friendly string back to its original format.
 *
 * @param {string} url - The URL-friendly string to be converted.
 * @return {string} The converted string with spaces and proper capitalization.
 */
export function desurlizeForQuery(url: string): string {
  return decodeURIComponent(url)
    .replace(/-/g, ' ') // Reemplaza guiones por espacios
    .normalize('NFC')
    .split(' ')
    .map((word) => {
      if (word.toLowerCase() === 'ml') {
        return word.toLowerCase() // Mantén "ml" en minúsculas
      }
      // Capitaliza la palabra completa
      return word.toUpperCase()
    })
    .join(' ')
}

/**
 * Checks if the difference between a given date and the current date is less than a week.
 *
 * @param {Date} date - The date to check.
 * @return {boolean} Whether the difference is less than a week.
 */
export function isNew(date: string): boolean {
  const today = new Date()
  const difference = today.getTime() - new Date(date).getTime()
  return difference < 7 * 24 * 60 * 60 * 1000
}

/**
 * Finds the most used category in a user's past purchases.
 *
 * @param {User['pastPurchases']} pastPurchases - The user's past purchases.
 * @return {string | null} The most used category, or null if no purchases are found.
 */
export function getMostUsedCategory(
  pastPurchases: User['pastPurchases'] | null
): string | null {
  const categoryCount: Record<string, number> = {}

  if (!pastPurchases) {
    return null
  }

  // Loop through past purchases
  for (const purchase of pastPurchases) {
    for (const product of purchase.products) {
      const category = product.product.categoria

      // Count occurrences of each category
      if (categoryCount[category]) {
        categoryCount[category]++
      } else {
        categoryCount[category] = 1
      }
    }
  }

  // Find the most used category
  let mostUsedCategory: string | null = null
  let maxCount = 0

  for (const category in categoryCount) {
    if (categoryCount[category] > maxCount) {
      mostUsedCategory = category
      maxCount = categoryCount[category]
    }
  }

  return mostUsedCategory
}

/**
 * Returns a color code based on the given status.
 *
 * @param {string} status - The status to determine the color for.
 * @return {string} The color code corresponding to the status.
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'pendiente':
      return '#F59E0B' // Yellow (for Pending)
    case 'completado':
      return '#10B981' // Green (for Completed)
    case 'cancelado':
      return '#EF4444' // Red (for Canceled)
    case 'procesando':
      return '#3B82F6' // Blue (for Processing)
    case 'enviado':
      return '#6366F1' // Indigo (for Shipped)
    case 'entregado':
      return '#22C55E' // Light Green (for Delivered)
    default:
      return '#6B7280' // Gray (for default/fallback)
  }
}

/**
 * Handles security information based on the provided security status.
 *
 * @param {string} security - The security status to handle.
 * @return {{title: string, description: string}} An object containing a title and description for the security information.
 */
export function handlingSecurityInfo(security: string): {
  title: string
  description: string
} {
  switch (security) {
    case 'reseller_access_denied':
      return {
        title: 'Acceso denegado',
        description:
          'No tienes permisos para acceder a esta sección. debes rellenar el formulario de revendedor'
      }
    case 'already_reseller':
      return {
        title: 'Ya eres revendedor',
        description:
          'No necesitas volver a rellenar el formulario de revendedor, si deseas crear un perfil de revendedor para otra persona puedes hacer que se autentifique en el sistema y rellene el formulario.'
      }
    case 'form_already-ok':
      return {
        title: 'Ya tienes un Formulario',
        description:
          'No necesitas volver a rellenar el formulario. pronto uno de nuestros miembros del equipo revisara la info y le llegara un correo automático'
      }
    case 'form_send-ok':
      return {
        title: 'El Formulario ha sido enviado correctamente',
        description:
          'pronto uno de nuestros miembros del equipo revisara la info y le llegara un correo automático'
      }
    case 'unprocessable_entity':
      return {
        title: 'Problemas de Seguridad',
        description:
          'Hubo un problema con el Autentificador de Cuenta. Pruebe otra vez'
      }
    case 'form_password_pwned':
      return {
        title: 'Problemas de Seguridad en la Contraseña',
        description:
          'La contraseña proporcionada se ha encontrado en una filtración de datos en línea. Para la seguridad de tu cuenta, por favor, utiliza una contraseña diferente. Te recomendamos usar una contraseña segura que contenga al menos 8 caracteres, combinando letras mayúsculas y minúsculas, números y símbolos especiales.'
      }
    case 'form_identifier_exists':
      return {
        title: 'Correo Electrónico Ya Registrado',
        description:
          'El correo electrónico o el numero de teléfono ingresado ya está registrado. Por favor, intenta con otro correo electrónico o inicia sesión si ya tienes una cuenta.'
      }

    default:
      return {
        title: 'Problemas de Seguridad',
        description: 'Hubo un problema al procesar tu solicitud.'
      }
  }
}

/**
 * Formats a given address by filtering out null or empty fields and joining them with commas.
 *
 * @param {User['address']} address - The address to be formatted.
 * @return {string} The formatted address as a string.
 */
export function formatAddress(address: User['address']): string {
  if (!address) return 'Sin Direccion'

  const { street, floor, postal_code, locality } = address

  // Filtra campos nulos o vacíos y únalos con una coma
  return [street, floor, postal_code, locality].filter(Boolean).join(', ')
}

/**
 * Takes a string of comma-separated values and formats them into an array of
 * strings with the first letter capitalized.
 *
 * @param {string} composicion - The string to be formatted.
 * @return {string[]} An array of strings with the first letter capitalized.
 */
export const formatComposicion = (composicion: string): string[] => {
  const hasComa = composicion.includes(',')

  if (!hasComa) {
    return composicion
      .toLocaleLowerCase()
      .split(',')
      .map((item) => capitalizeFirstLetter(item))
  } else {
    return composicion
      .toLocaleLowerCase()
      .split(' ')
      .map((item) => capitalizeFirstLetter(item))
  }
}

export const generateShortId = () => {
  const timestamp = Date.now().toString(36)
  const randomNum = Math.floor(Math.random() * 1000).toString(36)
  return `${timestamp}-${randomNum}`
}

export const getShippingCost = (
  postalCode: string | null | undefined,
  amount: number,
  country: string | null | undefined
) => {
  if (!postalCode || !country) return 0

  const isSpain = country === 'España'
  const isUSA = country === 'Estados Unidos'
  const isCanada = country === 'Canada'
  const isEurope = !isSpain && !isUSA && !isCanada
  const isCanaryIslands = isSpain ? isCanaryIlands(Number(postalCode)) : false

  let shippingCost = 0

  if (isSpain) {
    if (isCanaryIslands === true) {
      // Envío a Islas Canarias
      if (amount <= 25) {
        shippingCost = 12
      } else if (amount > 25 && amount <= 50) {
        shippingCost = 7
      } else {
        shippingCost = 0 // Envío gratis
      }
    } else {
      // Envío a la Península
      if (amount <= 25) {
        shippingCost = 7
      } else if (amount > 25 && amount <= 50) {
        shippingCost = 5
      } else {
        shippingCost = 0 // Envío gratis
      }
    }
  } else if (isEurope) {
    // Envío a Europa
    if (amount <= 50) {
      shippingCost = 16
    } else if (amount > 50 && amount <= 100) {
      shippingCost = 5
    } else {
      shippingCost = 0 // Envío gratis
    }
  } else if (isUSA || isCanada) {
    // Envío a EE.UU. o Canadá
    if (amount <= 50) {
      shippingCost = 35
    } else {
      shippingCost = 20 // Tarifa reducida para compras mayores de 50
    }
  }

  return shippingCost
}

const isCanaryIlands = (postalCode: number) => {
  return postalCode >= 35001 && postalCode <= 35211 ? true : false
}

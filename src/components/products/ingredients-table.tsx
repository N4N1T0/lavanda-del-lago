import { formatComposicion } from '@/lib/utils'

const IngredientsTable = ({ composicion }: { composicion: string }) => {
  const formattedComposicion = formatComposicion(composicion)

  return (
    <ul className='grid grid-cols-2 md:grid-cols-3'>
      {formattedComposicion.map((ingredient) => (
        <li
          key={ingredient}
          className='col-span-1 inline-flex items-start justify-start text-left'
        >
          <span className='mr-2 text-accent'>•</span>
          {ingredient}
        </li>
      ))}
    </ul>
  )
}

export default IngredientsTable

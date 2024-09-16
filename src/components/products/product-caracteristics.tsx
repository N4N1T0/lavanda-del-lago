'use client'

// UI Imports
import { Button } from '@/components/ui/button'

// Types Imports
import type { Product } from '@/types'

// Assets Imports
import {
	AwardIcon,
	BarcodeIcon,
	DownloadIcon,
	FileIcon,
	PackageIcon,
	QuoteIcon,
	RulerIcon,
	TagIcon,
} from 'lucide-react'

/**
 * A React component that displays the characteristics of a product.
 *
 * @param {Object} props - The component props.
 * @param {Product} props.product - The product data.
 * @return {JSX.Element} The product characteristics section.
 */
const ProductCaracteristics = ({
	product,
}: { product: Product }): JSX.Element => {
	// Deconstruction with default values in Spanish
	const {
		certificacion = 'Certificación no disponible',
		codigoBarras = 'Código de barras no disponible',
		codigoReferencia = 'Código de referencia no disponible',
		fichaTecnica,
		slogan = 'No hay un slogan disponible',
		subcategoria = 'Subcategoría no disponible',
		medidas: {
			alto = 'N/A',
			ancho = 'N/A',
			profundidad = 'N/A',
			volumen = 'N/A',
		} = {}, // Default object in case 'medidas' is undefined
	} = product

	return (
		<section
			id={`${product.nombre}-caracteristicas`}
			className='w-full max-w-xl grid gap-4 content-center'
		>
			<div className='grid grid-cols-2 gap-4'>
				<div className='flex items-center gap-3'>
					<BarcodeIcon className='h-5 w-5 text-accent/80 shrink-0' />
					<div>
						<p className='text-sm font-medium'>Código de Barras</p>
						<p className='text-sm text-gray-600'>{codigoBarras}</p>
					</div>
				</div>
				<div className='flex items-center gap-3 justify-self-end'>
					<TagIcon className='h-5 w-5 text-accent/80 shrink-0' />
					<div>
						<p className='text-sm font-medium'>Código de Referencia</p>
						<p className='text-sm text-gray-600'>{codigoReferencia}</p>
					</div>
				</div>
			</div>
			<hr className='border-accent/50' />
			<div className='grid grid-cols-2 gap-4'>
				<div className='flex items-center gap-3'>
					<RulerIcon className='h-5 w-5 text-accent/80 shrink-0' />
					<div>
						<p className='text-sm font-medium'>Dimensiones</p>
						<p className='text-sm text-gray-600'>
							{ancho}cm x {alto}cm x {profundidad}cm
						</p>
					</div>
				</div>
				<div className='flex items-center gap-3 justify-self-end'>
					<PackageIcon className='h-5 w-5 text-accent/80 shrink-0' />
					<div>
						<p className='text-sm font-medium'>Peso y Volumen</p>
						<p className='text-sm text-gray-600'>{volumen}m³</p>
					</div>
				</div>
			</div>
			<hr className='border-accent/50' />
			<div className='grid grid-cols-2 gap-4'>
				<div className='flex items-center gap-3'>
					<AwardIcon className='h-5 w-5 text-accent/80 shrink-0' />
					<div>
						<p className='text-sm font-medium'>Certificación</p>
						<p className='text-sm text-gray-600'>{certificacion}</p>
					</div>
				</div>
				<div className='flex items-center gap-3 justify-self-end'>
					<FileIcon className='h-5 w-5 text-accent/80 shrink-0' />
					<div>
						<p className='text-sm font-medium'>Subcategoría</p>
						<p className='text-sm text-gray-600'>{subcategoria}</p>
					</div>
				</div>
			</div>
			<hr className='border-accent/50' />
			<div className='flex items-start space-x-4 w-full'>
				<QuoteIcon className='h-5 w-5 text-accent/80 shrink-0 mt-1' />
				<div>
					<p className='text-gray-600'>{slogan}</p>
				</div>
			</div>

			{fichaTecnica && (
				<div className='grid place-items-center w-full border-t border-accent/30 pt-3'>
					<Button
						className='w-3/4 self-center'
						onClick={() => window.open(fichaTecnica, '_blank')}
					>
						<DownloadIcon className='mr-2 h-4 w-4' />
						Descargar Hoja de Producto
					</Button>
				</div>
			)}
		</section>
	)
}

export default ProductCaracteristics

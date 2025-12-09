'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'

export interface Author {
	name: string
	highlight?: boolean
	bold?: boolean
	italic?: boolean
	underline?: boolean
}

export interface LinkItem {
	label: string
	url: string
	isBibtex?: boolean
}

export interface Publication {
	id: string
	title: string
	authors: Author[]
	venue: string
	image: string
	links: LinkItem[]
	bibtex?: string
}

interface PublicationCardProps {
	publication: Publication
}

export function PublicationCard({ publication }: PublicationCardProps) {
	const [showBibtex, setShowBibtex] = useState(false)

	const handleCopyBibtex = () => {
		if (publication.bibtex) {
			navigator.clipboard.writeText(publication.bibtex)
			toast.success('BibTeX copied to clipboard')
		}
	}

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
		>
			<div className="flex flex-col md:flex-row gap-6">
				{/* Image Section */}
				<div className="shrink-0 w-full md:w-[240px] aspect-video md:aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden relative border border-gray-100">
					{publication.image ? (
						<Image
							src={publication.image}
							alt={publication.title}
							fill
							className="object-cover"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-gray-300">
							No Image
						</div>
					)}
				</div>

				{/* Content Section */}
				<div className="flex-1 min-w-0">
					<h3 className="text-xl font-bold text-gray-900 leading-tight mb-3">
						{publication.title}
					</h3>
					
					<div className="flex flex-wrap gap-x-1.5 gap-y-1 text-gray-600 mb-3 text-sm leading-relaxed">
						{publication.authors.map((author, index) => (
							<span key={index} className={cn(
								author.highlight && "text-amber-500 font-medium",
								author.bold && "font-bold",
								author.italic && "italic",
								author.underline && "underline"
							)}>
								{author.name}{index < publication.authors.length - 1 ? ',' : ''}
							</span>
						))}
					</div>

					<div className="text-gray-500 font-medium text-sm mb-5">
						{publication.venue}
					</div>

					<div className="flex flex-wrap gap-2">
						{publication.links.map((link, index) => (
							<button
								key={index}
								onClick={() => {
									if (link.isBibtex) {
										setShowBibtex(!showBibtex)
									} else {
										window.open(link.url, '_blank')
									}
								}}
								className={cn(
									"px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5",
									link.isBibtex 
										? "bg-amber-100 text-amber-700 hover:bg-amber-200" 
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								)}
							>
								{/* Icon could go here */}
								{link.label}
							</button>
						))}
					</div>
				</div>
			</div>

			<AnimatePresence>
				{showBibtex && publication.bibtex && (
					<motion.div
						initial={{ opacity: 0, height: 0, marginTop: 0 }}
						animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
						exit={{ opacity: 0, height: 0, marginTop: 0 }}
						className="overflow-hidden"
					>
						<div className="bg-slate-50 rounded-xl border border-gray-200 p-4 relative group">
							<pre className="font-mono text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap break-all">
								{publication.bibtex}
							</pre>
							<button
								onClick={handleCopyBibtex}
								className="absolute top-2 right-2 p-2 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
								title="Copy BibTeX"
							>
								<Copy size={16} />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}


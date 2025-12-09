'use client'

import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { PublicationCard, type Publication } from './publication-card'
import initialPublications from './publications.json'
import { Search, Filter } from 'lucide-react'
// I'll check if lucide-react is available, otherwise I'll use an SVG.
// The project seems to use SVGs in src/svgs

export default function PublicationsPage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [publications] = useState<Publication[]>(initialPublications as any[])

	const filteredPublications = useMemo(() => {
		const query = searchQuery.toLowerCase().trim()
		if (!query) return publications

		return publications.filter(pub => 
			pub.title.toLowerCase().includes(query) ||
			pub.authors.some(author => author.name.toLowerCase().includes(query)) ||
			pub.venue.toLowerCase().includes(query)
		)
	}, [publications, searchQuery])

	return (
		<main className="min-h-screen bg-gray-50/50 pb-20 pt-24 sm:pt-32">
			<div className="mx-auto max-w-4xl px-6">
				<div className="mb-12">
					<h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Publications</h1>
					<p className="text-gray-600 text-lg">A collection of my research work.</p>
				</div>

				<div className="mb-8 flex gap-4">
					<div className="relative flex-1">
						<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
							<Search size={20} />
						</div>
						<input
							type="text"
							placeholder="Search publications..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all"
						/>
					</div>
					<button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
						<Filter size={18} />
						Filters
					</button>
				</div>

				<div className="space-y-6">
					{filteredPublications.map(pub => (
						<PublicationCard key={pub.id} publication={pub} />
					))}

					{filteredPublications.length === 0 && (
						<div className="text-center py-20">
							<p className="text-gray-500">No publications found matching your search.</p>
						</div>
					)}
				</div>
			</div>
		</main>
	)
}


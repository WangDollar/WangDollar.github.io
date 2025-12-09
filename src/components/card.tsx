'use client'

import { ANIMATION_DELAY } from '@/consts'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useSize } from '@/hooks/use-size'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode
	className?: string
	width?: number
	height?: number | 'auto'
	order?: number
	x: number
	y: number
}

export default function Card({ children, order, width, height, x, y, className }: Props) {
	const { maxSM, init } = useSize()
	let [show, setShow] = useState(false)
	if (maxSM && init) order = 0

	useEffect(() => {
		if (show) return
		if (x === 0 && y === 0) return
		setTimeout(
			() => {
				setShow(true)
			},
			order * ANIMATION_DELAY * 1000
		)
	}, [x, y, show])

	if (show)
		return (
			<motion.div
				className={cn(
					'card-bg absolute cursor-grab rounded-2xl p-4 shadow-lg active:cursor-grabbing',
					'max-sm:relative max-sm:w-[350px] max-sm:!transform-none',
					className,
				)}
				style={{
					width: width ? `${width}px` : 'auto',
					height: height === 'auto' ? 'auto' : height ? `${height}px` : 'auto',
					zIndex: order,
					x,
					y,
				}}
				initial={{ opacity: 0, scale: 0.6, left: x, top: y, width, height }}
				animate={{ opacity: 1, scale: 1, left: x, top: y, width, height }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}>
				{children}
			</motion.div>
		)

	return null
}

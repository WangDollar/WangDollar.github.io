import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { CARD_SPACING } from '@/consts'
import { HomeDraggableLayer } from './home-draggable-layer'

export default function ResearchInterestsCard() {
	const center = useCenterStore()
	const { cardStyles } = useConfigStore()
	
	const styles = cardStyles.researchInterestsCard
	const hiCardStyles = cardStyles.hiCard
	const clockCardStyles = cardStyles.clockCard

	const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + CARD_SPACING + hiCardStyles.width / 2
	const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - clockCardStyles.offset + CARD_SPACING

	return (
		<HomeDraggableLayer cardKey='researchInterestsCard' x={x} y={y} width={styles.width} height={styles.height}>
			<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y} className="flex flex-col justify-center px-8">
				<h3 className='text-xl font-bold text-gray-800 mb-6'>
					Research Interests
				</h3>
				<ul className='flex flex-col gap-4'>
					<li className='text-gray-600 font-medium text-base'>AI for Science</li>
					<li className='text-gray-600 font-medium text-base'>Large Language Models</li>
					<li className='text-gray-600 font-medium text-base'>Agentic Reinforcement Learning</li>
				</ul>
			</Card>
		</HomeDraggableLayer>
	)
}


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

	const interests = ['AI for Science', 'Large Language Models', 'Agentic Reinforcement Learning']

	return (
		<HomeDraggableLayer cardKey='researchInterestsCard' x={x} y={y} width={styles.width} height={styles.height}>
			<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y}>
				<h3 className='mb-2 text-lg font-semibold'>Research Interests</h3>
				<ul className='flex flex-col gap-1'>
					{interests.map(interest => (
						<li key={interest} className='text-gray-600'>
							{interest}
						</li>
					))}
				</ul>
			</Card>
		</HomeDraggableLayer>
	)
}

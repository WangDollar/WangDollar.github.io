import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { CARD_SPACING } from '@/consts'
import MusicSVG from '@/svgs/music.svg'
import PlaySVG from '@/svgs/play.svg'
import { HomeDraggableLayer } from './home-draggable-layer'
import { useState } from 'react'
import { DialogModal } from '@/components/dialog-modal'
import { list } from '@/app/music/list'
import parse from 'html-react-parser'

export default function MusicCard() {
	const center = useCenterStore()
	const { cardStyles } = useConfigStore()
	const styles = cardStyles.musicCard
	const hiCardStyles = cardStyles.hiCard
	const clockCardStyles = cardStyles.clockCard
	const researchInterestsCardStyles = cardStyles.researchInterestsCard

	const [playing, setPlaying] = useState(false)
	const [currentMusic, setCurrentMusic] = useState<(typeof list)[0]>(list[0])

	const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + CARD_SPACING + hiCardStyles.width / 2 - styles.offset
	const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - clockCardStyles.offset + CARD_SPACING + researchInterestsCardStyles.height + CARD_SPACING

	const handlePlay = () => {
		const randomIndex = Math.floor(Math.random() * list.length)
		setCurrentMusic(list[randomIndex])
		setPlaying(true)
	}

	return (
		<>
			<HomeDraggableLayer cardKey='musicCard' x={x} y={y} width={styles.width} height={styles.height}>
				<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y} className='flex items-center gap-3'>
					<MusicSVG className='h-8 w-8' />

					<div className='flex-1'>
						<div className='text-secondary text-sm'>随机音乐</div>

						<div className='mt-1 h-2 rounded-full bg-white/60'>
							<div className='bg-linear h-full w-1/2 rounded-full' />
						</div>
					</div>

					<button onClick={handlePlay} className='flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform active:scale-90'>
						<PlaySVG className='text-brand ml-1 h-4 w-4' />
					</button>
				</Card>
			</HomeDraggableLayer>

			<DialogModal open={playing} onClose={() => setPlaying(false)} className='w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl'>
				<div className='aspect-video w-full [&_iframe]:h-full [&_iframe]:w-full'>
					{currentMusic && typeof currentMusic.iframe === 'string' ? parse(currentMusic.iframe) : null}
				</div>
				<div className='bg-white p-4'>
					<h3 className='font-bold text-lg'>{currentMusic?.name}</h3>
				</div>
			</DialogModal>
		</>
	)
}
